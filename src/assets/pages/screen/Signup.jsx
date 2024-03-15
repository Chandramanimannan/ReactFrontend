import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../component/Modal";

function Signup() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_no, setmobileno] = useState("");
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [company_name, setCompanyname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        setCountry(countryNames);
      });
  }, []);

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          mobile_no: mobile_no,
          country: selectedCountry,
          company_name: company_name,
          password: password,
          confirm_password: confirm_password,
        }),
      });

      setResult(await response.json());

      if (response.ok) {
        console.log("User created successfully:", result.message);
        // Reset the data
        setname("");
        setEmail("");
        setmobileno("");
        setSelectedCountry("");
        setCompanyname("");
        setPassword("");
        setConfirmPassword("");
        setModalOpen(true);
      } else {
        console.error("Error creating user:", result.errors);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDecline = () => {
    setModalOpen(false);
  };

  const handleAccept = () => {
    return <div>{navigate("/login")}</div>;
  };

  return (
    <>
      <div className="Auth-background">
        {modalOpen && (
          <Modal
            heading={"Successful"}
            onCloseModal={handleModalClose}
            onDecline={handleDecline}
            onAccept={handleAccept}
            children={result.message}
          />
        )}
        <div className="Auth-container">
          <div className="Auth-firstcontainer">
            <h1>Centpays</h1>
            <div className="AuthBG-img"></div>
          </div>
          <div className="Auth-secondcontainer">
            <div className="Auth-form">
              <h1>Sign Up</h1>
              <div className="Auth-funtionality Signup">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Mobile No."
                  value={mobile_no}
                  onChange={(e) => setmobileno(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  list="countries"
                  required
                />

                <datalist id="countries">
                  {country.map((countryName, index) => (
                    <option key={index} value={countryName} />
                  ))}
                </datalist>
                <input
                  type="text"
                  placeholder="Company"
                  value={company_name}
                  onChange={(e) => setCompanyname(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button className="btn" onClick={handleSignup}>
                  Sign up
                </button>
              </div>
            </div>

            <div className="line"></div>
            <div className="Authtoplink">
              Already have an account?
              <Link to="/login">
                <span style={{ color: "blue" }}>&nbsp;Login here</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
