// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// State
import { useDispatch, useSelector } from "react-redux";
import {
  useGetPropertyManagerWorkOrderQuery,
  useUpdateWorkOrderMutation,
} from "../../../slices/workOrderApiSlice";
import { useGetAccepetedVendorApplicationsQuery } from "../../../slices/projectApplicationApiSlice";
// Components
import Loader from "../../../components/Loader";
// Toast
import { toast } from "react-toastify";
// Time
import { torontoDateTimeDatePicker } from "../../../utils/formatDates";
// Styles
import "./WorkOrders.scss";

// Component
function WorkOrderEdit() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Form Fields
  const [name, setName] = useState("");
  const [vendor, setVendor] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  // Parse URL to get query params
  const url = window.location.pathname;
  const urlParts = url.split("/");
  const urlProjectId = urlParts[urlParts.length - 2]; // Get /:projectId part of the URL
  const urlWorkOrderId = urlParts[urlParts.length - 1]; // Get /:workOrderId part of the URL

  // Redux Store
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Vendor Info through the useSelector Hook

  // Redux Toolkit Queries (Redux Toolkit Slice)
  const {
    data: workOrder,
    isError: workOrderError,
    isLoading: workOrderLoading,
    refetch: workOrderRefetch,
  } = useGetPropertyManagerWorkOrderQuery(urlWorkOrderId);

  const { data: acceptedVendors, isError: acceptedVendorsError } =
    useGetAccepetedVendorApplicationsQuery(urlProjectId);

  // Redux Toolkit Mutations
  const [
    updateWorkOrder,
    { isError: updateWorkOrderError, isLoading: updateWorkOrderLoading },
  ] = useUpdateWorkOrderMutation();

  //----------
  // Effects
  //----------
  // Refetch vendor stores
  useEffect(() => {
    setName(workOrder?.name || "");
    setVendor(workOrder?.vendor._id || "");
    setStartDateTime(torontoDateTimeDatePicker(workOrder?.startDateTime) || "");
    setEndDateTime(torontoDateTimeDatePicker(workOrder?.endDateTime) || "");
    workOrderRefetch();
  }, [workOrder, urlWorkOrderId, urlProjectId, workOrderRefetch]);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (workOrderError) {
    console.log("Work Order Error: ", workOrderError);
  }
  if (acceptedVendorsError) {
    console.log("Accepted Vendors Error: ", acceptedVendorsError);
  }
  if (updateWorkOrderError) {
    console.log("Update Work Order Error: ", updateWorkOrderError);
  }

  //----------
  // Handlers
  //----------
  // Form Submit
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Convert startDateTime and endDateTime to UTC format
      const startDateTimeUTC = new Date(startDateTime).toISOString();
      const endDateTimeUTC = new Date(endDateTime).toISOString();

      // Form Data
      const formData = new FormData();

      formData.append("name", name);
      formData.append("vendor", vendor._id);
      formData.append("startDateTime", startDateTimeUTC);
      formData.append("endDateTime", endDateTimeUTC);
      formData.append("project", urlProjectId);

      const res = await updateWorkOrder({
        projectId: urlProjectId,
        workOrderId: workOrder._id,
        data: formData,
      }).unwrap(); // Pass FormData to updateProject function & make API call
      toast.success("Store updated successfully");
      workOrderRefetch(); // Refetch data after successful mutation
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
      console.log("Update Project Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  //----------
  // Functions
  //----------
  // TODO: Implement Functions

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper work-orders-form-wrapper">
      {workOrderLoading ? (
        <Loader />
      ) : (
        <>
          <div className="row">
            <div className="col-12">
              <div className="panel-wrapper mt-0">
                <div className="panel-title-wrapper">
                  <h2>Edit Project</h2>
                </div>

                {/* Form */}
                <div className="panel-content-wrapper">
                  <form id="" className="form" onSubmit={submitHandler}>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
                        <label htmlFor="name">Title</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Work order title"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      {/* Input: Field */}

                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
                        <label htmlFor="serviceCategory">Vendor</label>
                        <select
                          name="serviceCategory"
                          id="serviceCategory"
                          className="form-control"
                          value={vendor}
                          onChange={(e) => setVendor(e.target.value)}
                        >
                          <option value="" disabled>
                            Select...
                          </option>
                          {acceptedVendors &&
                            acceptedVendors?.map((acceptedApplication) => (
                              <option
                                key={acceptedApplication.vendor._id}
                                value={acceptedApplication.vendor._id}
                              >
                                {acceptedApplication.vendor.companyName}
                              </option>
                            ))}
                        </select>
                      </div>
                      {/* Input: Select */}

                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
                        <label htmlFor="startDateTime">Start Date</label>
                        <input
                          type="datetime-local"
                          name="startDateTime"
                          id="startDateTime"
                          className="form-control"
                          placeholder="startDateTime"
                          value={startDateTime}
                          onChange={(e) => setStartDateTime(e.target.value)}
                        />
                      </div>
                      {/* Input: DateTime Picker */}

                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
                        <label htmlFor="endDateTime">End Date</label>
                        <input
                          type="datetime-local"
                          name="endDateTime"
                          id="endDateTime"
                          className="form-control"
                          placeholder="endDateTime"
                          value={endDateTime}
                          onChange={(e) => setEndDateTime(e.target.value)}
                        />
                      </div>
                      {/* Input: DateTime Picker */}
                    </div>

                    {updateWorkOrderLoading ? (
                      <Loader />
                    ) : (
                      <>
                        <div className="row">
                          {/* Submit */}
                          <div className="col-12">
                            <div className="submit-wrapper">
                              <button
                                type="submit"
                                className="btn-app btn-app-purple"
                              >
                                Update Work Order
                              </button>
                            </div>
                          </div>
                          {/* ./Submit */}
                          {/* ./Back */}
                          <div className="row">
                            <div className="col-12 text-center mt-3">
                              <Link
                                to={`/projects/${propertyManagerInfo._id}/${urlProjectId}`}
                                className="f-primary"
                              >
                                <i className="fa-solid fa-chevron-left"></i>{" "}
                                Back
                              </Link>
                            </div>
                          </div>
                          {/* ./Back */}
                        </div>
                      </>
                    )}
                  </form>
                </div>
                {/* ./Form */}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default WorkOrderEdit;
