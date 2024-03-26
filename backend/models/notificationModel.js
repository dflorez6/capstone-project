//====================
// Model: Notification
//====================
// Import Dependencies
import mongoose, { Schema } from "mongoose";

//--------------------
// Schema Definition
//--------------------
const notificationSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    senderType: {
      type: String,
      enum: ["Vendor", "PropertyManager"],
      required: true,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    recipientType: {
      type: String,
      enum: ["Vendor", "PropertyManager"],
      required: true,
    },
    notificationType: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Schema.Types.Mixed,
    },
    // Dynamic data based on notification type (for example will contain recordId: projectId,
    // workOrderId, etc. or model: Vendor, Project, etc.)
  },
  { timestamps: true }
);

//--------------------
// Indexes
//--------------------
// TODO: Decide if indexes are needed
// Create an index on the field in ascending order
// notificationSchema.index({ _id: 1, propertyManager: 1, serviceCategory: 1 });

//--------------------
// Model Definition
//--------------------
const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;

//====================
// Guide / Notes
//====================
/*
With this schema, you can perform queries based on the user type to retrieve notifications for a specific user. 
For example:

javascript

// Retrieve unread notifications for a Vendor
const vendorId = 'your_vendor_id_here';
const unreadNotifications = await Notification.find({
  recipientId: vendorId,
  recipientType: 'Vendor',
  read: false,
});

// Retrieve notifications sent by a Property Manager
const propertyManagerId = 'your_property_manager_id_here';
const sentNotifications = await Notification.find({
  senderId: propertyManagerId,
  senderType: 'PropertyManager',
});

By including the user type in the schema, you can easily differentiate between Vendors and Property Managers in your 
queries without the need to explicitly specify the model every time. This approach keeps your schema flexible and 
allows for efficient querying based on user roles. Adjust the schema and queries as needed based on your 
application's specific requirements and business logic.

*/

/*
Question 2: Extending the Notification Model

To handle additional actions and notifications in the app, you can extend the existing notification model 
in a flexible and scalable way. Here are some approaches and examples:

1. Notification Types and Switch Cases:
Define an enum or constants for notification types. Use a switch case or if-else logic to handle different 
notification scenarios based on the type.

javascript

export const NotificationTypes = {
  PROJECT_APPLICATION: 'project_application',
  WORK_ORDER_CREATED: 'work_order_created',
  WORK_ORDER_ACCEPTED: 'work_order_accepted',
  RESCHEDULE_PROPOSED: 'reschedule_proposed',
  // Add more notification types as needed
};

// Example switch case for handling different notification types
switch (notification.type) {
  case NotificationTypes.PROJECT_APPLICATION:
    // Handle project application notification logic
    break;
  case NotificationTypes.WORK_ORDER_CREATED:
    // Handle work order created notification logic
    break;
  // Add cases for other notification types
}

2. Dynamic Data Fields:
Include dynamic data fields in the notification schema that can accommodate various scenarios. 
For example, use a data field as a JSON object to store additional information specific to each notification type.

javascript

const notificationSchema = new Schema({
  // Other fields...
  type: { type: String, required: true },
  data: { type: Schema.Types.Mixed }, // Dynamic data based on notification type
});

// Example data field usage
const notificationData = {
  projectId: '12345',
  workOrderId: '67890',
  // Other dynamic data based on notification type
};

3. Custom Methods or Static Functions:
Create custom methods or static functions in the notification model to handle specific notification logic or actions. 
This can help encapsulate complex notification handling logic within the model itself.

javascript

    notificationSchema.statics.handleNotification = async function (notificationData) {
      // Custom logic to handle notifications based on data
      // Example: Send notification emails, update database, etc.
    };

    // Example usage
    await Notification.handleNotification(notificationData);

By adopting these approaches, you can effectively model and extend the notification system to handle various actions 
and notifications within your MERN application. Customize the data fields, logic, and methods according to your 
application's specific requirements and use cases.
*/

//====================
// Implementation
//====================
/*
IMPLEMENT NOTIFICATIONS
To implement the functionality where the Property Manager is notified when a Vendor applies to their project 
in a MERN (MongoDB, Express.js, React.js, Node.js) application, you can follow these steps:

1. Backend Implementation:
First, you need to implement a notification system on the backend to handle notifications. 
This involves creating a notification model/schema and establishing the logic for creating and sending notifications.

    * Notification Model/Schema: Create a MongoDB model/schema for notifications. It should include fields 
      like recipient (Property Manager ID), sender (Vendor ID), type (notification type, e.g., "project_application"), 
      message (notification message), read (boolean indicating if the notification has been read), createdAt, etc.

    * Create Notification Logic: Implement logic in your backend API to create and send notifications when 
      a Vendor applies to a project. This logic should create a new notification entry in the database with 
      relevant details such as recipient (Property Manager ID), sender (Vendor ID), type, message, etc.

2. Trigger Notification on Vendor's Application:
    When a Vendor applies to a project (you've already implemented this part), trigger the notification creation 
    logic on the backend. This can be done in your createProjectApplication endpoint or wherever you handle the 
    application submission.
    * After successfully creating the project application, trigger the notification creation logic to notify the 
      Property Manager about the new application.

3. Frontend Handling:
On the frontend (Property Manager's dashboard or notifications section), implement the logic to fetch and 
display notifications.

    * Fetch Notifications: Create an API endpoint on the backend to fetch notifications for the Property Manager. 
      This endpoint should return a list of unread notifications for the logged-in Property Manager.

    * Display Notifications: In your Property Manager's frontend interface, fetch and display notifications. 
      You can show a notification count or icon indicating unread notifications and provide a way to view them.

4. Real-time Notifications (Optional):
    * For real-time notifications (if desired), consider implementing a WebSocket or Socket.io connection between 
      the frontend and backend. This allows instant notification updates without manual refreshes. When a new 
      notification is created, emit an event to notify connected clients (like the Property Manager's dashboard) 
      about the new notification.

Here's a simplified example of how your backend and frontend code might look for notifications:

Backend (Node.js/Express.js):

javascript

// Notification Model
const Notification = require('../models/Notification');

// Create Notification
const createNotification = async (recipientId, senderId, type, message) => {
  try {
    const notification = await Notification.create({
      recipient: recipientId,
      sender: senderId,
      type: type,
      message: message,
      read: false,
      createdAt: new Date(),
    });
    return notification;
  } catch (error) {
    throw new Error('Error creating notification');
  }
};

// API Endpoint to Handle Project Application
app.post('/api/v1/project-applications', async (req, res) => {
  // Process application logic

  try {
    // Create project application (existing logic)
    
    // Trigger notification to Property Manager
    const notification = await createNotification(propertyManagerId, vendorId, 'project_application', 
    'New project application received');
    
    res.status(201).json({ message: 'Project application submitted', notification });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

Frontend (React.js):

javascript

// Fetch Notifications
const fetchNotifications = async () => {
  try {
    const response = await fetch('/api/v1/notifications');
    const data = await response.json();
    return data.notifications; // Assuming the API returns notifications array
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

// Component to Display Notifications
const NotificationsComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      const fetchedNotifications = await fetchNotifications();
      setNotifications(fetchedNotifications);
    };
    getNotifications();
  }, []); // Fetch notifications on component mount

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            <strong>{notification.sender}</strong>: {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

These code snippets provide a basic structure for implementing notifications in your MERN application. 
Modify and expand them based on your specific requirements and existing codebase. Additionally, consider 
adding authentication and authorization checks to ensure that notifications are sent and received securely 
between authenticated users.
*/
