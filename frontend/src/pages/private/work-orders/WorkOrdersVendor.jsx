// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllVendorWorkOrdersQuery,
  useAcceptWorkOrderMutation,
} from "../../../slices/workOrderApiSlice"; // TODO: Use acceptWorkOrder & rescheduleWorkOrder
// Time
import { torontoDateTime } from "../../../utils/formatDates";
// Components
import Loader from "../../../components/Loader";
// Toast
import { toast } from "react-toastify";
// Styles
import "./WorkOrders.scss";

// Component
function WorkOrdersVendor() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Redux Store
  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const {
    data: vendorWorkOrders,
    isError: vendorWorkOrdersError,
    isLoading: vendorWorkOrdersLoading,
    refetch: vendorWorkOrdersRefetch,
  } = useGetAllVendorWorkOrdersQuery({
    vendorId: vendorInfo?._id,
  });

  // Redux Toolkit Mutations
  const [
    acceptWorkOrder,
    { isError: acceptWorkOrderError, isLoading: acceptWorkOrderLoading },
  ] = useAcceptWorkOrderMutation();

  //----------
  // Effects
  //----------
  // Refetch vendor stores
  useEffect(() => {
    vendorWorkOrdersRefetch();
  }, [vendorInfo, vendorWorkOrdersRefetch]);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (vendorWorkOrdersError) {
    console.log("Vendor All Work Orders Error: ", vendorWorkOrdersError);
  }
  if (acceptWorkOrderError) {
    console.log("Accept Work Order Applications Error: ", acceptWorkOrderError);
  }

  //----------
  // Handlers
  //----------
  // Accept Work Order
  const acceptWorkOrderHandler = async (projectId, workOrderId) => {
    try {
      await acceptWorkOrder({
        projectId: projectId,
        workOrderId: workOrderId,
      }).unwrap();
      toast.success("Work order accepted successfully");
      vendorWorkOrdersRefetch();
    } catch (error) {
      toast.error("Work order has already been updated for this project");
      console.log("Project Application Error: ", error);
    }

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
  const currentWorkOrders = vendorWorkOrders?.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Pagination Handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Check if there are any projects to display
  const hasItems = vendorWorkOrders && vendorWorkOrders?.length > 0;

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper work-orders-wrapper">
      {/* Vendor Orders */}
      {vendorWorkOrdersLoading ? (
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
                      key={`order_${order._id}`}
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
                          <div className="header-actions"></div>
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
                            <p className="status">{order.workOrderStatus}</p>
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
                            {order.workOrderStatus === "pending" ? (
                              <>
                                {/* Pending Status */}
                                <div className="row">
                                  <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <button
                                      type="button"
                                      className="btn-app btn-app-xs btn-app-red"
                                      onClick={() =>
                                        rescheduleWorkOrderHandler(order._id)
                                      }
                                      key={`orderReschedule_${order._id}`}
                                    >
                                      <i className="fa-solid fa-calendar-days"></i>
                                    </button>
                                  </div>
                                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-end">
                                    <button
                                      type="button"
                                      className="btn-app btn-app-xs btn-app-aqua"
                                      onClick={() =>
                                        acceptWorkOrderHandler(
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
                                </div>
                                {/* ./Pending Status */}
                              </>
                            ) : (
                              <>
                                {/* Other Status */}
                                <div className="row">
                                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3 text-center">
                                    <button
                                      type="button"
                                      className="btn-app btn-app-xs btn-app-dark-outline"
                                      key={`orderView_${order._id}`}
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
                  <h4 className="text-center">No projects created yet</h4>
                )}
              </div>
            </div>
          </div>
          {/* ./Pagination */}
        </>
      )}
      {/* ./Vendor Orders */}
    </section>
  );
}

export default WorkOrdersVendor;
