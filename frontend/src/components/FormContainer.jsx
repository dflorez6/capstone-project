// Component
function FormContainer({ children }) {
  return (
    <div className="container-fluid app-container">
      <div className="row justify-content-md-center">
        <div className="col-12 col-md-8 card p-4 mt-5">{children}</div>
      </div>
    </div>
  );
}

export default FormContainer;
