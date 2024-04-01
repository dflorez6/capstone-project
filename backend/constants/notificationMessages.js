//====================
// Constants: Notification Types
//====================
export const NotificationMessages = {
  PROJECT_APPLICATION_CREATED: "applied to project",
  PROJECT_APPLICATION_ACCEPTED: "accepted the application for project",
  PROJECT_APPLICATION_REJECTED: "rejected the application for project",
  WORK_ORDER_CREATED: "created a work order for project",
  WORK_ORDER_ACCEPTED: "accepted a work order for project",
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
