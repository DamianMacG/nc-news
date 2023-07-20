const Error = ({ errorStatus, errorMessage }) => {
    return (
      <div className="errorPage">
        <p className="error-status">{errorStatus}</p>
        <p className="error-text">{errorMessage}</p>
      </div>
    );
  };
  
  export default Error;