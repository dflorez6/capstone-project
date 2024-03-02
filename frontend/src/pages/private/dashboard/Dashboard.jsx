// Import dependencies
import { Link } from "react-router-dom";
// Styles
import "./Dashboard.scss";

// Component
function Dashboard() {
  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper dashboard-wrapper">
      <p>Dashboard</p>
      <p>
        Vendor Logged In
        <br />
        TODO: Property Manager Logged In + Conditional Content --- Pending for
        implementation
      </p>
    </section>
  );
}

export default Dashboard;
