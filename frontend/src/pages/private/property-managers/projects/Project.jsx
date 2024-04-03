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
import {
  useGetPropertyManagerProjectWorkOrdersQuery,
  useGetVendorProjectWorkOrdersQuery,
  useVendorAcceptWorkOrderMutation,
  useVendorRescheduleWorkOrderMutation,
  usePropertyManagerAcceptWorkOrderMutation,
  usePropertyManagerRescheduleWorkOrderMutation,
  usePropertyManagerCloseWorkOrderMutation,
} from "../../../../slices/workOrderApiSlice"; // TODO: Use acceptWorkOrder & rescheduleWorkOrder
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

  // Form Fields
  const [vendorStartDateTime, setVendorStartDateTime] = useState("");
  const [vendorEndDateTime, setVendorEndDateTime] = useState("");
  const [propManagerStartDateTime, setPropManagerStartDateTime] = useState("");
  const [propManagerEndDateTime, setPropManagerEndDateTime] = useState("");

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

  const {
    data: vendorWorkOrders,
    isError: vendorWorkOrdersError,
    isLoading: vendorWorkOrdersLoading,
    refetch: vendorWorkOrdersRefetch,
  } = useGetVendorProjectWorkOrdersQuery({
    vendorId: vendorInfo?._id.toString(),
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

  const [
    vendorAcceptWorkOrder,
    {
      isError: vendorAcceptWorkOrderError,
      isLoading: vendoracceptWorkOrderLoading,
    },
  ] = useVendorAcceptWorkOrderMutation();
  const [
    vendorRescheduleWorkOrder,
    {
      isError: vendorRescheduleWorkOrderError,
      isLoading: vendorRescheduleWorkOrderLoading,
    },
  ] = useVendorRescheduleWorkOrderMutation();
  const [
    propManagerAcceptWorkOrder,
    {
      isError: propManagerAcceptWorkOrderError,
      isLoading: propManagerAcceptWorkOrderLoading,
    },
  ] = usePropertyManagerAcceptWorkOrderMutation();
  const [
    propManagerRescheduleWorkOrder,
    {
      isError: propManagerRescheduleWorkOrderError,
      isLoading: propManagerRescheduleWorkOrderLoading,
    },
  ] = usePropertyManagerRescheduleWorkOrderMutation();
  const [
    closeWorkOrder,
    { isError: closeWorkOrderError, isLoading: closeWorkOrderLoading },
  ] = usePropertyManagerCloseWorkOrderMutation();

  //----------
  // Effects
  //----------
  // Refetch vendor stores
  useEffect(() => {
    // Work Order Refecth Functions
    projectApplicationsRefetch();
    if (propertyManagerInfo) {
      propManagerWorkOrdersRefetch();
    }
    if (vendorInfo) {
      vendorWorkOrdersRefetch();
    }
  }, [
    projectApplicationsRefetch,
    propertyManagerInfo,
    propManagerWorkOrdersRefetch,
    vendorInfo,
    vendorWorkOrdersRefetch,
  ]);

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
      "Property Manager Project Work Orders Applications Error: ",
      propManagerWorkOrdersError
    );
  }
  if (vendorWorkOrdersError) {
    console.log(
      "Vendor Project Work Orders Applications Error: ",
      vendorWorkOrdersError
    );
  }
  if (vendorAcceptWorkOrderError) {
    console.log("Vendor Accept Work Order Error: ", vendorAcceptWorkOrderError);
  }
  if (vendorRescheduleWorkOrderError) {
    console.log(
      "Vendor Reschedule Work Order Error: ",
      vendorRescheduleWorkOrderError
    );
  }
  if (propManagerAcceptWorkOrderError) {
    console.log(
      "Property Manager Project Work Order Error: ",
      propManagerAcceptWorkOrderError
    );
  }
  if (propManagerRescheduleWorkOrderError) {
    console.log(
      "Property Manager Reschedule Work Order Error: ",
      propManagerRescheduleWorkOrderError
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
      propertyManager: project?.propertyManager?._id,
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
        "Application status has already been updated for this project"
      );
      console.log("Project Application Error: ", error);
    }
  };

  // Vendor Accepts Work Order
  const vendorAcceptWorkOrderHandler = async (projectId, workOrderId) => {
    try {
      await vendorAcceptWorkOrder({
        projectId: projectId,
        workOrderId: workOrderId,
      }).unwrap();
      vendorWorkOrdersRefetch();
      toast.success("Work order accepted successfully");
    } catch (error) {
      toast.error("Work order has already been updated for this project");
      console.log("Project Application Error: ", error);
    }
  };

  // Vendor Reschedules Work Order
  const vendorRescheduleWorkOrderHandler = async (
    e,
    vendor,
    projectId,
    workOrderId
  ) => {
    e.preventDefault();

    try {
      // Convert startDateTime and endDateTime to UTC format
      const startDateTimeUTC = new Date(vendorStartDateTime).toISOString();
      const endDateTimeUTC = new Date(vendorEndDateTime).toISOString();

      // Form Data
      const formData = new FormData();

      formData.append("vendor", vendor);
      formData.append("startDateTime", startDateTimeUTC);
      formData.append("endDateTime", endDateTimeUTC);

      // Reschedule Work Order
      const res = await vendorRescheduleWorkOrder({
        projectId: projectId,
        workOrderId: workOrderId,
        data: formData,
      }).unwrap();
      vendorWorkOrdersRefetch();
      toast.success("Work order rescheduled successfully");
    } catch (error) {
      toast.error("There was an error rescheduling this work order");
      console.log("Create Work Order Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  // Property Manager Accepts Work Order
  const propManagerAcceptWorkOrderHandler = async (projectId, workOrderId) => {
    try {
      await propManagerAcceptWorkOrder({
        projectId: projectId,
        workOrderId: workOrderId,
      }).unwrap();
      toast.success("Work order accepted successfully");
      propManagerWorkOrdersRefetch();
    } catch (error) {
      toast.error("There was an error rescheduling this work order");
      console.log("Accept Work Order Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  // Property Manager Reschedules Work Order
  const propManagerRescheduleWorkOrderHandler = async (
    e,
    vendor,
    projectId,
    workOrderId
  ) => {
    e.preventDefault();

    try {
      // Convert startDateTime and endDateTime to UTC format
      const startDateTimeUTC = new Date(propManagerStartDateTime).toISOString();
      const endDateTimeUTC = new Date(propManagerEndDateTime).toISOString();

      // Form Data
      const formData = new FormData();

      formData.append("vendor", vendor);
      formData.append("startDateTime", startDateTimeUTC);
      formData.append("endDateTime", endDateTimeUTC);

      // Reschedule Work Order
      const res = await propManagerRescheduleWorkOrder({
        projectId: projectId,
        workOrderId: workOrderId,
        data: formData,
      }).unwrap();
      propManagerWorkOrdersRefetch();
      toast.success("Work order rescheduled successfully");
    } catch (error) {
      toast.error("There was an error rescheduling this work order");
      console.log("Create Work Order Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  // Close Work Order Handler
  const closeOrderHandler = async (projectId, workOrderId) => {
    try {
      await closeWorkOrder({
        projectId,
        workOrderId,
      }).unwrap();
      propManagerWorkOrdersRefetch();
      toast.success("Work order closed successfully");
    } catch (error) {
      toast.error("Work order has already been updated for this project");
      console.log("Project Application Error: ", error);
    }
  };

  //----------
  // Functions
  //----------
  // Set Status Color
  const setStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "pending";
      case "accepted":
        return "accepted";
      case "rescheduleByVendor":
      case "rescheduleByPropertyManager":
        return "reschedule";
      case "inProgress":
        return "in-progress";
      case "closed":
        return "closed";
      default:
        return "bg-pending";
    }
  };

  // Set Status Text
  const setStatusText = (status) => {
    switch (status) {
      case "pending":
        return "pending";
      case "accepted":
        return "accepted";
      case "rescheduleByVendor":
      case "rescheduleByPropertyManager":
        return "reschedule";
      case "inProgress":
        return "in progress";
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
  let currentWorkOrders;
  if (propertyManagerInfo) {
    currentWorkOrders = propManagerWorkOrders?.slice(
      indexOfFirstProject,
      indexOfLastProject
    );
  } else {
    currentWorkOrders = vendorWorkOrders?.slice(
      indexOfFirstProject,
      indexOfLastProject
    );
  }

  // Pagination Handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Check if there are any projects to display
  let hasItems;
  if (propertyManagerInfo) {
    hasItems = propManagerWorkOrders && propManagerWorkOrders.length > 0;
  } else {
    hasItems = vendorWorkOrders && vendorWorkOrders.length > 0;
  }

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
                {/* Counter + Actions */}
                <div className="project-counters-wrapper">
                  <div className="counters-wrapper">
                    <div className="work-orders-counter">
                      {/* TODO: MAKE WORK ORDERS COUNTER DYNAMIC */}
                      <p>5 Work Orders</p>
                    </div>
                  </div>

                  {/* Actions */}
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
                          to={`/work-orders/new/${project._id}`}
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

            {/* Applications */}
            <div className="row">
              {propertyManagerInfo && (
                <>
                  {/* Applications */}
                  <a id="applications"></a>
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
                      <a id="workOrders"></a>
                    </div>
                  </div>
                  {/* ./Applications */}
                </>
              )}
            </div>
            {/* ./Applications */}

            {/* Vendor Work Orders */}
            {vendorInfo && (
              <>
                {vendorWorkOrdersLoading ? (
                  <Loader />
                ) : (
                  <div className="row">
                    <div className="col-12">
                      <div className="panel-wrapper bg-transparent project-work-orders-wrapper pt-0">
                        <div className="panel-title-wrapper">
                          <h2>Work Orders</h2>
                        </div>

                        <div className="panel-content-wrapper">
                          <div className="work-orders-wrapper">
                            <div className="work-orders-content-wrapper">
                              <div className="row">
                                {hasItems &&
                                  vendorWorkOrders.map((order) => (
                                    <div
                                      className="col-12 col-sm-12 col-md-4 col-lg-4 d-flex align-items-stretch"
                                      key={`order_${order._id}`}
                                    >
                                      {/* Work Order Card */}
                                      <div className="work-order-card-wrapper">
                                        {/* Header */}
                                        <div
                                          className={`work-order-card-header`}
                                        >
                                          <div
                                            className={`color-status-bar ${setStatusColor(
                                              order.workOrderStatus
                                            )}`}
                                          ></div>
                                          {/* Actions */}
                                          <div className="header-actions"></div>
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
                                            className={`work-order-status ${setStatusColor(
                                              order.workOrderStatus
                                            )}`}
                                          >
                                            <p className="status">
                                              {setStatusText(
                                                order.workOrderStatus
                                              )}
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
                                            {torontoDateTime(order.endDateTime)}
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
                                            {/* pending status */}
                                            {order.workOrderStatus ===
                                              "pending" && (
                                              <div className="row">
                                                {/* Reschedule */}
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                  <button
                                                    type="button"
                                                    className="btn-app btn-app-xs btn-app-red"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#vendorRescheduleForm"
                                                    aria-expanded="false"
                                                    aria-controls="vendorRescheduleForm"
                                                    key={`orderReschedule_${order._id}`}
                                                  >
                                                    <i className="fa-solid fa-calendar-days"></i>
                                                  </button>
                                                </div>
                                                {/* ./Reschedule */}

                                                {/* Accept */}
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-end">
                                                  <button
                                                    type="button"
                                                    className="btn-app btn-app-xs btn-app-aqua"
                                                    onClick={() =>
                                                      vendorAcceptWorkOrderHandler(
                                                        order.project._id,
                                                        order._id
                                                      )
                                                    }
                                                    key={`orderAccept_${order._id}`}
                                                  >
                                                    <i
                                                      className="fa-solid fa-check"
                                                      key={`orderAcceptIcon_${order._id}`}
                                                    ></i>
                                                  </button>
                                                </div>
                                                {/* ./Accept */}

                                                {/*  Reschedule Form */}
                                                <div className="col-12">
                                                  <div
                                                    className="collapse reschedule-form-wrapper"
                                                    id="vendorRescheduleForm"
                                                  >
                                                    <form
                                                      className="form"
                                                      onSubmit={(e) =>
                                                        vendorRescheduleWorkOrderHandler(
                                                          e,
                                                          order.vendor._id,
                                                          order.project._id,
                                                          order._id
                                                        )
                                                      }
                                                    >
                                                      <div className="row">
                                                        <div className="col-12">
                                                          <label htmlFor="startDateTime">
                                                            Start Date
                                                          </label>
                                                          <input
                                                            type="datetime-local"
                                                            name="startDateTime"
                                                            id="startDateTime"
                                                            className="form-control"
                                                            placeholder="startDateTime"
                                                            value={
                                                              vendorStartDateTime
                                                            }
                                                            onChange={(e) =>
                                                              setVendorStartDateTime(
                                                                e.target.value
                                                              )
                                                            }
                                                          />
                                                        </div>
                                                        {/* Input: DateTime Picker */}

                                                        <div className="col-12">
                                                          <label htmlFor="endDateTime">
                                                            End Date
                                                          </label>
                                                          <input
                                                            type="datetime-local"
                                                            name="endDateTime"
                                                            id="endDateTime"
                                                            className="form-control"
                                                            placeholder="endDateTime"
                                                            value={
                                                              vendorEndDateTime
                                                            }
                                                            onChange={(e) =>
                                                              setVendorEndDateTime(
                                                                e.target.value
                                                              )
                                                            }
                                                          />
                                                        </div>
                                                        {/* Input: DateTime Picker */}

                                                        {/* Submit */}
                                                        <div className="col-12">
                                                          <div className="submit-wrapper">
                                                            <button
                                                              type="submit"
                                                              className="btn-app btn-app-xs btn-app-red"
                                                            >
                                                              Reschedule
                                                            </button>
                                                          </div>
                                                        </div>
                                                        {/* ./Submit */}
                                                      </div>
                                                    </form>
                                                  </div>
                                                </div>
                                                {/*  ./Reschedule Form */}
                                              </div>
                                            )}
                                            {/* ./pending status */}

                                            {/* reschedule status */}
                                            {order.workOrderStatus ===
                                              "rescheduleByPropertyManager" && (
                                              <div className="row">
                                                {/* Reschedule */}
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                  <button
                                                    type="button"
                                                    className="btn-app btn-app-xs btn-app-red"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#vendorRescheduleForm"
                                                    aria-expanded="false"
                                                    aria-controls="vendorRescheduleForm"
                                                    key={`orderReschedule_${order._id}`}
                                                  >
                                                    <i className="fa-solid fa-calendar-days"></i>
                                                  </button>
                                                </div>
                                                {/* ./Reschedule */}

                                                {/* Accept */}
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-end">
                                                  <button
                                                    type="button"
                                                    className="btn-app btn-app-xs btn-app-aqua"
                                                    onClick={() =>
                                                      vendorAcceptWorkOrderHandler(
                                                        order.project._id,
                                                        order._id
                                                      )
                                                    }
                                                    key={`orderAccept_${order._id}`}
                                                  >
                                                    <i
                                                      className="fa-solid fa-check"
                                                      key={`orderAcceptIcon_${order._id}`}
                                                    ></i>
                                                  </button>
                                                </div>
                                                {/* ./Accept */}

                                                {/*  Reschedule Form */}
                                                <div className="col-12">
                                                  <div
                                                    className="collapse reschedule-form-wrapper"
                                                    id="vendorRescheduleForm"
                                                  >
                                                    <form
                                                      className="form"
                                                      onSubmit={(e) =>
                                                        vendorRescheduleWorkOrderHandler(
                                                          e,
                                                          order.vendor._id,
                                                          order.project._id,
                                                          order._id
                                                        )
                                                      }
                                                    >
                                                      <div className="row">
                                                        <div className="col-12">
                                                          <label htmlFor="startDateTime">
                                                            Start Date
                                                          </label>
                                                          <input
                                                            type="datetime-local"
                                                            name="startDateTime"
                                                            id="startDateTime"
                                                            className="form-control"
                                                            placeholder="startDateTime"
                                                            value={
                                                              vendorStartDateTime
                                                            }
                                                            onChange={(e) =>
                                                              setVendorStartDateTime(
                                                                e.target.value
                                                              )
                                                            }
                                                          />
                                                        </div>
                                                        {/* Input: DateTime Picker */}

                                                        <div className="col-12">
                                                          <label htmlFor="endDateTime">
                                                            End Date
                                                          </label>
                                                          <input
                                                            type="datetime-local"
                                                            name="endDateTime"
                                                            id="endDateTime"
                                                            className="form-control"
                                                            placeholder="endDateTime"
                                                            value={
                                                              vendorEndDateTime
                                                            }
                                                            onChange={(e) =>
                                                              setVendorEndDateTime(
                                                                e.target.value
                                                              )
                                                            }
                                                          />
                                                        </div>
                                                        {/* Input: DateTime Picker */}

                                                        {/* Submit */}
                                                        <div className="col-12">
                                                          <div className="submit-wrapper">
                                                            <button
                                                              type="submit"
                                                              className="btn-app btn-app-xs btn-app-red"
                                                            >
                                                              Reschedule
                                                            </button>
                                                          </div>
                                                        </div>
                                                        {/* ./Submit */}
                                                      </div>
                                                    </form>
                                                  </div>
                                                </div>
                                                {/*  ./Reschedule Form */}
                                              </div>
                                            )}
                                            {/* ./reschedule status */}

                                            {/* accepted status */}
                                            {order.workOrderStatus ===
                                              "accepted" && (
                                              <div className="row">
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3 text-center">
                                                  <Link
                                                    to={`/work-orders/vendor/order/${order._id}`}
                                                    className="btn-app btn-app-xs btn-app-dark-outline"
                                                    key={order._id}
                                                  >
                                                    View
                                                  </Link>
                                                </div>
                                              </div>
                                            )}
                                            {/* ./accepted status */}

                                            {/* inProgress status */}
                                            {order.workOrderStatus ===
                                              "inProgress" && (
                                              <div className="row">
                                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3 text-center">
                                                  <Link
                                                    to={`/work-orders/vendor/order/${order._id}`}
                                                    className="btn-app btn-app-xs btn-app-dark-outline"
                                                    key={order._id}
                                                  >
                                                    View
                                                  </Link>
                                                </div>
                                              </div>
                                            )}
                                            {/* ./inProgress status */}

                                            {/* closed status */}
                                            {order.workOrderStatus ===
                                              "closed" && <p>closed</p>}
                                            {/* ./closed status */}
                                          </div>
                                          {/* ./Actions */}
                                        </div>
                                        {/* ./Footer */}
                                      </div>
                                      {/* ./Work Order Card */}
                                    </div>
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
                                      vendorWorkOrders.length / itemsPerPage
                                    )}
                                    breakLabel="..."
                                    nextLabel=">>"
                                    previousLabel="<<"
                                    pageRangeDisplayed={5}
                                    marginPagesDisplayed={2}
                                    onPageChange={handlePageChange}
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    key={`vendorPagination`}
                                  />
                                )}
                                {!hasItems && (
                                  <h4 className="text-center">
                                    You have no work orders for this project
                                  </h4>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* ./Pagination */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {/* ./Vendor Work Orders */}

            {/* Property Manager Work Orders */}
            {propertyManagerInfo && (
              <>
                {propManagerWorkOrdersLoading ? (
                  <Loader />
                ) : (
                  <div className="row">
                    <div className="col-12">
                      <div className="panel-wrapper bg-transparent project-work-orders-wrapper mt-0 pt-0">
                        <div className="panel-title-wrapper">
                          <h2>Work Orders</h2>
                        </div>

                        <div className="panel-content-wrapper">
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
                                              className={`color-status-bar ${setStatusColor(
                                                order.workOrderStatus
                                              )}`}
                                            ></div>
                                            {/* Actions */}
                                            <div className="header-actions">
                                              <Link
                                                to={`/work-orders/edit/${project._id}/${order._id}`}
                                                className="header-action f-primary"
                                              >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                              </Link>
                                              <button
                                                type="button"
                                                className="header-action"
                                                key={order._id}
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
                                              className={`work-order-status ${setStatusColor(
                                                order.workOrderStatus
                                              )}`}
                                            >
                                              <p className="status">
                                                {setStatusText(
                                                  order.workOrderStatus
                                                )}
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
                                              {/* reschedule status */}
                                              {order.workOrderStatus ===
                                                "rescheduleByVendor" && (
                                                <div className="row">
                                                  {/* Reschedule */}
                                                  <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                    <button
                                                      type="button"
                                                      className="btn-app btn-app-xs btn-app-red"
                                                      data-bs-toggle="collapse"
                                                      data-bs-target="#vendorRescheduleForm"
                                                      aria-expanded="false"
                                                      aria-controls="vendorRescheduleForm"
                                                      key={`orderReschedule_${order._id}`}
                                                    >
                                                      <i className="fa-solid fa-calendar-days"></i>
                                                    </button>
                                                  </div>
                                                  {/* ./Reschedule */}

                                                  {/* Accept */}
                                                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-end">
                                                    <button
                                                      type="button"
                                                      className="btn-app btn-app-xs btn-app-aqua"
                                                      onClick={() =>
                                                        propManagerAcceptWorkOrderHandler(
                                                          order.project._id,
                                                          order._id
                                                        )
                                                      }
                                                      key={`orderAccept_${order._id}`}
                                                    >
                                                      <i
                                                        className="fa-solid fa-check"
                                                        key={`orderAcceptIcon_${order._id}`}
                                                      ></i>
                                                    </button>
                                                  </div>
                                                  {/* ./Accept */}

                                                  {/*  Reschedule Form */}
                                                  <div className="col-12">
                                                    <div
                                                      className="collapse reschedule-form-wrapper"
                                                      id="vendorRescheduleForm"
                                                    >
                                                      <form
                                                        className="form"
                                                        onSubmit={(e) =>
                                                          propManagerRescheduleWorkOrderHandler(
                                                            e,
                                                            order.vendor._id,
                                                            order.project._id,
                                                            order._id
                                                          )
                                                        }
                                                      >
                                                        <div className="row">
                                                          <div className="col-12">
                                                            <label htmlFor="startDateTime">
                                                              Start Date
                                                            </label>
                                                            <input
                                                              type="datetime-local"
                                                              name="startDateTime"
                                                              id="startDateTime"
                                                              className="form-control"
                                                              placeholder="startDateTime"
                                                              value={
                                                                propManagerStartDateTime
                                                              }
                                                              onChange={(e) =>
                                                                setPropManagerStartDateTime(
                                                                  e.target.value
                                                                )
                                                              }
                                                            />
                                                          </div>
                                                          {/* Input: DateTime Picker */}

                                                          <div className="col-12">
                                                            <label htmlFor="endDateTime">
                                                              End Date
                                                            </label>
                                                            <input
                                                              type="datetime-local"
                                                              name="endDateTime"
                                                              id="endDateTime"
                                                              className="form-control"
                                                              placeholder="endDateTime"
                                                              value={
                                                                propManagerEndDateTime
                                                              }
                                                              onChange={(e) =>
                                                                setPropManagerEndDateTime(
                                                                  e.target.value
                                                                )
                                                              }
                                                            />
                                                          </div>
                                                          {/* Input: DateTime Picker */}

                                                          {/* Submit */}
                                                          <div className="col-12">
                                                            <div className="submit-wrapper">
                                                              <button
                                                                type="submit"
                                                                className="btn-app btn-app-xs btn-app-red"
                                                              >
                                                                Reschedule
                                                              </button>
                                                            </div>
                                                          </div>
                                                          {/* ./Submit */}
                                                        </div>
                                                      </form>
                                                    </div>
                                                  </div>
                                                  {/*  ./Reschedule Form */}
                                                </div>
                                              )}
                                              {/* ./reschedule status */}

                                              {/* inProgress status */}
                                              {order.workOrderStatus ===
                                                "inProgress" && (
                                                <div className="row">
                                                  <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                    {closeWorkOrderLoading ? (
                                                      <Loader />
                                                    ) : (
                                                      <button
                                                        type="button"
                                                        className="btn-app btn-app-xs btn-app-purple"
                                                        onClick={() =>
                                                          closeOrderHandler(
                                                            order.project._id,
                                                            order._id
                                                          )
                                                        }
                                                        key={order._id}
                                                      >
                                                        Close
                                                      </button>
                                                    )}
                                                  </div>
                                                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-end">
                                                    <Link
                                                      to={`/work-orders/property-manager/order/${order._id}`}
                                                      className="btn-app btn-app-xs btn-app-dark-outline"
                                                      key={order._id}
                                                    >
                                                      View
                                                    </Link>
                                                  </div>
                                                </div>
                                              )}
                                              {/* ./inProgress status */}

                                              {/* pending status 
                                              {order.workOrderStatus === "pending" && (
                                                <p>pending</p>
                                              )}
                                              ./pending status */}

                                              {/* accepted status */}
                                              {order.workOrderStatus ===
                                                "accepted" && (
                                                <div className="row">
                                                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3 text-center">
                                                    <Link
                                                      to={`/work-orders/property-manager/order/${order._id}`}
                                                      className="btn-app btn-app-xs btn-app-dark-outline"
                                                      key={order._id}
                                                    >
                                                      View
                                                    </Link>
                                                  </div>
                                                </div>
                                              )}
                                              {/* ./accepted status */}

                                              {/* closed status */}
                                              {order.workOrderStatus ===
                                                "closed" && (
                                                <div className="row">
                                                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3 text-center">
                                                    <Link
                                                      to={`/work-orders/property-manager/order/${order._id}`}
                                                      className="btn-app btn-app-xs btn-app-dark-outline"
                                                      key={order._id}
                                                    >
                                                      View
                                                    </Link>
                                                  </div>
                                                </div>
                                              )}
                                              {/* ./closed status */}
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
                                    key={`propertyManagerPagination`}
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
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {/* ./Property Manager Work Orders */}
          </div>
        </>
      )}
    </section>
  );
};

export default Project;
