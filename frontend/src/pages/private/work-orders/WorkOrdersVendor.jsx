// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllVendorWorkOrdersQuery,
  useVendorAcceptWorkOrderMutation,
  useVendorRescheduleWorkOrderMutation,
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

  // Form Fields
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

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
  ] = useVendorAcceptWorkOrderMutation();

  const [
    rescheduleWorkOrder,
    {
      isError: rescheduleWorkOrderError,
      isLoading: rescheduleWorkOrderLoading,
    },
  ] = useVendorRescheduleWorkOrderMutation();

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
  if (rescheduleWorkOrderError) {
    console.log(
      "Reschedule Work Order Applications Error: ",
      rescheduleWorkOrderError
    );
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
      toast.error("There was an error rescheduling this work order");
      console.log("Accept Work Order Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  // Reschedule Work Order
  const rescheduleWorkOrderHandler = async (
    e,
    vendor,
    projectId,
    workOrderId
  ) => {
    e.preventDefault();

    try {
      // Convert startDateTime and endDateTime to UTC format
      const startDateTimeUTC = new Date(startDateTime).toISOString();
      const endDateTimeUTC = new Date(endDateTime).toISOString();

      // Form Data
      const formData = new FormData();

      formData.append("vendor", vendor);
      formData.append("startDateTime", startDateTimeUTC);
      formData.append("endDateTime", endDateTimeUTC);

      // Reschedule Work Order
      const res = await rescheduleWorkOrder({
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

  //----------
  // Functions
  //----------
  // Set Color Status
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

  // Set Color Status
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
                          <h2 className="name">{order?.name}</h2>

                          {/* Status Badge */}
                          <div
                            className={`work-order-status ${setStatusColor(
                              order.workOrderStatus
                            )}`}
                          >
                            <p className="status">
                              {setStatusText(order.workOrderStatus)}
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
                            {/* pending status */}
                            {order.workOrderStatus === "pending" && (
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
                                        rescheduleWorkOrderHandler(
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
                                            value={startDateTime}
                                            onChange={(e) =>
                                              setStartDateTime(e.target.value)
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
                                            value={endDateTime}
                                            onChange={(e) =>
                                              setEndDateTime(e.target.value)
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
                                        rescheduleWorkOrderHandler(
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
                                            value={startDateTime}
                                            onChange={(e) =>
                                              setStartDateTime(e.target.value)
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
                                            value={endDateTime}
                                            onChange={(e) =>
                                              setEndDateTime(e.target.value)
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
                            {order.workOrderStatus === "accepted" && (
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
                            )}
                            {/* ./accepted status */}

                            {/* closed status */}
                            {order.workOrderStatus === "closed" && (
                              <p>closed</p>
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
