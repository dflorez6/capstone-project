// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
import {
  useGetPropertyManagerWorkOrderQuery,
  usePropertyManagerCloseWorkOrderMutation,
} from "../../../slices/workOrderApiSlice";
import { useGetPropertyManagerWorkOrderLogsQuery } from "../../../slices/workOrderLogApiSlice";
import { useCreateVendorRatingMutation } from "../../../slices/vendorRatingApiSlice";
import { useCreateVendorReviewMutation } from "../../../slices/vendorReviewApiSlice";
// Time
import { torontoDateTime } from "../../../utils/formatDates";
// Components
import Loader from "../../../components/Loader";
// Toast
import { toast } from "react-toastify";
// Styles
import "./WorkOrders.scss";
// Assets
import imgPlaceholder from "../../../assets/img/placeholder-landscape.png";
import avatarPlaceholder from "../../../assets/img/placeholder-square.jpg";

// Component
function WorkOrderPropManager() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Form Fields
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  // Parse URL to get query params
  const url = window.location.pathname;
  const urlParts = url.split("/");
  const urlWorkOrderId = urlParts[urlParts.length - 1]; // Get /:projectId part of the URL

  // Redux Store
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Vendor Info through the useSelector Hook

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const {
    data: workOrder,
    isError: workOrderError,
    isLoading: workOrderLoading,
    refetch: workOrderRefetch,
  } = useGetPropertyManagerWorkOrderQuery(urlWorkOrderId);
  const {
    data: workOrderLogs,
    isError: workOrderLogsError,
    isLoading: workOrderLogsLoading,
    refetch: workOrderLogsRefetch,
  } = useGetPropertyManagerWorkOrderLogsQuery(urlWorkOrderId);

  // Redux Toolkit Mutations
  const [
    closeWorkOrder,
    { isError: closeWorkOrderError, isLoading: closeWorkOrderLoading },
  ] = usePropertyManagerCloseWorkOrderMutation();
  const [
    createVendorRating,
    { isError: createVendorRatingError, isLoading: createVendorRatingLoading },
  ] = useCreateVendorRatingMutation();
  const [
    createVendorReview,
    { isError: createVendorReviewError, isLoading: createVendorReviewLoading },
  ] = useCreateVendorReviewMutation();

  //----------
  // Effects
  //----------
  // Refetch vendor stores
  useEffect(() => {
    workOrderRefetch();
    workOrderLogsRefetch();
  }, [propertyManagerInfo, workOrderRefetch, workOrderLogsRefetch]);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (workOrderError) {
    console.log("Property Manager Work Order Error: ", workOrderError);
  }
  if (workOrderLogsError) {
    console.log("Property Manager Work Order Logs Error: ", workOrderLogsError);
  }
  if (closeWorkOrderError) {
    console.log(
      "Property Manager Close Work Order Error: ",
      closeWorkOrderError
    );
  }
  if (createVendorRatingError) {
    console.log("Vendor Rating Create Error: ", createVendorRatingError);
  }
  if (createVendorReviewError) {
    console.log("Vendor Review Create Error: ", createVendorReviewError);
  }

  //----------
  // Handlers
  //----------
  // Close Work Order Handler
  const closeOrderHandler = async (e) => {
    try {
      await closeWorkOrder({
        projectId: workOrder?.project?._id,
        workOrderId: workOrder?._id,
      }).unwrap();
      workOrderRefetch();
      workOrderLogsRefetch();
      toast.success("Work order closed successfully");
    } catch (error) {
      toast.error("Work order has already been updated for this project");
      console.log("Project Application Error: ", error);
    }
  };

  // Rate Vendor Handler
  const rateVendorHandler = async (e) => {
    e.preventDefault();

    try {
      // Form Data
      const formData = new FormData();

      formData.append("rating", rating);
      formData.append("vendor", workOrder?.vendor?._id);
      formData.append("propertyManager", workOrder?.project?.propertyManager);

      await createVendorRating(formData).unwrap();
      workOrderRefetch();
      workOrderLogsRefetch();
      setRating(""); // Clear the rating field
      toast.success("Vendor rated successfully");
    } catch (error) {
      toast.error("Vendor rating cannot be blank");
      console.log("Project Application Error: ", error);
    }
  };

  // Review Vendor Handler
  const reviewVendorHandler = async (e) => {
    e.preventDefault();

    try {
      // Form Data
      const formData = new FormData();

      formData.append("review", review);
      formData.append("vendor", workOrder?.vendor?._id);
      formData.append("propertyManager", workOrder?.project?.propertyManager);

      await createVendorReview(formData).unwrap();
      workOrderRefetch();
      workOrderLogsRefetch();
      setReview(""); // clear review field
      toast.success("Vendor review added successfully");
    } catch (error) {
      toast.error("Vendor review cannot be blank");
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
  // TODO: Refactor pagination for Work Order Logs
  /*
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
  const hasItems = propManagerWorkOrders && propManagerWorkOrders?.length > 0;
  */

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper work-order-wrapper">
      {workOrderLoading ? (
        <Loader />
      ) : (
        <>
          {/* Work Order Header */}
          <div className="work-order-content">
            {/* Image & Info */}
            <div className="work-order-image-info-wrapper shadow">
              {/* Image */}
              <div className="work-order-image-wrapper">
                {workOrder?.project.coverImage.url === "" ? (
                  <>
                    <img
                      src={imgPlaceholder}
                      alt={workOrder?._id}
                      className="work-order-cover"
                    />
                  </>
                ) : (
                  <img
                    src={workOrder?.project.coverImage.url}
                    alt={workOrder?._id}
                    className="work-order-cover"
                  />
                )}
              </div>
              {/* ./Image */}

              {/* Info */}
              <div className="work-order-info-wrapper">
                <div className="work-order-title-wrapper">
                  <h1>{workOrder?.name}</h1>
                  <Link
                    to={`/projects/${workOrder?.project?.propertyManager}/${workOrder?.project?._id}`}
                    className="f-primary"
                  >
                    <i className="fa-solid fa-chevron-left"></i> Back
                  </Link>
                </div>

                {/* Counter + Actions */}
                <div className="work-order-counters-wrapper">
                  <div className="counters-wrapper">
                    <div className="work-orders-counter">
                      {/* Status Badge */}
                      <div
                        className={`work-order-status ${setStatusColor(
                          workOrder?.workOrderStatus
                        )}`}
                      >
                        <p className="status">
                          {setStatusText(workOrder?.workOrderStatus)}
                        </p>
                      </div>
                      {/* ./Status Badge */}
                    </div>
                  </div>

                  <div className="work-order-actions">
                    {closeWorkOrderLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {workOrder?.workOrderStatus === "closed" ? (
                          <Link
                            to={`mailto:${workOrder?.project.managerEmail}`}
                            className="btn-app btn-app-xs btn-app-dark-outline"
                          >
                            <i className="fa-solid fa-envelope"></i>
                          </Link>
                        ) : (
                          <>
                            <Link
                              to={`mailto:${workOrder?.project.managerEmail}`}
                              className="btn-app btn-app-xs btn-app-dark-outline me-3"
                            >
                              <i className="fa-solid fa-envelope"></i>
                            </Link>
                            <button
                              type="button"
                              className="btn-app btn-app-xs btn-app-purple"
                              onClick={closeOrderHandler}
                            >
                              Close Order
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* ./Counter + Actions */}

                <hr />

                <div className="work-order-description">
                  {workOrder?.workOrderStatus === "closed" ? (
                    <div>
                      <div className="row">
                        {/* Rating Form */}
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                          <form onSubmit={rateVendorHandler}>
                            <div className="row">
                              <div className="col-12">
                                <label htmlFor="rating">Add Rating</label>
                                <select
                                  name="rating"
                                  id="rating"
                                  className="form-control"
                                  value={rating}
                                  onChange={(e) => setRating(e.target.value)}
                                >
                                  <option value="">Select...</option>
                                  <option value="1">1</option>
                                  <option value="1.5">1.5</option>
                                  <option value="2">2</option>
                                  <option value="2.5">2.5</option>
                                  <option value="3">3</option>
                                  <option value="3.5">3.5</option>
                                  <option value="4">4</option>
                                  <option value="4.5">4.5</option>
                                  <option value="5">5</option>
                                </select>
                              </div>
                            </div>

                            {createVendorRatingLoading ? (
                              <Loader />
                            ) : (
                              <div className="row">
                                {/* Submit */}
                                <div className="col-12 text-center">
                                  <div className="submit-wrapper">
                                    <button
                                      type="submit"
                                      className="btn-app btn-app-xs btn-app-purple mt-3 w-100"
                                    >
                                      Rate Vendor
                                    </button>
                                  </div>
                                </div>
                                {/* ./Submit */}
                              </div>
                            )}
                          </form>
                        </div>
                        {/* ./Rating Form */}

                        {/* Review Form */}
                        <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                          <form onSubmit={reviewVendorHandler}>
                            <div className="row">
                              <div className="col-12">
                                <label htmlFor="name">Add Review</label>
                                <textarea
                                  type="text"
                                  name="name"
                                  id="name"
                                  className="form-control"
                                  placeholder="Work order title"
                                  value={review}
                                  onChange={(e) => setReview(e.target.value)}
                                />
                              </div>
                              {/* Input: Field */}
                            </div>

                            {createVendorReviewLoading ? (
                              <Loader />
                            ) : (
                              <div className="row">
                                {/* Submit */}
                                <div className="col-12 text-center">
                                  <div className="submit-wrapper">
                                    <button
                                      type="submit"
                                      className="btn-app btn-app-xs btn-app-purple-outline mt-3"
                                    >
                                      Add Review
                                    </button>
                                  </div>
                                </div>
                                {/* ./Submit */}
                              </div>
                            )}
                          </form>
                        </div>
                        {/* ./Review Form */}
                      </div>
                    </div>
                  ) : (
                    <p>{workOrder?.project?.description}</p>
                  )}
                </div>
              </div>
              {/* ./Info */}
            </div>
            {/* Image & Info */}
          </div>
          {/* ./Work Order Header */}

          {/* ./Work Order Logs */}
          <div className="work-order-logs-content">
            {workOrderLogsLoading ? (
              <Loader />
            ) : (
              <>
                <div className="panel-wrapper bg-transparent work-order-logs-wrapper pt-0">
                  <div className="panel-title-wrapper">
                    <h2>Work Order Logs</h2>
                  </div>

                  <div className="panel-content-wrapper">
                    <div className="logs-panel">
                      {workOrderLogs?.length > 0 ? (
                        <>
                          {/* Logs Panel */}
                          <div className="row">
                            {/* Panel Navigation */}
                            <div className="col-md-3 logs-panel-navigation">
                              <div
                                className="nav flex-column nav-pills nav-fill app-nav-pills"
                                id="v-pills-tab"
                                role="tablist"
                                aria-orientation="vertical"
                              >
                                {workOrderLogs?.map((log, index) => (
                                  <a
                                    key={index}
                                    className={`nav-link ${
                                      index === 0 && "active"
                                    }`}
                                    id="v-pills-home-tab"
                                    data-bs-toggle="pill"
                                    href={`#v-pills-home-${log._id}`}
                                    role="tab"
                                    aria-controls="v-pills-home"
                                    aria-selected="true"
                                  >
                                    {torontoDateTime(log.createdAt)}
                                  </a>
                                ))}
                              </div>
                            </div>
                            {/* ./Panel Navigation */}

                            {/* Panel Content */}
                            <div className="col-md-9 logs-panel-content">
                              <div
                                className="tab-content app-tab-content"
                                id="v-pills-tabContent"
                              >
                                {workOrderLogs?.map((log, index) => (
                                  <div
                                    key={log._id}
                                    className={`tab-pane fade ${
                                      index === 0 && "show active"
                                    }`}
                                    id={`v-pills-home-${log._id}`}
                                    role="tabpanel"
                                    aria-labelledby="v-pills-home-tab"
                                  >
                                    <div
                                      className="log-wrapper"
                                      key={`logWrapper_${log._id}`}
                                    >
                                      {/* Header */}
                                      <div
                                        className="log-header"
                                        key={`logHeader_${log._id}`}
                                      >
                                        <div
                                          className="log-title"
                                          key={`logTitle_${log._id}`}
                                        >
                                          <h3>
                                            <span className="">
                                              {log.title}
                                            </span>
                                          </h3>
                                        </div>
                                        <div
                                          className="log-date"
                                          key={`logDate_${log._id}`}
                                        >
                                          <h4>
                                            <i className="fa-solid fa-calendar-days"></i>
                                            <span className="ms-2">
                                              {torontoDateTime(log.createdAt)}
                                            </span>
                                          </h4>
                                        </div>
                                        <hr />
                                      </div>
                                      {/* ./Header */}

                                      {/* Body */}
                                      <div
                                        className="log-body"
                                        key={`logBody_${log._id}`}
                                      >
                                        <div className="comment">
                                          <p>{log.comment}</p>
                                        </div>

                                        {/* Images */}
                                        <div
                                          className="row images-wrapper"
                                          key={`logImagesWrapper_${log._id}`}
                                        >
                                          {log.logImages?.length > 0 && (
                                            <>
                                              {log.logImages.map((image) => (
                                                <div
                                                  className="col-12 col-sm-12 col-md-3 col-lg-3 image-wrapper"
                                                  key={`logImageWrapper_${image._id}`}
                                                >
                                                  <button
                                                    className="image"
                                                    style={{
                                                      backgroundImage: `url(${image?.url})`,
                                                      backgroundSize: "cover",
                                                      backgroundPosition:
                                                        "center center",
                                                    }}
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#imageModal_${image._id}`}
                                                    key={`logImage_${image._id}`}
                                                  ></button>

                                                  {/* ./Image Modal */}
                                                  <div
                                                    className="modal fade app-modal app-modal-full-screen"
                                                    id={`imageModal_${image._id}`}
                                                    tabIndex="-1"
                                                    aria-labelledby="exampleModalLabel"
                                                    aria-hidden="true"
                                                  >
                                                    <div className="modal-dialog">
                                                      <div className="modal-content">
                                                        <div className="modal-body">
                                                          <button
                                                            type="button"
                                                            className="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                          ></button>
                                                          <div
                                                            className="modal-image"
                                                            style={{
                                                              backgroundImage: `url(${image?.url})`,
                                                              backgroundSize:
                                                                "contain",
                                                              backgroundRepeat:
                                                                "no-repeat",
                                                              backgroundPosition:
                                                                "center center",
                                                            }}
                                                          ></div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {/* ./Image Modal */}
                                                </div>
                                              ))}
                                            </>
                                          )}
                                        </div>
                                        {/* ./Images */}
                                      </div>
                                      {/* ./Body */}

                                      {/* Footer */}
                                      <div className="log-footer"></div>
                                      {/* ./Footer */}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* ./Panel Content */}
                          </div>
                          {/* Logs Panel */}
                        </>
                      ) : (
                        <>
                          <div className="row">
                            <div className="col-12 text-center my-5">
                              <h4>No logs to display</h4>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* ./Work Order Logs */}
        </>
      )}
    </section>
  );
}

export default WorkOrderPropManager;
