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
import {
  useGetVendorCertificatesQuery,
  useUpdateVendorCertificateMutation,
  useDeleteVendorCertificateMutation,
} from "../../../../slices/vendorCertificateApiSlice"; // TODO: IMPLEMENT: INDEX & DELETE actions
// Components
import Loader from "../../../../components/Loader";
// Toast
import { toast } from "react-toastify";
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
  const {
    data: vendorCertificates,
    isError: vendorCertificatesError,
    isLoading: vendorCertificatesLoading,
    refetch: vendorCertificatesRefetch,
  } = useGetVendorCertificatesQuery(vendorStore?._id);

  // Redux Toolkit Mutations
  const [
    deleteVendorService,
    {
      isError: deleteVendorServiceError,
      isLoading: deleteVendorServiceLoading,
    },
  ] = useDeleteVendorServiceMutation();
  const [
    deleteVendorCertificate,
    {
      isError: deleteVendorCertificateError,
      isLoading: deleteVendorCertificateLoading,
    },
  ] = useDeleteVendorCertificateMutation();

  //----------
  // Effects
  //----------
  // Refetch vendor services when urlStoreSlug changes
  useEffect(() => {
    vendorServicesRefetch();
    vendorCertificatesRefetch();
  }, [vendorServicesRefetch, vendorCertificatesRefetch]);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (vendorStoreError) {
    console.log("Vendor Store Error: ", vendorStoreError);
  }
  if (vendorServicesError) {
    console.log("Vendor Services Error: ", vendorServicesError);
  }
  if (deleteVendorServiceError) {
    console.log("Delete Vendor Service Error: ", deleteVendorServiceError);
  }
  if (vendorCertificatesError) {
    console.log("Vendor Certificates Error: ", vendorCertificatesError);
  }
  if (deleteVendorCertificateError) {
    console.log(
      "Delete Vendor Certificates Error: ",
      deleteVendorCertificateError
    );
  }

  //----------
  // Handlers
  //----------
  // Delete Vendor Service Handler
  const handleDeleteVendorService = async (serviceId) => {
    // Show confirmation dialog before deletion
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmed) return; // If not confirmed, do nothing

    try {
      // Delete the image using the deleteStoreImage mutation
      await deleteVendorService({
        vendorStore: vendorStore?._id,
        serviceId: serviceId,
      });
      toast.success("Service deleted successfully");
      vendorServicesRefetch(); // Refetch data after successful deletion
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
      console.log("Delete Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  // Delete Vendor Certificate Handler
  const handleDeleteVendorCertificate = async (certificateId) => {
    // Show confirmation dialog before deletion
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?"
    );
    if (!confirmed) return; // If not confirmed, do nothing

    try {
      // Delete the image using the deleteStoreImage mutation
      await deleteVendorCertificate({
        vendorStore: vendorStore?._id,
        certificateId: certificateId,
      });
      toast.success("Certificate deleted successfully");
      vendorCertificatesRefetch(); // Refetch data after successful deletion
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
      console.log("Delete Store Image Error:");
      console.log(error?.data?.message || error?.error);
    }
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
                  {vendorInfo &&
                    vendorStore.storeOwner._id === vendorInfo._id && (
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
                                  {/* Actions */}
                                  {/* Only storeOwner can edit the Store */}
                                  {vendorInfo &&
                                    vendorStore.storeOwner._id ===
                                      vendorInfo._id && (
                                      <>
                                        <div className="service-card-actions">
                                          {deleteVendorServiceLoading ? (
                                            <Loader />
                                          ) : (
                                            <>
                                              <button
                                                type="button"
                                                className="action-delete"
                                                onClick={() =>
                                                  handleDeleteVendorService(
                                                    service._id
                                                  )
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

              <div className="panel-content-wrapper">
                <div className="store-certificates-wrapper">
                  {vendorCertificatesLoading && <Loader />}
                  <div className="row">
                    {vendorCertificates?.length > 0 ? (
                      <>
                        {vendorCertificates?.map((certificate, index) => (
                          <div
                            className="col-12 col-sm-12 col-md-3 col-lg-3"
                            key={index}
                          >
                            <div className="store-certificate-wrapper">
                              {/* Image */}
                              <div className="certificate-image-wrapper">
                                {certificate.certificateImage ? (
                                  <>
                                    <img
                                      src={certificate.certificateImage.url}
                                      alt={vendorStore.storeSlug}
                                      className="img-fluid"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <img
                                      src={imgPlaceholder}
                                      alt={vendorStore.storeSlug}
                                      className="img-fluid"
                                    />
                                  </>
                                )}
                              </div>
                              {/* ./Image */}
                              {/* Info */}
                              <div className="certificate-info-wrapper">
                                <h4>{certificate.name}</h4>
                                <h5>{certificate.certificateCategory.name}</h5>
                              </div>
                              {/* ./Info */}
                              {/* Actions */}
                              {/* Only storeOwner can edit the Store */}
                              {vendorInfo &&
                                vendorStore.storeOwner._id ===
                                  vendorInfo._id && (
                                  <>
                                    <div className="certificate-actions-wrapper">
                                      {deleteVendorCertificateLoading ? (
                                        <Loader />
                                      ) : (
                                        <>
                                          <button
                                            type="button"
                                            className="action-delete"
                                            onClick={() =>
                                              handleDeleteVendorCertificate(
                                                certificate._id
                                              )
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
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="col-12 text-center">
                          <div className="store-certificate-wrapper">
                            <h5>NO CERTIFICATES ADDED</h5>
                          </div>
                        </div>
                      </>
                    )}
                    {/* */}
                  </div>
                </div>
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
