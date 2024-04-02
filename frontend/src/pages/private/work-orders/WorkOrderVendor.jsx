// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
import { useGetVendorWorkOrderQuery } from "../../../slices/workOrderApiSlice";
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
function WorkOrder() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Form Fields
  // TODO: Images uploader
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  // Parse URL to get query params
  const url = window.location.pathname;
  const urlParts = url.split("/");
  const urlWorkOrderId = urlParts[urlParts.length - 1]; // Get /:projectId part of the URL

  // Redux Store
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Vendor Info through the useSelector Hook
  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const {
    data: workOrder,
    isError: workOrderError,
    isLoading: workOrderLoading,
    refetch: workOrderRefetch,
  } = useGetVendorWorkOrderQuery(urlWorkOrderId);

  // Redux Toolkit Mutations
  // TODO: Add Redux Toolkit Mutations here

  //----------
  // Effects
  //----------
  // Refetch vendor stores
  useEffect(() => {
    workOrderRefetch();
  }, [vendorInfo, workOrderRefetch]);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (workOrderError) {
    console.log("Vendor Work Order Error: ", workOrderError);
  }

  //----------
  // Handlers
  //----------
  // Submit Form Handler
  const submitFormHandler = (e) => {
    e.preventDefault();

    try {
      console.log("Submit Form Handler");
    } catch (error) {
      toast.error(error?.data?.message || error?.error); // Toastify implementation
      console.log("Create Work Order Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  //----------
  // Functions
  //----------
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
                </div>
                {/* Counter + Actions */}
                <div className="work-order-counters-wrapper">
                  <div className="counters-wrapper">
                    <div className="work-orders-counter">
                      {/* TODO: MAKE WORK ORDERS COUNTER DYNAMIC */}
                      <h2>{setStatusText(workOrder?.workOrderStatus)}</h2>
                    </div>
                  </div>

                  <div className="project-actions">
                    <Link
                      to={`mailto:${workOrder?.project.managerEmail}`}
                      className="btn-app btn-app-xs btn-app-dark-outline me-3"
                    >
                      <i className="fa-solid fa-envelope"></i>
                    </Link>
                    <Link
                      to={`tel:${workOrder?.project.managerPhone}`}
                      className="btn-app btn-app-xs btn-app-dark-outline me-3"
                    >
                      <i className="fa-solid fa-phone"></i>
                    </Link>
                  </div>
                </div>
                {/* ./Counter + Actions */}
                <hr />
                <div className="project-description">
                  <form action="" onClick={submitFormHandler}>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="row">
                          <div className="col-12 mb-2">
                            <label htmlFor="name">Log Title</label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              placeholder="Work order log title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
                          {/* Input: Field */}

                          <div className="col-12 my-3">
                            <label htmlFor="name">Image</label>
                            <p>image uploader</p>
                          </div>
                          {/* Input: Field */}
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="row">
                          <div className="col-12 mb-2">
                            <label htmlFor="name">Comments / Observations</label>
                            <textarea
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              placeholder="Enter description...."
                              rows={4}
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </div>
                          {/* Input: Textarea */}
                        </div>
                      </div>

                      {/* Submit */}
                      {/* TODO: ADD MUTATION LOADING */}
                      <div className="col-12 text-center mt-2">
                        <div className="submit-wrapper">
                          <button
                            type="submit"
                            className="btn-app btn-app-xs btn-app-purple"
                          >
                            + Work Order Log
                          </button>
                        </div>
                      </div>
                      {/* ./Submit */}
                    </div>
                  </form>
                </div>
              </div>
              {/* ./Info */}
            </div>

            <p>WorkOrder</p>
            {/* Image & Info */}
          </div>
        </>
      )}
    </section>
  );
}

export default WorkOrder;
