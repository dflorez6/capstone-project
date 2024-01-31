// Component
function FormContainer({ children }) {
  return (
    <div className="container-fluid app-container">
      <div className="row justify-content-md-center mt-5">
        <div className="col-12 col-md-6 card p-4">{children}</div>
      </div>
    </div>
  );
}

export default FormContainer;
