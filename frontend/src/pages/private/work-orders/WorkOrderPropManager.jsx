// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
import { useGetPropertyManagerWorkOrderQuery } from "../../../slices/workOrderApiSlice";
// Time
import { torontoDateTime } from "../../../utils/formatDates";
// Components
import Loader from "../../../components/Loader";
// Toast
import { toast } from "react-toastify";
// Styles
import "./WorkOrders.scss";

// Component
function WorkOrderPropManager() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Form Fields
  // TODO: Add form fields here

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
  } = useGetPropertyManagerWorkOrderQuery({
    workOrderId: urlWorkOrderId,
  });

  // Redux Toolkit Mutations
  // TODO: Add Redux Toolkit Mutations here

  //----------
  // Effects
  //----------
  // Refetch vendor stores
  useEffect(() => {
    workOrderRefetch();
  }, [propertyManagerInfo, workOrderRefetch]);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (workOrderError) {
    console.log("Property Manager Work Order Error: ", workOrderError);
  }

  //----------
  // Handlers
  //----------
  // TODO: Add Handlers here

  //----------
  // Functions
  //----------
  // TODO: Add Functions here

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
    <section className="private-page-wrapper work-orders-wrapper">
      <p>WorkOrderPropManager</p>
    </section>
  );
}

export default WorkOrderPropManager;
