import React, { Component } from "react";
import robot from "../../media/image/robot.png";
import { Link } from "react-router-dom";

class ErrorCode extends Component {
  render() {
    return (
      <>
        <div className="errorsection">
          <div className="errorcontainer">
            <div className="errortext">
              <h1>Page Not Found</h1>
              <p>
                We can't seem to find the page you're looking for. Please check
                the URL for any typos.
              </p>
              <ul className="errormenu">
                <li>
                  <Link to="/dashboard">Go to Homepage</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
              </ul>
            </div>
            <div>
              <img className="Robot" src={robot} alt="" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ErrorCode;