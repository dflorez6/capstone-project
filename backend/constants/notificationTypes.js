//====================
// Constants: Notification Types
//====================
export const NotificationTypes = {
  PROJECT_APPLICATION_CREATED: "project_application_created",
  PROJECT_APPLICATION_ACCEPTED: "project_application_accepted",
  PROJECT_APPLICATION_REJECTED: "project_application_rejected",
  WORK_ORDER_CREATED: "work_order_created",
  WORK_ORDER_ACCEPTED: "work_order_accepted",
  // TODO: Add more NotificationTypes as needed
  /*
  RESCHEDULE_PROPOSED: "reschedule_proposed",
  */
};

/*
    // TODO:
    * This will be used in the notificationsController & in other files where I need to pass a notification type.
    * For example, inside the projectApplicationsController -> when a project application is created, 
    * I will trigger a notification to the property manager. So I will pass the notification type so that
    * the notification controller can handle the notification type and trigger the appropriate function.
*/
