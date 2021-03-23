import { Spinner } from "react-bootstrap";

const SpinnerLoader = ({ loadPage = false }) => {
  return (
    <div className={`spinnerLoader ${loadPage && "h-screen"}`}>
      <Spinner
        className="spinnerLoader__spinner"
        animation="border"
        variant="primary"
      />
    </div>
  );
};

export default SpinnerLoader;
