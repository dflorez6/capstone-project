// Dependencies
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectQuery } from "../../../../slices/projectsApiSlice";
import {
  useGetProjectApplicationsQuery,
  useCreateProjectApplicationMutation,
  useAcceptProjectApplicationMutation,
  useRejectProjectApplicationMutation,
} from "../../../../slices/projectApplicationApiSlice";
import { useGetPropertyManagerProjectWorkOrdersQuery } from "../../../../slices/workOrderApiSlice";
// Time
import { torontoDate, torontoDateTime } from "../../../../utils/formatDates";
// Components
import Loader from "../../../../components/Loader";
// Toast
import { toast } from "react-toastify";
// Styles
import "./Projects.scss";
// Assets
import imgPlaceholder from "../../../../assets/img/placeholder-landscape.png";
import avatarPlaceholder from "../../../../assets/img/placeholder-square.jpg";

// Component
const Project = () => {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Parse URL to get query params
  const url = window.location.pathname;
  const urlParts = url.split("/");
  const urlPropertyManagerId = urlParts[urlParts.length - 2]; // Get /:projectId part of the URL
  const urlProjectId = urlParts[urlParts.length - 1]; // Get /:projectId part of the URL

  // Redux Store
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Vendor Info through the useSelector Hook
  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const {
    data: project,
    isError: projectError,
    isLoading: projectLoading,
    refetch: projectRefetch,
  } = useGetProjectQuery({
    propertyManagerId: urlPropertyManagerId,
    projectId: urlProjectId,
  });

  const {
    data: projectApplications,
    isError: projectApplicationsError,
    isLoading: projectApplicationsLoading,
    refetch: projectApplicationsRefetch,
  } = useGetProjectApplicationsQuery({
    projectId: project?._id.toString(),
  });

  const {
    data: propManagerWorkOrders,
    isError: propManagerWorkOrdersError,
    isLoading: propManagerWorkOrdersLoading,
    refetch: propManagerWorkOrdersRefetch,
  } = useGetPropertyManagerProjectWorkOrdersQuery({
    propertyManagerId: project?.propertyManager._id.toString(),
    projectId: project?._id.toString(),
  });

  // Redux Toolkit Mutations
  const [
    createProjectApplication,
    {
      isError: createProjectApplicationError,
      isLoading: createProjectApplicationLoading,
    },
  ] = useCreateProjectApplicationMutation();

  const [
    acceptProjectApplication,
    {
      isError: acceptProjectApplicationError,
      isLoading: acceptProjectApplicationLoading,
    },
  ] = useAcceptProjectApplicationMutation();

  const [
    rejectProjectApplication,
    {
      isError: rejectProjectApplicationError,
      isLoading: rejectProjectApplicationLoading,
    },
  ] = useRejectProjectApplicationMutation();

  //----------
  // Effects
  //----------
  // Refetch vendor stores
  useEffect(() => {
    projectApplicationsRefetch();
    propManagerWorkOrdersRefetch();
  }, [projectApplicationsRefetch, propManagerWorkOrdersRefetch]);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (projectError) {
    console.log("Project Error: ", projectError);
  }
  if (createProjectApplicationError) {
    console.log("Project Application Error: ", createProjectApplicationError);
  }
  if (projectApplicationsError) {
    console.log("Project Applications Error: ", projectApplicationsError);
  }
  if (acceptProjectApplicationError) {
    console.log(
      "Accept Project Applications Error: ",
      acceptProjectApplicationError
    );
  }
  if (rejectProjectApplicationError) {
    console.log(
      "Reject Project Applications Error: ",
      rejectProjectApplicationError
    );
  }
  if (propManagerWorkOrdersError) {
    console.log(
      "Project Work Orders Applications Error: ",
      propManagerWorkOrdersError
    );
  }

  //----------
  // Handlers
  //----------
  // Create Project Application
  const handleCreateProjectApplication = async (e) => {
    e.preventDefault();

    // Get the current time in Toronto time zone
    const torontoTime = new Date();
    const torontoOffset = -4 * 60; // Toronto is UTC-5 hours (Standard Time), but is adjusted for Daylight Saving Time
    const torontoTimeWithOffset = new Date(
      torontoTime.getTime() + torontoOffset * 60 * 1000
    );

    // Convert Toronto time to UTC time
    const utcTime = torontoTimeWithOffset.toISOString(); // Converts to UTC time in ISO format

    // Prepare Data
    const data = {
      applicationDate: utcTime,
      vendor: vendorInfo ? vendorInfo?._id : "",
      project: project?._id,
      propertyManager: project?.propertyManager._id,
    };

    // Dispatch Create Project Application
    try {
      await createProjectApplication(data).unwrap();
      toast.success("Project application sent successfully");
      await projectRefetch();
    } catch (error) {
      toast.error("You have already sent an application to this project");
      console.log("Project Application Error: ", error);
    }
  };

  // Accept Project Application
  const handleAcceptProjectApplication = async (projectApplicationId) => {
    // Prepare Data
    const data = {
      projectApplicationId,
    };

    try {
      await acceptProjectApplication(data).unwrap();
      projectApplicationsRefetch();
      toast.success("Project application accepted successfully");
    } catch (error) {
      toast.error(
        "Application status has already been update for this project"
      );
      console.log("Project Application Error: ", error);
    }
  };

  // Reject Project Application
  const handleRejectProjectApplication = async (projectApplicationId) => {
    // Prepare Data
    const data = {
      projectApplicationId,
    };

    try {
      await rejectProjectApplication(data).unwrap();
      projectApplicationsRefetch();
      toast.success("Project application rejected successfully");
    } catch (error) {
      toast.error(
        "Application status has already been update for this project"
      );
      console.log("Project Application Error: ", error);
    }
  };

  //----------
  // Functions
  //----------
  // Set Color Status
  const setColorStatus = (status) => {
    switch (status) {
      case "pending":
        return "pending";
      case "accepted":
        return "accepted";
      case "rejected":
        return "rejected";
      case "inProgress":
        return "in-progress";
      case "closed":
        return "closed";
      default:
        return "bg-pending";
    }
  };

  //----------
  // Pagination
  //----------
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // TODO: Set for 3 at the moment to be able to show pagination

  // Calculate indexes of items to display on the current page
  const indexOfLastProject = (currentPage + 1) * itemsPerPage;
  const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  const currentWorkOrders = propManagerWorkOrders?.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Pagination Handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Check if there are any projects to display
  const hasItems = propManagerWorkOrders && propManagerWorkOrders.length > 0;

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper project-wrapper">
      {projectLoading ? (
        <Loader />
      ) : (
        <>
          <div className="project-content">
            {/* Image & Info */}
            <div className="project-image-info-wrapper shadow">
              {/* // TODO: Reference for a background-image backgroundImage in React
                <div className="project-cover" style={{backgroundImage: `url(${vendorStore?.coverImage.url})`}}> 
              */}
              <div className="project-image-wrapper">
                {project?.coverImage.url === "" ? (
                  <>
                    <img
                      src={imgPlaceholder}
                      alt={project?._id}
                      className="project-cover"
                    />
                  </>
                ) : (
                  <img
                    src={project?.coverImage.url}
                    alt={project?._id}
                    className="project-cover"
                  />
                )}
              </div>
              {/* ./Image */}

              <div className="project-info-wrapper">
                <div className="project-title-wrapper">
                  <h1>{project?.name}</h1>
                </div>
                <div className="project-category">
                  <h2>{project?.serviceCategory.name}</h2>
                </div>
                <div className="project-counters-wrapper">
                  <div className="counters-wrapper">
                    <div className="work-orders-counter">
                      {/* TODO: MAKE WORK ORDERS COUNTER DYNAMIC */}
                      <p>5 Work Orders</p>
                    </div>
                  </div>

                  <div className="project-actions">
                    {/* Only propertyManager can edit the Store */}
                    {propertyManagerInfo &&
                    project.propertyManager._id === propertyManagerInfo._id ? (
                      <>
                        <Link
                          to={`/projects/${propertyManagerInfo._id}/${project._id}/edit`}
                          className="btn-app btn-app-sm btn-app-dark-outline me-3"
                        >
                          edit
                        </Link>
                        <Link
                          to=""
                          className="btn-app btn-app-sm btn-app-purple"
                        >
                          <i className="fa-solid fa-plus"></i>
                          <span className="ms-2">work order</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`mailto:${project.propertyManager.email}`}
                          className="btn-app btn-app-sm btn-app-dark-outline me-3"
                        >
                          contact
                        </Link>

                        {/* TODO: DISABLE BUTTON IF VENDOR HAS ALREADY APPLIED */}
                        {createProjectApplicationLoading ? (
                          <Loader />
                        ) : (
                          <>
                            <button
                              to=""
                              className="btn-app btn-app-sm btn-app-purple"
                              onClick={handleCreateProjectApplication}
                            >
                              apply
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  {/* ./Actions */}
                </div>
                {/* Counter + Actions */}
                <hr />
                <div className="project-description">
                  <p>{project.description}</p>
                </div>
              </div>
              {/* ./Info */}
            </div>
            {/* ./Image & Info */}

            {/* TODO: Maybe use tabs or pills to display the content in the same panel */}

            {/* Applications & Work Orders */}
            <div className="row">
              {propertyManagerInfo ? (
                <>
                  {/* Applications */}
                  <div className="col-12">
                    <div className="panel-wrapper project-applications-wrapper">
                      <div className="panel-title-wrapper">
                        <h2>Applications</h2>
                      </div>

                      <div className="panel-content-wrapper">
                        {projectApplicationsLoading ? (
                          <Loader />
                        ) : (
                          <>
                            <table className="table table-striped app-table">
                              <thead>
                                <tr>
                                  <th colSpan={1}></th>
                                  <th colSpan={1}></th>
                                  <th>Vendor</th>
                                  <th>Application Date</th>
                                  <th>Status</th>
                                  <th colSpan={1}></th>
                                </tr>
                              </thead>

                              <tbody>
                                {projectApplications.length === 0 ? (
                                  <>
                                    <tr>
                                      <td colSpan={6} className="text-center">
                                        No applications received yet
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    {projectApplications.map((application) => (
                                      <tr key={application._id}>
                                        <td>
                                          <Link
                                            to={`/vendors/store/${application.vendor.storeSlug}`}
                                            className="f-primary"
                                          >
                                            <i className="fa-solid fa-store"></i>
                                            <span className="ms-1">
                                              View Store
                                            </span>
                                          </Link>
                                        </td>
                                        <td>
                                          {application.vendor.avatar.url ===
                                          "" ? (
                                            <>
                                              <img
                                                src={avatarPlaceholder}
                                                alt={project._id}
                                                className="rounded-circle avatar"
                                              />
                                            </>
                                          ) : (
                                            <>
                                              <img
                                                src={
                                                  application.vendor.avatar.url
                                                }
                                                alt={project._id}
                                                className="rounded-circle avatar"
                                              />
                                            </>
                                          )}
                                        </td>
                                        <td>
                                          {application.vendor.companyName}
                                        </td>
                                        <td>
                                          {torontoDate(
                                            application.applicationDate
                                          )}
                                        </td>
                                        <td>{application.applicationStatus}</td>
                                        {/* Actions */}
                                        <td>
                                          {rejectProjectApplicationLoading ||
                                          acceptProjectApplicationLoading ? (
                                            <Loader />
                                          ) : (
                                            <>
                                              <button
                                                type="button"
                                                className="btn-app btn-app-xs btn-app-red"
                                                onClick={() =>
                                                  handleRejectProjectApplication(
                                                    application._id
                                                  )
                                                }
                                              >
                                                <i className="fa-solid fa-xmark"></i>
                                                <span className="ms-1">
                                                  Reject
                                                </span>
                                              </button>

                                              <button
                                                type="button"
                                                className="btn-app btn-app-xs btn-app-green ms-3"
                                                onClick={() =>
                                                  handleAcceptProjectApplication(
                                                    application._id
                                                  )
                                                }
                                              >
                                                <i className="fa-solid fa-check"></i>
                                                <span className="ms-1">
                                                  Accept
                                                </span>
                                              </button>
                                            </>
                                          )}
                                        </td>
                                        {/* ./Actions */}
                                      </tr>
                                    ))}
                                  </>
                                )}
                              </tbody>
                            </table>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ./Applications */}

                  {/* Work Orders */}
                  <div className="col-12">
                    <div className="panel-wrapper bg-transparent project-work-orders-wrapper mt-0 pt-0">
                      <div className="panel-title-wrapper">
                        <h2>Work Orders</h2>
                      </div>

                      <div className="panel-content-wrapper">
                        {propManagerWorkOrdersLoading ? (
                          <Loader />
                        ) : (
                          <>
                            <div className="work-orders-wrapper">
                              <div className="work-orders-content-wrapper">
                                <div className="row">
                                  {hasItems &&
                                    currentWorkOrders.map((order) => (
                                      <>
                                        <div
                                          className="col-12 col-sm-12 col-md-4 col-lg-4 d-flex align-items-stretch"
                                          key={order._id}
                                        >
                                          <div className="work-order-card-wrapper">
                                            {/* Work Order Card */}

                                            {/* Header */}
                                            <div
                                              className={`work-order-card-header`}
                                            >
                                              <div
                                                className={`color-status-bar ${setColorStatus(
                                                  order.workOrderStatus
                                                )}`}
                                              ></div>
                                              {/* Actions */}
                                              <div className="header-actions">
                                                <button
                                                  type="button"
                                                  className="header-action"
                                                >
                                                  <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button
                                                  type="button"
                                                  className="header-action"
                                                >
                                                  <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                              </div>
                                              {/* ./Actions */}
                                            </div>
                                            {/* ./Header */}

                                            {/* Body */}
                                            <div className="work-order-card-body">
                                              <h2 className="name">
                                                {order?.name}
                                              </h2>

                                              {/* Status Badge */}
                                              <div
                                                className={`work-order-status ${setColorStatus(
                                                  order.workOrderStatus
                                                )}`}
                                              >
                                                <p className="status">
                                                  {order.workOrderStatus}
                                                </p>
                                              </div>
                                              {/* ./Status Badge */}

                                              <p className="project">
                                                Project: {order?.project.name}
                                              </p>
                                              <p className="date">
                                                Start:{" "}
                                                {torontoDateTime(
                                                  order.startDateTime
                                                )}
                                              </p>
                                              <p className="date">
                                                End:{" "}
                                                {torontoDateTime(
                                                  order.endDateTime
                                                )}
                                              </p>
                                              <p className="user">
                                                Vendor:{" "}
                                                {`${order.vendor.companyName}`}
                                              </p>
                                            </div>
                                            {/* ./Body */}

                                            {/* Footer */}
                                            <div className="work-order-card-footer">
                                              {/* Actions */}
                                              <div className="footer-actions">
                                                <button
                                                  type="button"
                                                  className="btn-app btn-app-xs btn-app-dark-outline"
                                                >
                                                  View
                                                </button>
                                                {/*
                                              <button
                                                type="button"
                                                className="btn-app btn-app-xs btn-app-dark"
                                              >
                                                Close Order
                                              </button>
                                               */}
                                              </div>
                                              {/* ./Actions */}
                                            </div>
                                            {/* ./Footer */}
                                          </div>

                                          {/* ./Work Order Card */}
                                        </div>
                                      </>
                                    ))}
                                </div>
                              </div>
                            </div>

                            {/* Pagination */}
                            <div className="row">
                              <div className="col-12">
                                <div className="app-pagination-wrapper">
                                  {hasItems && (
                                    <ReactPaginate
                                      pageCount={Math.ceil(
                                        propManagerWorkOrders.length /
                                          itemsPerPage
                                      )}
                                      breakLabel="..."
                                      nextLabel=">>"
                                      previousLabel="<<"
                                      pageRangeDisplayed={5}
                                      marginPagesDisplayed={2}
                                      onPageChange={handlePageChange}
                                      containerClassName="pagination"
                                      activeClassName="active"
                                    />
                                  )}
                                  {!hasItems && (
                                    <h4 className="text-center">
                                      No work orders created yet
                                    </h4>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* ./Pagination */}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* ./Work Orders */}
                </>
              ) : (
                <>
                  <p>vendor</p>
                </>
              )}
            </div>
            {/* ./Applications & Work Orders */}
          </div>
        </>
      )}
    </section>
  );
};

export default Project;
