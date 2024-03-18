// Dependencies
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// State
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../../../slices/projectsApiSlice";
import { useGetServiceCategoriesQuery } from "../../../../slices/serviceCategoryApiSlice";
// Components
import Loader from "../../../../components/Loader";
// Toast
import { toast } from "react-toastify";
// Styles
import "./Projects.scss";

// Component
function ProjectEdit() {
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

  // Parse URL to get query params
  const url = window.location.pathname;
  const urlParts = url.split("/");
  const urlPropertyManagerId = urlParts[urlParts.length - 3]; // Get /:projectId part of the URL
  const urlProjectId = urlParts[urlParts.length - 2]; // Get /:projectId part of the URL

  // Redux Store
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Vendor Info through the useSelector Hook

  console.log("urlPropertyManagerId: ", urlPropertyManagerId);
  console.log("urlProjectId: ", urlProjectId);

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const {
    data: project,
    isError: projectError,
    isLoading: projectLoading,
    refetch: projectRefetch,
  } = useGetProjectQuery({
    propertyManagerId: urlPropertyManagerId,
    projectId: urlProjectId,
  }); // {propertyManagerId, projectId}  vendorInfo.storeSlug
  const { data: serviceCategories, isError: serviceCategoriesError } =
    useGetServiceCategoriesQuery();

  // Redux Toolkit Mutations
  const [
    updateProject,
    { isError: updateProjectError, isLoading: updateProjectLoading },
  ] = useUpdateProjectMutation();

  //----------
  // Effects
  //----------
  // Refetch vendor stores
  useEffect(() => {
    // TODO: Add form fields data
  }, []);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (projectError) {
    console.log("Project Error: ", projectError);
  }
  if (updateProjectError) {
    console.log("Project Update Error: ", updateProjectError);
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
      {projectLoading ? (
        <Loader />
      ) : (
        <>          
          <p>{project.name}</p>
        </>
      )}
    </section>
  );
}

export default ProjectEdit;
