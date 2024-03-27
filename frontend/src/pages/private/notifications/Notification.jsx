// Dependencies
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// State
import { useDispatch, useSelector } from "react-redux";
import {
  useGetPropertyManagerNotificationsQuery,
  useGetVendorNotificationsQuery,
  useMarkReadPropertyManagerNotificationMutation,
  useMarkReadVendorNotificationMutation,
  useDeletePropertyManagerNotificationMutation,
  useDeleteVendorNotificationMutation,
} from "../../../slices/notificationApiSlice";
// Time
import { torontoDateTime } from "../../../utils/formatDates";
// Components
import Loader from "../../../components/Loader";
// Toast
import { toast } from "react-toastify";
// Styles
import "./Notification.scss";
// Assets
import imgPlaceholder from "../../../assets/img/placeholder-landscape.png";
import avatarPlaceholder from "../../../assets/img/placeholder-square.jpg";

// Component
function Notification() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Redux Store
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Vendor Info through the useSelector Hook
  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const {
    data: propertyManagerNotifications,
    isError: propertyManagerNotificationsError,
    isLoading: propertyManagerNotificationsLoading,
    refetch: propertyManagerNotificationsRefetch,
  } = useGetPropertyManagerNotificationsQuery({
    propertyManagerId: propertyManagerInfo?._id,
  });

  const {
    data: vendorNotifications,
    isError: vendorNotificationsError,
    isLoading: vendorNotificationsLoading,
    refetch: vendorNotificationsRefetch,
  } = useGetVendorNotificationsQuery({
    vendorId: vendorInfo?._id,
  });

  // Redux Toolkit Mutations
  const [
    markReadPropertyManagerNotification,
    { isError: markReadPropertyManagerNotificationError },
  ] = useMarkReadPropertyManagerNotificationMutation();
  const [
    deletePropertyManagerNotification,
    {
      isError: deletePropertyManagerNotificationError,
      isLoading: deletePropertyManagerNotificationLoading,
    },
  ] = useDeletePropertyManagerNotificationMutation();

  //----------
  // Effects
  //----------
  // Refetch notifications depending on user type logged in
  useEffect(() => {
    if (propertyManagerInfo) {
      propertyManagerNotificationsRefetch();
    }
    if (vendorInfo) {
      vendorNotificationsRefetch();
    }
  }, [
    propertyManagerInfo,
    propertyManagerNotificationsRefetch,
    vendorInfo,
    vendorNotificationsRefetch,
  ]);

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (propertyManagerNotificationsError) {
    console.log(
      "Property Manager Notifications Error: ",
      propertyManagerNotificationsError
    );
  }
  if (vendorNotificationsError) {
    console.log("Vendor Notifications Error: ", vendorNotificationsError);
  }
  if (markReadPropertyManagerNotificationError) {
    console.log(
      "Property Manager Mark Read Notification Error: ",
      markReadPropertyManagerNotificationError
    );
  }
  if (deletePropertyManagerNotificationError) {
    console.log(
      "Property Manager Delete Notification Error: ",
      deletePropertyManagerNotificationError
    );
  }

  //----------
  // Handlers
  //----------
  // View Property Manager Notification and update application.read = true
  const viewPropertyManagerNotificationHandler = async (
    notificationId,
    recipientId,
    projectId
  ) => {
    try {
      // Mark Notification as Read
      await markReadPropertyManagerNotification({
        propertyManagerId: propertyManagerInfo?._id,
        notificationId: notificationId,
      }).unwrap();

      // Navigate to Project details page
      navigate(`/projects/${recipientId}/${projectId}`);
      // Refetch Notifications
      await propertyManagerNotificationsRefetch();
    } catch (error) {
      toast.error("Error deleting notification");
      console.error("Error deleting notification:", error);
    }
  };

  // Delete Property Manager Notification
  const deletePropertyManagerNotificationHandler = async (notificationId) => {
    try {
      // Perform delete operation
      await deletePropertyManagerNotification({
        propertyManagerId: propertyManagerInfo?._id,
        notificationId: notificationId,
      }).unwrap();

      // Refetch Notifications
      await propertyManagerNotificationsRefetch();
    } catch (error) {
      toast.error("Error deleting notification");
      console.error("Error deleting notification:", error);
    }
  };

  //----------
  // Functions
  //----------
  // TODO: Implement Functions

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper notifications-wrapper">
      {propertyManagerNotifications ? (
        <>
          {/* Property Manager Notifications */}
          {propertyManagerNotificationsLoading ? (
            <Loader />
          ) : (
            <>
              <div className="row">
                <div className="col-12">
                  <div className="panel-wrapper notifications-content-wrapper">
                    <div className="panel-title-wrapper">
                      <h2>Notifications</h2>
                    </div>

                    <div className="panel-content-wrapper">
                      <table className="table app-table">
                        {/* TODO: In case we want to show the headings uncomment this block */}
                        {/* 
                        <thead>
                          <tr>
                            <th>Notification</th>
                            <th>Date</th>
                            <th colSpan={1}></th>
                          </tr>
                        </thead>
                         */}

                        <tbody>
                          {propertyManagerNotifications?.length === 0 ? (
                            <>
                              <tr className="unread">
                                <td colSpan={6} className="text-center">
                                  There are no notifications to display
                                </td>
                              </tr>
                            </>
                          ) : (
                            <>
                              {propertyManagerNotifications?.map(
                                (notification) => (
                                  <>
                                    <tr
                                      key={notification._id}
                                      className={
                                        notification.read !== true
                                          ? "unread"
                                          : ""
                                      }
                                    >
                                      <td>
                                        <span className="bold">
                                          {notification.sender.companyName}
                                        </span>{" "}
                                        <span>{notification.message}</span>{" "}
                                        <span className="bold">
                                          {notification.data.projectName}
                                        </span>
                                      </td>
                                      <td>
                                        {torontoDateTime(
                                          notification.createdAt
                                        )}
                                      </td>
                                      <td>
                                        {deletePropertyManagerNotificationLoading ? (
                                          <Loader />
                                        ) : (
                                          <>
                                            <button
                                              className="btn-app btn-app-xs btn-app-red table-icon"
                                              onClick={() =>
                                                deletePropertyManagerNotificationHandler(
                                                  notification._id
                                                )
                                              }
                                            >
                                              <i className="fa-solid fa-trash-can"></i>
                                            </button>

                                            <button
                                              type="button"
                                              className="btn-app btn-app-xs btn-app-green ms-3"
                                              onClick={() =>
                                                viewPropertyManagerNotificationHandler(
                                                  notification._id,
                                                  notification.recipient,
                                                  notification.data.projectId
                                                )
                                              }
                                            >
                                              view
                                            </button>
                                          </>
                                        )}
                                      </td>
                                    </tr>
                                  </>
                                )
                              )}
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* ./Property Manager Notifications */}
        </>
      ) : (
        <>
          {/* Vendor Notifications */}
          {vendorNotificationsLoading ? (
            <Loader />
          ) : (
            <>
              <p>Vendor Notifications</p>
            </>
          )}
          {/* ./Vendor Notifications */}
        </>
      )}
    </section>
  );
}

export default Notification;
