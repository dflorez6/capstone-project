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
import "./VendorSearch.scss";
// Assets
import imgPlaceholder from "../../../../assets/img/placeholder-landscape.png";

// Component
function VendorSearch() {
  //----------
  // State
  //----------

  //----------
  // Effects
  //----------

  //----------
  // Redux Toolkit Slice Errors
  //----------

  //----------
  // Handlers
  //----------

  //----------
  // Pagination
  //----------

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper vendor-search-wrapper">
      <div className="search-filters-wrapper">
        <div className="panel-wrapper shadow">
          <form action="" className="form">
            {/* Search */}
            <div className="row">
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  placeholder="Company Name"
                  className="form-control"
                />
              </div>
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
            </div>
            {/* ./Search */}

            {/* Filters */}
            <div className="row">
              <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                <select
                  name="serviceCategory"
                  id="serviceCategory"
                  className="form-control"
                >
                  <option selected disabled>
                    Service Category
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                <select name="city" id="city" className="form-control">
                  <option selected disabled>
                    City
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                <select name="province" id="province" className="form-control">
                  <option selected disabled>
                    Province
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
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

      <div className="search-results-wrapper">
        <div className="row">
          <div className="col-12 sm-12 col-md-4 col-lg-4">
            <div className="panel-wrapper shadow">
              <p>Vendor</p>
            </div>
          </div>

          <div className="col-12 sm-12 col-md-4 col-lg-4">
            <div className="panel-wrapper shadow">
              <p>Vendor</p>
            </div>
          </div>

          <div className="col-12 sm-12 col-md-4 col-lg-4">
            <div className="panel-wrapper shadow">
              <p>Vendor</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VendorSearch;
