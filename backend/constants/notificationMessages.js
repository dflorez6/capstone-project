//====================
// Constants: Notification Types
//====================
export const NotificationMessages = {
  PROJECT_APPLICATION_CREATED: "applied to project",
  PROJECT_APPLICATION_ACCEPTED: "accepted the application to project",
  PROJECT_APPLICATION_REJECTED: "rejected the application to project",
  WORK_ORDER_CREATED: "created a work order for project",
  // TODO: Add more NotificationTypes as needed
  /*
    
    WORK_ORDER_ACCEPTED: "work_order_accepted",
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
