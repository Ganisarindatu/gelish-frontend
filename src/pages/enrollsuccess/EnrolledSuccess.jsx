/* eslint-disable */
import "./enrolledsucces.css";
import { Link, useParams } from "react-router-dom";

const EnrollSuccess = ({ user }) => {
  const params = useParams();
  return (
    <div className="enroll-success-page">
      {user && (
        <div className="success-message">
          <h2>Enrollment Successful</h2>
          <p>You have successfully enrolled in the course!</p>
          <p>Reference no - {params.id}</p>
          <Link to={`/${user._id}/dashboard`} className="common-btn">
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default EnrollSuccess;
