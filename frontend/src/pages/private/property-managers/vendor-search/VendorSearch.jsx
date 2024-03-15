// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
import { useGetVendorStoresQuery } from "../../../../slices/vendorStoreApiSlice";
import { useGetCitiesQuery } from "../../../../slices/cityApiSlice";
import { useGetProvincesQuery } from "../../../../slices/provinceApiSlice";
import { useGetServiceCategoriesQuery } from "../../../../slices/serviceCategoryApiSlice";
// Components
import Loader from "../../../../components/Loader";
// Styles
import "./VendorSearch.scss";
// Assets
import imgPlaceholder from "../../../../assets/img/placeholder-landscape.png";

// Component
function VendorSearch() {
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
    data: vendorStores,
    isError: vendorStoresError,
    isLoading: vendorStoresLoading,
    refetch: vendorStoresRefetch,
  } = useGetVendorStoresQuery({ companyName, serviceCategory, city, province });

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
    vendorStoresRefetch();
  }, [vendorStoresRefetch, companyName, serviceCategory, city, province]);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (vendorStoresError) {
    console.log("Vendor Stores Error: ", vendorStoresError);
  }
  if (citiesError) {
    console.log("Cities Error: ", citiesError);
  }
  if (provincesError) {
    console.log("Provinces Error: ", provincesError);
  }
  if (serviceCategoriesError) {
    console.log("Service Categories Error: ", serviceCategoriesError);
  }

  //----------
  // Handlers
  //----------
  // Form Submit Handler
  const searchFormSubmitHandler = async (e) => {
    e.preventDefault();

    vendorStoresRefetch();
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
  const currentStores = vendorStores?.slice(
    indexOfFirstStore,
    indexOfLastStore
  );

  // Pagination Handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper vendor-search-wrapper">
      {vendorStoresLoading ? (
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

                  {/*
                  <div className="col-12 col-sm-12 col-md-2 col-lg-2">
                    <div className="submit-wrapper horizontal-form-submit">
                      <button
                        type="submit"
                        className="btn-app btn-app-xs btn-app-purple w-100"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                    */}
                  <div className="col-12 col-sm-12 col-md-3 col-lg-3 offset-md-3 offset-lg-3">
                    <div className="submit-wrapper horizontal-form-submit">
                      {/* TODO: CLEAR FILTERS BUTTON IMPLEMENT HANDLER FUNCTION */}
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
                          <option key={service._id} value={service.name}>
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
                    <select name="rating" id="rating" className="form-control">
                      <option selected disabled>
                        Rating
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
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
              {currentStores.map((store, index) => (
                <div className="col-12 sm-12 col-md-4 col-lg-4" key={index}>
                  <div className="store-card-wrapper">
                    {/* Image */}
                    <div className="card-image-wrapper">
                      {store.coverImage.url === "" ? (
                        <>
                          <img
                            src={imgPlaceholder}
                            alt={store.storeSlug}
                            className="card-image"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={store.coverImage.url}
                            alt={store.storeSlug}
                            className="card-image"
                          />
                        </>
                      )}
                    </div>
                    {/* ./Image */}
                    {/* Content */}
                    <div className="card-content-wrapper">
                      <div className="store-rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                      <div className="store-name">
                        <h2>{store.storeOwner.companyName}</h2>
                      </div>
                      <div className="store-location">
                        <h3>
                          {store.storeOwner.address ? (
                            <>
                              <i className="fa-solid fa-location-dot icon-location"></i>
                              {store.storeOwner.address.city}
                              {", "}
                              {store.storeOwner.address.province}
                            </>
                          ) : (
                            <>
                              <i className="fa-solid fa-location-dot icon-location"></i>
                              Not set
                            </>
                          )}
                        </h3>
                      </div>
                    </div>
                    {/* ./Content */}
                    {/* Actions */}
                    <div className="card-actions-wrapper">
                      <Link
                        to={`/vendors/store/${store.storeSlug}`}
                        className="btn-app btn-app-xs btn-app-purple-outline"
                      >
                        View
                      </Link>
                    </div>
                    {/* ./Actions */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ./Results */}

          {/* Pagination */}
          <div className="row">
            <div className="col-12">
              <div className="app-pagination-wrapper">
                {currentStores.length > 0 ? (
                  <ReactPaginate
                    pageCount={Math.ceil(vendorStores.length / itemsPerPage)}
                    breakLabel="..."
                    nextLabel=">>"
                    previousLabel="<<"
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                ) : (
                  <>
                    <h4 className="text-center">No stores found</h4>
                  </>
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

export default VendorSearch;
