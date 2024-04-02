//====================
// Constants: Notification Types
//====================
export const NotificationTypes = {
  PROJECT_APPLICATION_CREATED: "project_application_created",
  PROJECT_APPLICATION_ACCEPTED: "project_application_accepted",
  PROJECT_APPLICATION_REJECTED: "project_application_rejected",
  WORK_ORDER_CREATED: "work_order_created",
  WORK_ORDER_ACCEPTED_VENDOR: "work_order_accepted_by_vendor",
  WORK_ORDER_ACCEPTED_PROP_MANAGER: "work_order_accepted_by_property_manager",
  WORK_ORDER_RESCHEDULE_VENDOR: "work_order_rescheduled_by_vendor",
  WORK_ORDER_RESCHEDULE_PROP_MANAGER: "work_order_rescheduled_by_property_manager",
  // TODO: Add more NotificationTypes as needed
};

/*
    // TODO:
    * This will be used in the notificationsController & in other files where I need to pass a notification type.
    * For example, inside the projectApplicationsController -> when a project application is created, 
    * I will trigger a notification to the property manager. So I will pass the notification type so that
    * the notification controller can handle the notification type and trigger the appropriate function.
*/
