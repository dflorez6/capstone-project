// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectsQuery } from "../../../../slices/projectsApiSlice";
import { useGetCitiesQuery } from "../../../../slices/cityApiSlice";
import { useGetProvincesQuery } from "../../../../slices/provinceApiSlice";
import { useGetServiceCategoriesQuery } from "../../../../slices/serviceCategoryApiSlice";
// Components
import Loader from "../../../../components/Loader";
// Styles
import "./ProjectSearch.scss";
// Assets
import imgPlaceholder from "../../../../assets/img/placeholder-landscape.png";

// Component
function ProjectSearch() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Form Fields: Search
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const {
    data: projects,
    isError: projectsError,
    isLoading: projectsLoading,
    refetch: projectsRefetch,
  } = useGetProjectsQuery({ companyName, serviceCategory, city, province });

  // Redux Toolkit Queries for Selects
  const { data: cities, isError: citiesError } = useGetCitiesQuery();
  const { data: provinces, isError: provincesError } = useGetProvincesQuery();
  const { data: serviceCategories, isError: serviceCategoriesError } =
    useGetServiceCategoriesQuery();

  //----------
  // Effects
  //----------
  // Refetch vendor stores
  useEffect(() => {
    projectsRefetch();
  }, [projectsRefetch, companyName, serviceCategory, city, province]);

  console.log("serviceCategory: ", serviceCategory);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (projectsError) {
    console.log("Projects Error: ", projectsError);
  }
  if (citiesError) {
    console.log("Cities Error: ", citiesError);
  }
  if (provincesError) {
    console.log("Provinces Error: ", provincesError);
  }
  if (serviceCategoriesError) {
    console.log("Service Category Error: ", serviceCategoriesError);
  }

  //----------
  // Handlers
  //----------
  // Form Submit Handler
  const searchFormSubmitHandler = async (e) => {
    e.preventDefault();

    projectsRefetch();
  };

  // Clear Filters
  const clearFiltersHandler = async (e) => {
    setCompanyName("");
    setServiceCategory("");
    setCity("");
    setProvince("");
  };

  //----------
  // Pagination
  //----------
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // TODO: Set for 3 at the moment to be able to show pagination

  // Calculate indexes of items to display on the current page
  const indexOfLastStore = (currentPage + 1) * itemsPerPage;
  const indexOfFirstStore = indexOfLastStore - itemsPerPage;
  const currentProjects = projects?.slice(indexOfFirstStore, indexOfLastStore);

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
    <section className="private-page-wrapper project-search-wrapper">
      {projectsLoading ? (
        <Loader />
      ) : (
        <>
          {/* Search Box */}
          <div className="search-filters-wrapper">
            <div className="panel-wrapper shadow">
              <form className="form" id="">
                {/* Search */}
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      className="form-control"
                      placeholder="Enter Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
                {/* ./Search */}

                {/* Filters */}
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                    <select
                      name="serviceCategory"
                      id="serviceCategory"
                      className="form-control"
                      value={serviceCategory}
                      onChange={(e) => setServiceCategory(e.target.value)}
                    >
                      <option value="">Service Categories</option>
                      {serviceCategories &&
                        serviceCategories?.map((service) => (
                          <option key={service._id} value={service._id}>
                            {service.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                    <select
                      name="city"
                      id="city"
                      className="form-control"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">Cities</option>
                      {cities &&
                        cities.map((city) => (
                          <option key={city._id} value={city.city}>
                            {city.city}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                    <select
                      name="province"
                      id="province"
                      className="form-control"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    >
                      <option value="">Provinces</option>
                      {provinces &&
                        provinces.map((province) => (
                          <option key={province._id} value={province.province}>
                            {province.province}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                    <div className="submit-wrapper horizontal-form-submit">
                      <button
                        type="button"
                        className="btn-app btn-app-xs btn-app-dark w-100"
                        onClick={clearFiltersHandler}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                </div>
                {/* ./Filters */}
              </form>
            </div>
          </div>
          {/* ./Search Box */}

          {/* Results */}
          <div className="search-results-wrapper">
            <div className="row">
              {hasItems &&
                currentProjects.map((project, index) => (
                  <>
                    <div className="col-12 sm-12 col-md-4 col-lg-4" key={index}>
                      <div className="project-card-wrapper">
                        {/* Image */}
                        <div className="card-image-wrapper">
                          {project.coverImage.url === "" ? (
                            <>
                              <img
                                src={imgPlaceholder}
                                alt={project.name}
                                className="card-image"
                              />
                            </>
                          ) : (
                            <>
                              <img
                                src={project.coverImage.url}
                                alt={project.name}
                                className="card-image"
                              />
                            </>
                          )}
                        </div>
                        {/* ./Image */}
                        {/* Content */}
                        <div className="card-content-wrapper">
                          <div className="project-name">
                            <h2>{project.name}</h2>
                          </div>
                          <div className="project-category">
                            <h3>{project.serviceCategory.name}</h3>
                          </div>
                          <div className="project-company">
                            <h4>
                              <i className="fa-solid fa-building icon-company"></i>
                              {project.propertyManager.companyName}
                            </h4>
                          </div>
                          <div className="project-location">
                            <p>
                              {project.propertyManager.address ? (
                                <>
                                  <i className="fa-solid fa-location-dot icon-location"></i>
                                  {project.propertyManager.address.city}
                                  {", "}
                                  {project.propertyManager.address.province}
                                </>
                              ) : (
                                <>
                                  <i className="fa-solid fa-location-dot icon-location"></i>
                                  Not set
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                        {/* ./Content */}
                        {/* Actions */}
                        <div className="card-actions-wrapper">
                          <Link
                            to={`/projects/${project.propertyManager._id}/${project._id}`}
                            className="btn-app btn-app-xs btn-app-purple-outline"
                          >
                            View
                          </Link>
                        </div>
                        {/* ./Actions */}
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
          {/* ./Results */}

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

export default ProjectSearch;
