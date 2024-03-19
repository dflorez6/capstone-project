// Dependencies
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// State
import { useDispatch, useSelector } from "react-redux";
import { useCreateProjectMutation } from "../../../../slices/projectsApiSlice";
import { useGetServiceCategoriesQuery } from "../../../../slices/serviceCategoryApiSlice";
// Components
import Loader from "../../../../components/Loader";
// Toast
import { toast } from "react-toastify";
// Styles
import "./Projects.scss";

// Component
function ProjectsNew() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Form Fields
  const [coverImage, setCoverImage] = useState(null); // Store the selected image file
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPhone, setManagerPhone] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");

  // Create a ref for the file input elements (image uploads)
  const inputCoverImageFileRef = useRef(null);

  // Redux Store
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Vendor Info through the useSelector Hook

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const { data: serviceCategories, isError: serviceCategoriesError } =
    useGetServiceCategoriesQuery();

  // Redux Toolkit Mutations
  const [
    createProject,
    { isError: createProjectError, isLoading: createProjectLoading },
  ] = useCreateProjectMutation();

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
  if (createProjectError) {
    console.log("Project Create Error: ", createProjectError);
  }
  if (serviceCategoriesError) {
    console.log("Service Categories Error: ", serviceCategoriesError);
  }

  //----------
  // Handlers
  //----------
  // Form Submit
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Form Data
      const formData = new FormData();

      // Append coverImage if selected
      if (coverImage) {
        formData.append("coverImage", coverImage); // Append selected image file to FormData
      }
      formData.append("name", name);
      formData.append("description", description);
      formData.append("managerEmail", managerEmail);
      formData.append("managerPhone", managerPhone);
      formData.append("startDateTime", startDateTime);
      formData.append("endDateTime", endDateTime);
      formData.append("serviceCategory", serviceCategory);
      formData.append("propertyManager", propertyManagerInfo._id);

      const res = await createProject({
        propertyManagerId: propertyManagerInfo._id,
        data: formData,
      }).unwrap(); // Pass FormData to createProject function & make API call
      toast.success("Project created successfully");
      navigate(`/projects/${propertyManagerInfo._id}/${res._id}`); // Redirect to the project details page
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

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper projects-form-wrapper">
      <div className="row">
        <div className="col-12">
          <div className="panel-wrapper mt-0">
            <div className="panel-title-wrapper">
              <h2>Create Project</h2>
            </div>

            {/* Form */}
            <div className="panel-content-wrapper">
              <form id="" className="form" onSubmit={submitHandler}>
                <div className="row">
                  {/* Left Col */}
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="row">
                      <div className="col-12 my-2">
                        <label htmlFor="managerEmail">Contact Email</label>
                        <input
                          type="text"
                          name="managerEmail"
                          id="managerEmail"
                          className="form-control"
                          placeholder="managerEmail"
                          value={managerEmail}
                          onChange={(e) => setManagerEmail(e.target.value)}
                        />
                      </div>
                      {/* Input: Field */}

                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
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
                      {/* Input: Select */}

                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      {/* Input: Field */}

                      <div className="col-12 my-2">
                        <label htmlFor="coverImage">Cover Image</label>
                        <input
                          type="file"
                          name="coverImage"
                          id="coverImage"
                          className="form-control"
                          ref={inputCoverImageFileRef} // Attach the ref to the input element
                          onChange={handleCoverImageFileChange}
                        />
                      </div>
                      {/* Input: Field */}

                      <div className="col-12 my-2">
                        <label htmlFor="startDateTime">startDateTime</label>
                        <input
                          type="datetime-local"
                          name="startDateTime"
                          id="startDateTime"
                          className="form-control"
                          placeholder="startDateTime"
                          value={startDateTime}
                          onChange={(e) => setStartDateTime(e.target.value)}
                        />
                      </div>
                      {/* Input: Field */}

                      <div className="col-12 my-2">
                        <label htmlFor="endDateTime">endDateTime</label>
                        <input
                          type="datetime-local"
                          name="endDateTime"
                          id="endDateTime"
                          className="form-control"
                          placeholder="endDateTime"
                          value={endDateTime}
                          onChange={(e) => setEndDateTime(e.target.value)}
                        />
                      </div>
                      {/* Input: Field */}
                    </div>
                  </div>
                  {/* ./Left Col */}

                  {/* Right Col */}
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="row">
                      <div className="col-12 my-2">
                        <label htmlFor="managerPhone">Contact Phone</label>
                        <input
                          type="text"
                          name="managerPhone"
                          id="managerPhone"
                          className="form-control"
                          placeholder="managerPhone"
                          value={managerPhone}
                          onChange={(e) => setManagerPhone(e.target.value)}
                        />
                      </div>
                      {/* Input: Field */}

                      <div className="col-12 my-2">
                        <label htmlFor="description">description</label>
                        <textarea
                          type="text"
                          name="description"
                          id="description"
                          className="form-control"
                          placeholder="Enter the project's description"
                          rows="10"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      {/* Input: Textarea */}
                    </div>
                  </div>
                  {/* ./Right Col */}
                </div>

                {createProjectLoading ? (
                  <Loader />
                ) : (
                  <>
                    <div className="row">
                      {/* Submit */}
                      <div className="col-12">
                        <div className="submit-wrapper">
                          <button
                            type="submit"
                            className="btn-app btn-app-purple"
                          >
                            Create Project
                          </button>
                        </div>
                      </div>
                      {/* ./Submit */}
                      {/* ./Back */}
                      <div className="row">
                        <div className="col-12 text-center mt-3">
                          <Link
                            to={`/projects/${propertyManagerInfo._id}`}
                            className="f-primary"
                          >
                            <i className="fa-solid fa-chevron-left"></i> Back
                          </Link>
                        </div>
                      </div>
                      {/* ./Back */}
                    </div>
                  </>
                )}
              </form>
            </div>
            {/* ./Form */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsNew;
