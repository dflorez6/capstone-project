// Dependencies
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// State
import { useDispatch, useSelector } from "react-redux";
import { useGetVendorStoreQuery } from "../../../../slices/vendorStoreApiSlice";
import {
  useGetVendorServicesQuery,
  useUpdateVendorServiceMutation,
  useDeleteVendorServiceMutation,
} from "../../../../slices/vendorServiceApiSlice";
// Components
import Loader from "../../../../components/Loader";
// Styles
import "./VendorStore.scss";
// Assets
import imgPlaceholder from "../../../../assets/img/placeholder-landscape.png";

// Component
function VendorStore() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Redux Store
  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  // Parse URL to get storeSlug
  const url = window.location.pathname;
  const urlParts = url.split("/");
  const urlStoreSlug = urlParts[urlParts.length - 1]; // Get the last part of the URL

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const {
    data: vendorStore,
    isError: vendorStoreError,
    isLoading: vendorStoreLoading,
  } = useGetVendorStoreQuery(urlStoreSlug); // vendorInfo.storeSlug

  const {
    data: vendorServices,
    isError: vendorServicesError,
    isLoading: vendorServicesLoading,
    refetch: vendorServicesRefetch,
  } = useGetVendorServicesQuery(vendorStore?._id);

  //----------
  // Effects
  //----------
  // Update inputs from Redux Store for vendorInfo
  useEffect(
    () => {
      // add sideEffects here
    },
    [
      // dependency array
    ]
  );

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (vendorStoreError) {
    console.log("Vendor Store Error: ", vendorStoreError);
  }
  if (vendorServicesError) {
    console.log("Vendor Services Error: ", vendorServicesError);
  }

  //----------
  // Handlers
  //----------
  // Form Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // TODO: In case Im using this page also as the update page, complete the formSubmit Handler
  };

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper vendor-store-wrapper">
      {vendorStoreLoading && <Loader />}
      {vendorStore && (
        <>
          <div className="vendor-store-content">
            {/* Image & Info */}
            <div className="store-image-info-wrapper shadow">
              {/* // TODO: Reference for a background-image backgroundImage in React
                <div className="store-cover" style={{backgroundImage: `url(${vendorStore?.coverImage.url})`}}> 
              */}
              <div className="store-image-wrapper">
                {vendorStore.coverImage.url === "" ? (
                  <>
                    <img
                      src={imgPlaceholder}
                      alt={vendorStore.storeSlug}
                      className="store-cover"
                    />
                  </>
                ) : (
                  <img
                    src={vendorStore.coverImage.url}
                    alt={vendorStore.storeSlug}
                    className="store-cover"
                  />
                )}
              </div>
              {/* ./Image */}

              <div className="store-info-wrapper">
                <div className="store-title-wrapper">
                  <h1>{vendorStore.title}</h1>
                  {/* Only storeOwner can edit the Store */}
                  {vendorStore.storeOwner._id === vendorInfo._id && (
                    <>
                      <Link
                        to={`/vendors/store/${vendorStore.storeSlug}/edit`}
                        className="btn-app btn-app-sm btn-app-dark-outline"
                      >
                        edit
                      </Link>
                    </>
                  )}
                </div>
                <div className="store-rating-wrapper">
                  <div className="store-rating-reviews-wrapper">
                    {/* TODO: MAKE RATINGS DYNAMIC */}
                    <div className="rating-counter">
                      <i className="fa-solid fa-star icon"></i>
                      <i className="fa-solid fa-star icon"></i>
                      <i className="fa-solid fa-star icon"></i>
                      <i className="fa-solid fa-star icon"></i>
                      <i className="fa-regular fa-star icon"></i>
                    </div>

                    <div className="reviews-counter">
                      {/* TODO: MAKE REVIEWS COUNTER DYNAMIC */}
                      <p>5 reviews</p>
                    </div>
                  </div>

                  <div className="store-rating-actions">
                    <Link to="" className="btn-app btn-app-sm btn-app-purple ">
                      contact
                    </Link>
                  </div>
                </div>
                <hr />
                <div className="store-description">
                  <p>{vendorStore.description}</p>
                </div>
              </div>
              {/* ./Info */}
            </div>
            {/* ./Image & Info */}

            {/* Services */}
            <div className="row">
              <div className="col-12">
                <div className="panel-wrapper bg-transparent store-services-wrapper p-0">
                  <div className="panel-title-wrapper">
                    <h2>Services</h2>
                  </div>

                  <div className="panel-content-wrapper">
                    <div className="service-cards-wrapper">
                      {vendorServicesLoading && <Loader />}
                      <div className="row">
                        {vendorServices?.length > 0 ? (
                          <>
                            {vendorServices?.map((service, index) => (
                              <div
                                className="col-12 col-sm-12 col-md-4 col-lg-4"
                                key={index}
                              >
                                <div className="service-card-wrapper shadow">
                                  {/* Icon */}
                                  <div className="serivce-icon-wrapper">
                                    <img
                                      src={
                                        service.serviceCategory.categoryImage
                                          .url
                                      }
                                      className="service-image"
                                      alt={vendorStore.storeSlug}
                                    />
                                  </div>
                                  {/* ./Icon */}
                                  {/* Content */}
                                  <div className="service-content-wrapper">
                                    <h3>{service.serviceCategory.name}</h3>
                                    <p>
                                      Cost: $
                                      <span className="cost-hour">
                                        {service.costHour}
                                      </span>{" "}
                                      /hr
                                    </p>
                                    <p>
                                      Experience:{" "}
                                      <span>
                                        {service.yearsExperience} years
                                      </span>
                                    </p>
                                  </div>
                                  {/* ./Content */}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            <div className="col-12">
                              <div className="service-card-wrapper shadow">
                                {/* Icon */}
                                <div className="serivce-icon-wrapper">
                                  <img
                                    src={imgPlaceholder}
                                    className="service-image rounded-circle"
                                    alt={vendorStore.storeSlug}
                                  />
                                </div>
                                {/* ./Icon */}
                                {/* Content */}
                                <div className="service-content-wrapper">
                                  <h3>No Services Added</h3>
                                </div>
                                {/* ./Content */}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ./Services */}

            {/* Certificates */}
            <div className="panel-wrapper shadow">
              <div className="panel-title-wrapper">
                <h2>Certificates</h2>
              </div>
            </div>
            {/* ./Certificates */}

            {/* Gallery */}
            {vendorStore.storeImages.length > 0 && (
              <div className="panel-wrapper shadow p-0">
                <>
                  {/* Carousel */}
                  <div
                    id="carouselServices"
                    className="carousel app-carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      {vendorStore.storeImages.map((image, index) => (
                        <button
                          key={index}
                          type="button"
                          data-bs-target="#carouselServices"
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-label={`Slide ${index + 1}`}
                        ></button>
                      ))}
                    </div>
                    <div className="carousel-inner">
                      {vendorStore.storeImages.map((image, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${
                            index === 0 ? "active" : ""
                          }`}
                        >
                          <img
                            src={image.url}
                            className="d-block w-100"
                            alt={`Services Slide ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselServices"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselServices"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                  {/* Carousel */}
                </>
              </div>
            )}
            {/* ./Gallery */}

            <div className="panel-wrapper store-reviews-wrapper shadow">
              <p>Reviews</p>
            </div>
            {/* ./Reviews */}
          </div>
        </>
      )}
    </section>
  );
}

export default VendorStore;
