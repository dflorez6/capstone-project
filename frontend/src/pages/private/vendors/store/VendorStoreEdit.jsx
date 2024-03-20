// Dependencies
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
import {
  useGetVendorStoreQuery,
  useUpdateVendorStoreMutation,
  useDeleteStoreImageMutation,
} from "../../../../slices/vendorStoreApiSlice";
import {
  useGetVendorServicesQuery,
  useCreateVendorServiceMutation,
  useUpdateVendorServiceMutation,
  useDeleteVendorServiceMutation,
} from "../../../../slices/vendorServiceApiSlice";
import {
  useGetVendorCertificatesQuery,
  useCreateVendorCertificateMutation,
  useUpdateVendorCertificateMutation,
  useDeleteVendorCertificateMutation,
} from "../../../../slices/vendorCertificateApiSlice";
import { useGetServiceCategoriesQuery } from "../../../../slices/serviceCategoryApiSlice";
import { useGetCertificateCategoriesQuery } from "../../../../slices/certificateCategoryApiSlice";
// Components
import Loader from "../../../../components/Loader";
// Toast
import { toast } from "react-toastify";
// Styles
import "./VendorStore.scss";
// Assets
import imgPlaceholder from "../../../../assets/img/placeholder-landscape.png";

// Component
function EditVendorStore() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Form Fields: Vendor Store
  const [coverImage, setCoverImage] = useState(null); // Store the selected image file
  const [storeImages, setStoreImages] = useState([]); // Store the selected image files
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Form Fields: Vendor Service
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceYearsExperience, setServiceYearsExperience] = useState(0);
  const [serviceCostHour, setServiceCostHour] = useState(0);
  const [serviceCategory, setServiceCategory] = useState("");

  // Form Fields: Vendor Certificate
  const [certificateImage, setCertificateImage] = useState(null); // Store the selected image file
  const [certificateName, setCertificateName] = useState("");
  const [certificateCategory, setCertificateCategory] = useState("");

  // Create a ref for the file input elements (image uploads)
  const inputCoverImageFileRef = useRef(null);
  const inputStoreImagesFileRef = useRef(null);
  const inputCertificateImageFileRef = useRef(null);

  // Redux Store
  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  // Parse URL to get storeSlug
  const url = window.location.pathname;
  const urlParts = url.split("/");
  const urlStoreSlug = urlParts[urlParts.length - 2]; // Get /:storeSlug part of the URL

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const {
    data: vendorStore,
    isError: vendorStoreError,
    isLoading: vendorStoreLoading,
    refetch: vendorStoreRefetch,
  } = useGetVendorStoreQuery(urlStoreSlug); // vendorInfo.storeSlug
  const { data: serviceCategories, isError: serviceCategoriesError } =
    useGetServiceCategoriesQuery();
  const { data: certificateCategories, isError: certificateCategoriesError } =
    useGetCertificateCategoriesQuery();

  // Redux Toolkit Mutations
  const [
    updateVendorStore,
    { isError: updateVendorStoreError, isLoading: updateVendorStoreLoading },
  ] = useUpdateVendorStoreMutation();
  const [
    deleteStoreImage,
    { isError: deleteStoreImageError, isLoading: deleteStoreImageLoading },
  ] = useDeleteStoreImageMutation();
  const [
    createVendorService,
    { isError: vendorServiceError, isLoading: vendorServiceLoading },
  ] = useCreateVendorServiceMutation();
  const [
    createVendorCertificate,
    { isError: vendorCertificateError, isLoading: vendorCertificateLoading },
  ] = useCreateVendorCertificateMutation();

  //----------
  // Effects
  //----------
  // Update inputs from Redux Store
  useEffect(() => {
    // Vendor Store
    setTitle(vendorStore?.title || "");
    setDescription(vendorStore?.description || "");
  }, [vendorStore, urlStoreSlug]);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (vendorStoreError) {
    console.log("Vendor Store Show Error: ", vendorStoreError);
  }
  if (updateVendorStoreError) {
    console.log("Update Vendor Store Error: ", updateVendorStoreError);
  }
  if (deleteStoreImageError) {
    console.log("Delete Vendor Store Image Error: ", deleteStoreImageError);
  }
  if (serviceCategoriesError) {
    console.log("Service Categories Error: ", serviceCategoriesError);
  }
  if (vendorServiceError) {
    console.log("Vendor Service Error: ", vendorServiceError);
  }
  if (vendorCertificateError) {
    console.log("Vendor Certificate Error: ", vendorCertificateError);
  }
  if (certificateCategoriesError) {
    console.log("Certificate Categories Error: ", certificateCategoriesError);
  }

  //----------
  // Handlers
  //----------
  // Store Info Form Submit Handler
  const storeInfoSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Form Data
      const formData = new FormData();
      
      // Append coverImage if selected
      if (coverImage) {
        formData.append("coverImage", coverImage); // Append selected image file to FormData
      }
      formData.append("title", title);
      formData.append("description", description);
      formData.append("storeOwner", vendorStore.storeOwner._id);

      const res = await updateVendorStore({
        storeSlug: urlStoreSlug,
        data: formData,
      }).unwrap(); // Pass FormData to updateVendorStore function & make API call
      toast.success("Store updated successfully");
      vendorStoreRefetch(); // Refetch data after successful mutation
    } catch (error) {
      toast.error(error?.data?.message || error?.error); // Toastify implementation
      console.log("Update Vendor Store Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  // Store Images Form Submit Handler
  const storeImagesSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Form Data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("storeOwner", vendorStore.storeOwner._id);

      // Append storeImages files if selected
      storeImages.forEach((file, index) => {
        formData.append("storeImages", file);
      });

      const res = await updateVendorStore({
        storeSlug: urlStoreSlug,
        data: formData,
      }).unwrap(); // Pass FormData to updateVendorStore function & make API call
      toast.success("Store updated successfully");
      vendorStoreRefetch(); // Refetch data after successful mutation
    } catch (error) {
      toast.error(error?.data?.message || error?.error); // Toastify implementation
      console.log("Update Vendor Store Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  // Delete Store Image Handler
  const handleDeleteImage = async (imageId) => {
    // Show confirmation dialog before deletion
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmed) return; // If not confirmed, do nothing

    try {
      // Delete the image using the deleteStoreImage mutation
      await deleteStoreImage({ storeSlug: urlStoreSlug, imageId: imageId });
      toast.success("Image deleted successfully");
      vendorStoreRefetch(); // Refetch data after successful deletion
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
      console.log("Delete Store Image Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  // Add Service
  const addServiceHandler = async (e) => {
    e.preventDefault();

    try {
      // Format costHour to always display cents
      const formattedCostHour = parseFloat(serviceCostHour).toFixed(2);

      // Form Data
      const newService = {
        name: serviceName,
        description: serviceDescription,
        yearsExperience: serviceYearsExperience,
        costHour: formattedCostHour,
        serviceCategory: serviceCategory,
        vendorStore: vendorStore._id,
      };

      const res = await createVendorService(newService).unwrap();

      if (res) {
        // Reset form fields to their default state
        setServiceName("");
        setServiceDescription("");
        setServiceYearsExperience(0);
        setServiceCostHour(0);
        setServiceCategory("");
        toast.success("Service added successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.error); // Toastify implementation
      console.log("Create Vendor Service Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  // Add Certificate
  const addCertificateHandler = async (e) => {
    e.preventDefault();

    try {
      // Form Data
      const formData = new FormData();

      // Append coverImage if selected
      if (certificateImage) {
        formData.append("certificateImage", certificateImage); // Append selected image file to FormData
      }
      formData.append("name", certificateName);
      formData.append("certificateCategory", certificateCategory);
      formData.append("vendorStore", vendorStore._id);

      const res = await createVendorCertificate(formData).unwrap();

      if (res) {
        // Reset form fields to their default state
        setCertificateCategory("");
        setCertificateName("");
        setCertificateImage(null);
        toast.success("Certificate added successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.error); // Toastify implementation
      console.log("Create Vendor Service Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  // File Change: Images
  const handleCoverImageFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file); // Update the state with the selected file
  };
  const handleStoreImagesFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setStoreImages(files); // Update the state with the selected files
  };
  const handleCertificateImageFileChange = (e) => {
    const file = e.target.files[0];
    setCertificateImage(file); // Update the state with the selected file
  };

  //----------
  // Pagination
  //----------
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 6; // Change this number as needed

  // Calculate indexes of images to display on the current page
  const indexOfLastImage = (currentPage + 1) * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = vendorStore?.storeImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );

  // Pagination Handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper vendor-store-wrapper">
      {vendorStoreLoading && <Loader />}
      {vendorStore && (
        <>
          <div className="row">
            {/* Store Info */}
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 d-flex align-items-stretch">
              <div className="panel-wrapper m-0">
                <div className="panel-title-wrapper">
                  <h2>Store Info</h2>
                </div>

                <div className="panel-content-wrapper">
                  <form
                    className="form"
                    id=""
                    onSubmit={storeInfoSubmitHandler}
                  >
                    <div className="row">
                      <div className="col-12 my-2">
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                            <label htmlFor="">Current Cover</label>
                            {vendorStore.coverImage.url === "" ? (
                              <>
                                <img
                                  src={imgPlaceholder}
                                  alt={vendorStore.storeSlug}
                                  className="img-fluid"
                                />
                              </>
                            ) : (
                              <img
                                src={vendorStore.coverImage.url}
                                alt={vendorStore.storeSlug}
                                className="img-fluid"
                              />
                            )}
                          </div>
                          <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                            <label htmlFor="coverImage">
                              Update Cover Image
                            </label>
                            <input
                              type="file"
                              name="coverImage"
                              id="coverImage"
                              className="form-control"
                              ref={inputCoverImageFileRef} // Attach the ref to the input element
                              onChange={handleCoverImageFileChange} // Call handleCoverImageFileChange on file selection
                            />
                          </div>
                        </div>
                      </div>
                      {/* ./Input: Image Upload */}

                      <div className="col-12 my-2">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="form-control"
                          placeholder="e.g. Acme Corp"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      {/* ./Input: Text */}

                      <div className="col-12 my-2">
                        <label htmlFor="description">Description</label>
                        <textarea
                          type="text"
                          name="description"
                          id="description"
                          className="form-control"
                          placeholder="Enter description (max XXX characters)"
                          rows="7"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      {/* ./Input: Textarea */}
                    </div>

                    {updateVendorStoreLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {/* Submit */}
                        <div className="row">
                          <div className="col-12">
                            <div className="submit-wrapper">
                              <button
                                type="submit"
                                className="btn-app btn-app-purple"
                              >
                                Update Store
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* ./Submit */}
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
            {/* ./Store Info */}

            {/* Store Images */}
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 d-flex align-items-stretch">
              <div className="panel-wrapper m-0">
                <div className="panel-title-wrapper">
                  <h2>Store Images</h2>
                </div>

                <div className="panel-content-wrapper">
                  <form
                    className="form"
                    id=""
                    onSubmit={storeImagesSubmitHandler}
                  >
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                        <label htmlFor="storeImages">Add Images</label>
                        <input
                          type="file"
                          name="storeImages"
                          id="storeImages"
                          className="form-control"
                          multiple
                          ref={inputStoreImagesFileRef} // Attach the ref to the input element
                          onChange={handleStoreImagesFileChange} // Call handleStoreImagesFileChange on file selection
                        />
                      </div>

                      {/* Submit */}
                      <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        <div className="submit-wrapper horizontal-form-submit">
                          <button
                            type="submit"
                            className="btn-app btn-app-xs btn-app-purple w-100"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      {/* ./Submit */}
                    </div>
                  </form>

                  <hr />

                  {currentImages.length > 0 && (
                    <>
                      <div className="row">
                        <div className="col-12 text-center">
                          {/* Pagination  */}
                          <div className="app-pagination-wrapper">
                            <ReactPaginate
                              pageCount={Math.ceil(
                                vendorStore.storeImages.length / imagesPerPage
                              )}
                              breakLabel="..."
                              nextLabel=">>"
                              previousLabel="<<"
                              pageRangeDisplayed={5}
                              marginPagesDisplayed={2}
                              renderOnZeroPageCount={null}
                              onPageChange={handlePageChange}
                              containerClassName={"pagination"}
                              activeClassName={"active"}
                            />
                          </div>
                          {/* ./Pagination */}
                        </div>
                      </div>

                      {/* Images Grid */}
                      <div className="row">
                        {currentImages.map((image, index) => (
                          <>
                            <div
                              className="col-12 col-sm-12 col-md-4 col-lg-4 mb-4"
                              key={index}
                            >
                              <img
                                src={image.url}
                                alt={vendorStore.storeSlug}
                                className="img-fluid"
                              />
                              <div className="text-end mt-2">
                                {deleteStoreImageLoading ? (
                                  <Loader />
                                ) : (
                                  // Show delete button if not loading
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteImage(image._id)}
                                  >
                                    <i className="fa-regular fa-trash-can"></i>
                                  </button>
                                )}
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                      {/* ./Images Grid */}
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* ./Store Images */}
          </div>

          <div className="row">
            {/* Store Services */}
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 d-flex align-items-stretch">
              <div className="panel-wrapper flex-fill mt-4">
                <div className="panel-title-wrapper">
                  <h2>Services</h2>
                </div>

                <div className="panel-content-wrapper">
                  <form className="form" id="" onSubmit={addServiceHandler}>
                    <div className="row">
                      <div className="col-12 my-2">
                        <label htmlFor="serviceCategory">
                          Service Category
                        </label>
                        <select
                          name="serviceCategory"
                          id="serviceCategory"
                          className="form-control"
                          value={serviceCategory}
                          onChange={(e) => setServiceCategory(e.target.value)}
                        >
                          <option value="" disabled>
                            Select...
                          </option>
                          {serviceCategories &&
                            serviceCategories?.map((service) => (
                              <option key={service._id} value={service._id}>
                                {service.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      {/* TODO: Uncomment if a service name is required */}
                      {/*
                      <div className="col-12 my-2">
                        <label htmlFor="serviceName">Service Name</label>
                        <input
                          type="text"
                          name="serviceName"
                          id="serviceName"
                          className="form-control"
                          placeholder=""
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                        />
                      </div>
                      */}

                      <div className="col-12 my-2">
                        <label htmlFor="serviceDescription">Desctiption</label>
                        <textarea
                          name="serviceDescription"
                          id="serviceDescription"
                          className="form-control"
                          placeholder="Service description (Max 140 characters)"
                          rows="3"
                          value={serviceDescription}
                          onChange={(e) =>
                            setServiceDescription(e.target.value)
                          }
                        />
                      </div>

                      <div className="col-12 col-sm-6 col-md-6 col-lg-6 my-2">
                        <label htmlFor="yearsExperience">
                          Years of Experience
                        </label>
                        <input
                          type="number"
                          name="yearsExperience"
                          id="yearsExperience"
                          className="form-control"
                          placeholder=""
                          min="0"
                          step="0.1"
                          value={serviceYearsExperience}
                          onChange={(e) =>
                            setServiceYearsExperience(e.target.value)
                          }
                        />
                      </div>

                      <div className="col-12 col-sm-6 col-md-6 col-lg-6 my-2">
                        <label htmlFor="costHour">Cost per hour</label>
                        <input
                          type="number"
                          name="yearsExperience"
                          id="yearsExperience"
                          className="form-control"
                          placeholder=""
                          min="0"
                          step="0.01"
                          value={serviceCostHour}
                          onChange={(e) => setServiceCostHour(e.target.value)}
                        />
                      </div>
                      {/* ./Input: Text */}

                      {vendorServiceLoading ? (
                        <Loader />
                      ) : (
                        <>
                          {/* Submit */}
                          <div className="row">
                            <div className="col-12">
                              <div className="submit-wrapper">
                                <button
                                  type="submit"
                                  className="btn-app btn-app-purple"
                                >
                                  Add Service
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* ./Submit */}
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* ./Store Services */}

            {/* Store Certificates */}
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 d-flex align-items-stretch">
              <div className="panel-wrapper flex-fill mt-4">
                <div className="panel-title-wrapper">
                  <h2>Certificates</h2>
                </div>

                <div className="panel-content-wrapper">
                  <form
                    action=""
                    className="form"
                    id=""
                    onSubmit={addCertificateHandler}
                  >
                    <div className="row">
                      <div className="col-12 my-2">
                        <label htmlFor="serviceCategory">
                          Certificate Category
                        </label>
                        <select
                          name="serviceCategory"
                          id="serviceCategory"
                          className="form-control"
                          value={certificateCategory}
                          onChange={(e) =>
                            setCertificateCategory(e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select...
                          </option>
                          {certificateCategories &&
                            certificateCategories?.map((certificate) => (
                              <option
                                key={certificate._id}
                                value={certificate._id}
                              >
                                {certificate.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="col-12 my-2">
                        <label htmlFor="certificateImage">
                          Certificate Image
                        </label>
                        <input
                          type="file"
                          name="certificateImage"
                          id="certificateImage"
                          className="form-control"
                          multiple
                          ref={inputCertificateImageFileRef} // Attach the ref to the input element
                          onChange={handleCertificateImageFileChange} // Call handleStoreImagesFileChange on file selection
                        />
                      </div>

                      <div className="col-12 my-2">
                        <label htmlFor="certificateName">
                          Certificate Name
                        </label>
                        <input
                          type="text"
                          name="certificateName"
                          id="certificateName"
                          className="form-control"
                          placeholder="Certificate"
                          value={certificateName}
                          onChange={(e) => setCertificateName(e.target.value)}
                        />
                      </div>

                      {vendorCertificateLoading ? (
                        <Loader />
                      ) : (
                        <>
                          {/* Submit */}
                          <div className="row">
                            <div className="col-12">
                              <div className="submit-wrapper">
                                <button
                                  type="submit"
                                  className="btn-app btn-app-purple"
                                >
                                  Add Certificate
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* ./Submit */}
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* ./Store Certificates */}
          </div>
        </>
      )}
    </section>
  );
}

export default EditVendorStore;
