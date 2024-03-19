// Dependencies
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// State
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectQuery } from "../../../../slices/projectsApiSlice";
// Components
import Loader from "../../../../components/Loader";
// Styles
import "./Projects.scss";
// Assets
import imgPlaceholder from "../../../../assets/img/placeholder-landscape.png";

// Component
const Project = () => {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Parse URL to get query params
  const url = window.location.pathname;
  const urlParts = url.split("/");
  const urlPropertyManagerId = urlParts[urlParts.length - 2]; // Get /:projectId part of the URL
  const urlProjectId = urlParts[urlParts.length - 1]; // Get /:projectId part of the URL

  // Redux Store
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Vendor Info through the useSelector Hook

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
  if (projectError) {
    console.log("Project Error: ", projectError);
  }

  //----------
  // Handlers
  //----------

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
                {project.coverImage.url === "" ? (
                  <>
                    <img
                      src={imgPlaceholder}
                      alt={project._id}
                      className="project-cover"
                    />
                  </>
                ) : (
                  <img
                    src={project.coverImage.url}
                    alt={project._id}
                    className="project-cover"
                  />
                )}
              </div>
              {/* ./Image */}

              <div className="project-info-wrapper">
                <div className="project-title-wrapper">
                  <h1>{project.name}</h1>
                </div>
                <div className="project-category">
                  <h2>{project.serviceCategory.name}</h2>
                </div>
                <div className="project-counters-wrapper">
                  <div className="counters-wrapper">
                    <div className="work-orders-counter">
                      {/* TODO: MAKE WORK ORDERS COUNTER DYNAMIC */}
                      <p>5 Work Orders</p>
                    </div>
                  </div>

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
                          to=""
                          className="btn-app btn-app-sm btn-app-purple"
                        >
                          <i className="fa-solid fa-plus"></i>
                          <span className="ms-2">work order</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to=""
                          className="btn-app btn-app-sm btn-app-dark-outline me-3"
                        >
                          contact
                        </Link>

                        <Link
                          to=""
                          className="btn-app btn-app-sm btn-app-purple"
                        >
                          apply
                        </Link>
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

            {/* Work Orders */}
            <div className="row">
              <div className="col-12">
                <div className="panel-wrapper bg-transparent store-services-wrapper p-0">
                  <div className="panel-title-wrapper">
                    <h2>Work Orders</h2>
                  </div>

                  <p>{project.name}</p>
                </div>
              </div>
            </div>
            {/* ./Work Orders */}
          </div>
        </>
      )}
    </section>
  );
};

export default Project;
