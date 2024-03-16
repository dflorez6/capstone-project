// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from "../../../../slices/projectsApiSlice";
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
  // TODO: ACA QUEDE ACA QUEDE ACA QUEDE
  // TODO: Next Tasks:
  /*
  - Functionalities: 
      * Add Pagination
      * Use slice to fetch all projects  
      * For Prop Manager that is the project owner -> delete project + icon
      * View Button -> Link to correct project detail (showing)
  */

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
      {/* Title */}
      <div className="panel-wrapper bg-transparent mt-0 p-0">
        <div className="panel-title-wrapper">
          <h1 className="m-0">Projects</h1>
        </div>
      </div>
      {/* Title */}

      {/* Projects */}
      <div className="projects-content-wrapper">
        <div className="row">
          {/* TODO: Paginated Projects .map */}
          <div className="col-12 sm-12 col-md-4 col-lg-4">
            {/* ./Project Card Option 2 */}
            <div
              className="project-card-wrapper"
              style={{ backgroundImage: `url(${imgPlaceholder})` }}
            >
              <div className="card-overlay">
                <div className="card-title">
                  <h2>Project 2</h2>
                </div>
                <div className="card-category">
                  {/* TODO: Maybe use the ServiceCategory Icon */}
                  <h3>Electrical</h3>
                </div>

                <div className="card-content-date">
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-calendar-days icon"></i>
                  </div>
                  <p className="date-start">Start</p>
                  <p className="dash">-</p>
                  <p className="date-start">End</p>
                </div>
                <div className="card-content-date">
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-clock icon"></i>
                  </div>
                  <p className="date-start">Start</p>
                  <p className="dash">-</p>
                  <p className="date-start">End</p>
                </div>
                <div className="card-actions">
                  <Link
                    to={"/"}
                    className="btn-app btn-app-sm btn-app-white-outline"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* TODO: Paginated Projects .map */}
        </div>
      </div>
      {/* ./Projects */}
    </section>
  );
}

export default Projects;
