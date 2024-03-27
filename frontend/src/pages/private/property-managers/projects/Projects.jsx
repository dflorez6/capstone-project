// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
import {
  useGetPropertyManagerProjectsQuery,
  useDeleteProjectMutation,
} from "../../../../slices/projectsApiSlice";
// Time
import { torontoDate, torontoTime } from "../../../../utils/formatDates";
// Components
import Loader from "../../../../components/Loader";
// Toast
import { toast } from "react-toastify";
// Styles
import "./Projects.scss";
// Assets
import imgPlaceholder from "../../../../assets/img/placeholder-landscape.png";

// Component
function Projects() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Parse URL to get storeSlug
  const url = window.location.pathname;
  const urlParts = url.split("/");
  const urlPropertyManagerId = urlParts[urlParts.length - 1]; // Get the last part of the URL

  // Redux Store
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Vendor Info through the useSelector Hook

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const {
    data: projects,
    isError: projectsError,
    isLoading: projectsLoading,
    refetch: projectsRefetch,
  } = useGetPropertyManagerProjectsQuery(urlPropertyManagerId); // urlPropertyManagerId // TRY WITH propertyManagerInfo._id

  // Redux Toolkit Mutations
  const [
    deleteProject,
    { isError: deleteProjectError, isLoading: deleteProjectLoading },
  ] = useDeleteProjectMutation();

  //----------
  // Effects
  //----------
  // Refetch vendor stores
  useEffect(() => {
    projectsRefetch();
  }, [projectsRefetch]);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (projectsError) {
    console.log("Projects Error: ", projectsError);
  }
  if (deleteProjectError) {
    console.log("Delete Project Error: ", deleteProjectError);
  }

  //----------
  // Handlers
  //----------
  // Delete Project Handler
  const handleDeleteProject = async (projectId) => {
    // Show confirmation dialog before deletion
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmed) return; // If not confirmed, do nothing

    try {
      // Delete the image using the deleteStoreImage mutation
      await deleteProject({
        propertyManagerId: propertyManagerInfo._id,
        projectId: projectId,
      });
      toast.success("Project deleted successfully");
      projectsRefetch(); // Refetch data after successful deletion
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
      console.log("Delete Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  //----------
  // Functions
  //----------
  // Function to display card BG image
  const getImageUrl = (project) => {
    return project && project?.coverImage.url
      ? project?.coverImage.url
      : imgPlaceholder;
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
  const currentProjects = projects?.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Pagination Handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Check if there are any projects to display
  const hasItems = projects && projects.length > 0;

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper projects-wrapper">
      {projectsLoading ? (
        <Loader />
      ) : (
        <>
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
              {hasItems &&
                currentProjects.map((project, index) => (
                  <div className="col-12 sm-12 col-md-4 col-lg-4" key={index}>
                    {/* ./Project Card */}
                    <div
                      className="project-card-wrapper"
                      style={{
                        backgroundImage: `url(${getImageUrl(project)})`,
                      }}
                    >
                      <div className="card-overlay">
                        {/* Actions */}
                        {/* Only propertyManager can edit the Project */}
                        {propertyManagerInfo &&
                          project.propertyManager?._id ===
                            propertyManagerInfo?._id && (
                            <>
                              <div className="prop-manager-actions">
                                <Link
                                  to={`/projects/${propertyManagerInfo._id}/${project._id}/edit`}
                                  className="manager-action"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Link>

                                {deleteProjectLoading ? (
                                  <Loader />
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      className="manager-action"
                                      onClick={() =>
                                        handleDeleteProject(project._id)
                                      }
                                    >
                                      <i className="fa-solid fa-trash-can action-icon"></i>
                                    </button>
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        {/* ./Actions */}
                        <div className="card-title">
                          <h2>{project.name}</h2>
                        </div>
                        <div className="card-category">
                          {/* TODO: Maybe use the ServiceCategory Icon */}
                          <h3>{project.serviceCategory.name}</h3>
                        </div>

                        <div className="card-content-date">
                          <div className="icon-wrapper">
                            <i className="fa-solid fa-calendar-days icon"></i>
                          </div>
                          <p className="date-start">
                            {torontoDate(project.startDateTime)}
                          </p>
                          <p className="dash">-</p>
                          <p className="date-end">
                            {torontoDate(project.endDateTime)}
                          </p>
                        </div>
                        <div className="card-content-date">
                          <div className="icon-wrapper">
                            <i className="fa-solid fa-clock icon"></i>
                          </div>
                          <p className="date-start">
                            {torontoTime(project.startDateTime)}
                          </p>
                          <p className="dash">-</p>
                          <p className="date-end">
                            {torontoTime(project.endDateTime)}
                          </p>
                        </div>
                        <div className="card-actions">
                          <Link
                            to={`/projects/${propertyManagerInfo?._id}/${project._id}`}
                            className="btn-app btn-app-sm btn-app-white-outline"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* ./Project Card */}
                  </div>
                ))}
            </div>
          </div>
          {/* ./Projects */}

          {/* Pagination */}
          <div className="row">
            <div className="col-12">
              <div className="app-pagination-wrapper">
                {hasItems && (
                  <ReactPaginate
                    pageCount={Math.ceil(projects.length / itemsPerPage)}
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
    </section>
  );
}

export default Projects;
