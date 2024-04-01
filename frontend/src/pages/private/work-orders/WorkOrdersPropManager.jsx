// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
import { useGetAllPropertyManagerWorkOrdersQuery } from "../../../slices/workOrderApiSlice"; // TODO: Use acceptWorkOrder & rescheduleWorkOrder
// Time
import { torontoDateTime } from "../../../utils/formatDates";
// Components
import Loader from "../../../components/Loader";
// Toast
import { toast } from "react-toastify";
// Styles
import "./WorkOrders.scss";

// Component
function WorkOrdersPropManager() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Redux Store
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Vendor Info through the useSelector Hook
  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const {
    data: propManagerWorkOrders,
    isError: propManagerWorkOrdersError,
    isLoading: propManagerWorkOrdersLoading,
    refetch: propManagerWorkOrdersRefetch,
  } = useGetAllPropertyManagerWorkOrdersQuery({
    propertyManagerId: propertyManagerInfo?._id,
  });

  // Redux Toolkit Mutations
  /*
    const [
        createProjectApplication,
        {
          isError: createProjectApplicationError,
          isLoading: createProjectApplicationLoading,
        },
      ] = useCreateProjectApplicationMutation();
      */

  //----------
  // Effects
  //----------
  // Refetch vendor stores
  useEffect(() => {
    if (propertyManagerInfo) {
      propManagerWorkOrdersRefetch();
    }
  }, [propertyManagerInfo, propManagerWorkOrdersRefetch]);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (propManagerWorkOrdersError) {
    console.log(
      "Prop Manager All Work Orders Error: ",
      propManagerWorkOrdersError
    );
  }

  //----------
  // Handlers
  //----------
  // Accept Work Order
  const acceptWorkOrderHandler = async (projectId, workOrderId) => {
    console.log("Reschedule Work Order");
    console.log("workOrderId: ", workOrderId);

    // acceptWorkOrder: PUT /api/v1/work-orders/vendor/accept/:projectId/:workOrderId
  };

  // Reschedule Work Order
  const rescheduleWorkOrderHandler = async (workOrderId) => {
    console.log("Reschedule Work Order");
    console.log("workOrderId: ", workOrderId);
    //
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
      case "reschedule":
        return "reschedule";
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
  const hasItems = propManagerWorkOrders && propManagerWorkOrders?.length > 0;

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper work-orders-wrapper">
      {/* Property Manager Work Orders */}
      {propertyManagerInfo && (
        <>
          {propManagerWorkOrdersLoading ? (
            <Loader />
          ) : (
            <>
              {/* Title */}
              <div className="panel-wrapper bg-transparent mt-0 p-0">
                <div className="panel-title-wrapper">
                  <h1 className="m-0">Work Orders</h1>
                </div>
              </div>
              {/* Title */}

              {/* Work Orders */}
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
                            <div className={`work-order-card-header`}>
                              <div
                                className={`color-status-bar ${setColorStatus(
                                  order.workOrderStatus
                                )}`}
                              ></div>
                              {/* Actions */}
                              <div className="header-actions">
                                <Link
                                  to={`/work-orders/edit/${order.project._id}/${order._id}`}
                                  className="header-action f-primary"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button type="button" className="header-action">
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </div>
                              {/* ./Actions */}
                            </div>
                            {/* ./Header */}

                            {/* Body */}
                            <div className="work-order-card-body">
                              <h2 className="name">{order?.name}</h2>

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
                                Start: {torontoDateTime(order.startDateTime)}
                              </p>
                              <p className="date">
                                End: {torontoDateTime(order.endDateTime)}
                              </p>
                              <p className="user">
                                Vendor: {`${order.vendor.companyName}`}
                              </p>
                            </div>
                            {/* ./Body */}

                            {/* Footer */}
                            <div className="work-order-card-footer">
                              {/* Actions */}
                              <div className="footer-actions">
                                {order.workOrderStatus === "in-progress" ? (
                                  <>
                                    {/* inProgress Status */}
                                    <div className="row">
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                        <button
                                          type="button"
                                          className="btn-app btn-app-xs btn-app-purple"
                                          key={order._id}
                                        >
                                          Close
                                        </button>
                                      </div>
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-end">
                                        <button
                                          type="button"
                                          className="btn-app btn-app-xs btn-app-dark-outline"
                                          key={order._id}
                                        >
                                          View
                                        </button>
                                      </div>
                                    </div>
                                    {/* ./inProgress Status */}
                                  </>
                                ) : (
                                  <>
                                    {/* Other Status */}
                                    <div className="row">
                                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3 text-center">
                                        <button
                                          type="button"
                                          className="btn-app btn-app-xs btn-app-dark-outline"
                                          key={order._id}
                                        >
                                          View
                                        </button>
                                      </div>
                                    </div>
                                    {/* ./Other Status */}
                                  </>
                                )}
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
              {/* ./Work Orders */}

              {/* Pagination */}
              <div className="row">
                <div className="col-12">
                  <div className="app-pagination-wrapper">
                    {hasItems && (
                      <ReactPaginate
                        pageCount={Math.ceil(
                          propManagerWorkOrders.length / itemsPerPage
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
                      <h4 className="text-center">No projects created yet</h4>
                    )}
                  </div>
                </div>
              </div>
              {/* ./Pagination */}
            </>
          )}
        </>
      )}
      {/* ./Property Manager Work Orders */}
    </section>
  );
}

export default WorkOrdersPropManager;
