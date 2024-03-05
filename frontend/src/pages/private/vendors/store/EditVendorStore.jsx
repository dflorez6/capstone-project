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

  // Form Fields
  const [coverImage, setCoverImage] = useState(null); // Store the selected image file
  const [storeImages, setStoreImages] = useState([]); // Store the selected image files
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // storeImages // TODO: Implement Multiple Image Upload

  // Create a ref for the file input element
  const inputCoverImageFileRef = useRef(null);
  const inputStoreImagesFileRef = useRef(null);

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

  // Redux Toolkit Mutations
  const [
    updateVendorStore,
    { isError: updateVendorStoreError, isLoading: updateVendorStoreLoading },
  ] = useUpdateVendorStoreMutation();
  const [
    deleteStoreImage,
    { isError: deleteStoreImageError, isLoading: deleteStoreImageLoading },
  ] = useDeleteStoreImageMutation();

  //----------
  // Effects
  //----------
  // Update inputs from Redux Store
  useEffect(() => {
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

  // File Change
  const handleCoverImageFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file); // Update the state with the selected file
  };

  const handleStoreImagesFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setStoreImages(files); // Update the state with the selected files
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
            <div className="col-6 d-flex align-items-stretch">
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

                    {updateVendorStoreLoading && <Loader />}

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
                  </form>
                </div>
              </div>
            </div>
            {/* ./Store Info */}

            {/* Store Images */}
            <div className="col-6 d-flex align-items-stretch">
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
                        <label htmlFor="storeImages"></label>
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
          <p>
            VendorStore <br />
            StoreSlug: {vendorStore.storeSlug} <br />
            Title: {vendorStore.title} <br />
          </p>
        </>
      )}
    </section>
  );
}

export default EditVendorStore;
