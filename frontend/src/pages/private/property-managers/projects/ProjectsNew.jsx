// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
// State
import { useDispatch, useSelector } from "react-redux";
// TODO: Add Slices
// Components
import Loader from "../../../../components/Loader";
// Styles
import "./Projects.scss";
// Assets
import imgPlaceholder from "../../../../assets/img/placeholder-landscape.png";

// Component
function ProjectsNew() {
  //----------
  // State
  //----------

  // Form Fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPhone, setManagerPhone] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");

  // Image file
  // TODO: coverImage

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
  /*
  if (vendorStoresError) {
    console.log("Vendor Stores Error: ", vendorStoresError);
  }
  */

  //----------
  // Handlers
  //----------
  // Form Submit
  const submitHandler = async (e) => {
    e.preventDefault();

    // TODO: Pass Prop Manager _id from req.propertyManager._id
    /* propertyManager: objectId */
  };

  //----------
  // Pagination
  //----------
  /*
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
*/

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
                          serviceCategory select
                        </label>
                        <input
                          type="text"
                          name="serviceCategory"
                          id="serviceCategory"
                          className="form-control"
                          placeholder="serviceCategory"
                          value={serviceCategory}
                          onChange={(e) => setServiceCategory(e.target.value)}
                        />
                      </div>
                      {/* Input: Field */}

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
                          placeholder="coverImage"
                        />
                      </div>
                      {/* Input: Field */}

                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
                        <label htmlFor="startDateTime">startDateTime</label>
                        <input
                          type="text"
                          name="startDateTime"
                          id="startDateTime"
                          className="form-control"
                          placeholder="startDateTime"
                          value={startDateTime}
                          onChange={(e) => setStartDateTime(e.target.value)}
                        />
                      </div>
                      {/* Input: Field */}

                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
                        <label htmlFor="endDateTime">endDateTime</label>
                        <input
                          type="text"
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
                          placeholder="description"
                          rows="7"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      {/* Input: Field */}
                    </div>
                  </div>
                  {/* ./Right Col */}
                </div>

                {/* TODO: ADD isLoading from the Slice */}
                {/* Submit */}
                <div className="row">
                  <div className="col-12">
                    <div className="submit-wrapper">
                      <button type="submit" className="btn-app btn-app-purple">
                        Create Project
                      </button>
                    </div>
                  </div>
                </div>
                {/* ./Submit */}
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
