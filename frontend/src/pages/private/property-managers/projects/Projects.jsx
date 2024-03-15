// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
// TODO: Add Slices
// Components
import Loader from "../../../../components/Loader";
// Styles
import "./Projects.scss";
// Assets
import imgPlaceholder from "../../../../assets/img/placeholder-landscape.png";

// Component
function Projects() {
  //----------
  // State
  //----------

  //----------
  // Effects
  //----------
  // Refetch vendor stores
  useEffect(() => {
    //
  }, []);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  /*
  if (vendorStoresError) {
    console.log("Vendor Stores Error: ", vendorStoresError);
  }
  */

  //----------
  // Handlers
  //----------

  //----------
  // Pagination
  //----------
  /*
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // TODO: Set for 3 at the moment to be able to show pagination

  // Calculate indexes of items to display on the current page
  const indexOfLastStore = (currentPage + 1) * itemsPerPage;
  const indexOfFirstStore = indexOfLastStore - itemsPerPage;
  const currentStores = vendorStores?.slice(
    indexOfFirstStore,
    indexOfLastStore
  );
*/

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper projects-wrapper">
      <p>Projects</p>
    </section>
  );
}

export default Projects;
