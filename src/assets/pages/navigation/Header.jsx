import React, { Component } from "react";
import Modal from "../../component/Modal";

/* ------------------------------ images import ----------------------------- */
import companyFullLogo from "../../media/image/centpays_full_logo.png";
import menuRight_ic from "../../media/icon/menu_right.png";
import menuLeft_ic from "../../media/icon/menu_left.png";
import search_ic from "../../media/icon/search.png";
import currencySelector_ic from "../../media/icon/currency_selector.png";
import timeZone_ic from "../../media/icon/time_zone.png";
import userProfile_ic from "../../media/icon/user_profile.png";
import downArrow_ic from "../../media/icon/down_arrow.png";
import logout_ic from "../../media/icon/turn_off.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuClick: false,
      showPassword: false,
      currencies: [],
      timeZones: [],
      modalOpen: false,
    };
  }

  componentDidMount() {
    // Fetch currencies from an API
    fetch("https://api.frankfurter.app/latest?from=USD")
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === "object" && data.rates) {
          const currencyCodes = Object.keys(data.rates);
          this.setState({ currencies: currencyCodes });
        } else {
          console.error("API response is not as expected:", data);
        }
      })
      .catch((error) => console.error("Error fetching currencies:", error));

    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data); // Add this line for debugging

        if (Array.isArray(data)) {
          this.setState({ timeZones: data });
        } else {
          console.error("API response is not as expected:", data);
        }
      })
      .catch((error) => console.error("Error fetching time zones:", error));
  }

  handleMenuOnClick = () => {
    this.setState((prevState) => ({
      menuClick: !prevState.menuClick,
    }));
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleDecline = () => {
    this.setState({ modalOpen: false });
  };

  handleAccept = () => {
    this.setState({ modalOpen: false });
  };

  handleButtonClick = () => {
    this.setState({ modalOpen: true });
  };

  togglePasswordVisibility = () => {
    this.setState({ showPassword: true });

    setTimeout(() => {
      this.setState({ showPassword: false });
    }, 1000);
  };

  render() {
    const { menuClick, showPassword, currencies, timeZones } = this.state;

    return (
      <>
        {this.state.modalOpen && (
          <Modal
            heading={"User Profile"}
            onCloseModal={this.handleModalClose}
            onDecline={this.handleDecline}
            onAccept={this.handleAccept}
            children={
              <>
                <div className="card-container">
                  <img className="round" src={userProfile_ic} alt="user" />
                  <h3>Username</h3>
                  <h6>Role </h6>
                  <div className="skills">
                    <ul>
                      <li>Company Name: Centpays</li>
                      <li>Rate:</li>
                      <li>Username:</li>
                      <li>
                        Password:{" "}
                        {showPassword ? (
                          <span>{"Rahudsjhd"}</span>
                        ) : (
                          <span
                            className="hidden-password"
                            onClick={this.togglePasswordVisibility}
                          >
                            ****** <i class="fa-solid fa-pen-to-square" />
                          </span>
                        )}
                      </li>

                      <li>Country:</li>
                      <li>Type:</li>
                      {/* <div>
                            <button className="btn ok">Edit</button>

                            <button
                              className="btn ok"
                              onClick={this.handleModalClose}
                            >
                              Ok
                            </button>
                          </div> */}
                    </ul>
                  </div>
                </div>
              </>
            }
          ></Modal>
        )}
        <div id="header">
          <div className="header">
            <div className="header-company_logo-container">
              <img
                src={companyFullLogo}
                alt="Company logo"
                className="companylogo"
              />
              <span>
                {menuClick ? (
                  <img
                    src={menuLeft_ic}
                    alt="menu right icon"
                    className="icon"
                    onClick={() => this.handleMenuOnClick()}
                  />
                ) : (
                  <img
                    src={menuRight_ic}
                    alt="menu right icon"
                    className="icon"
                    onClick={() => this.handleMenuOnClick()}
                  />
                )}
              </span>
            </div>
            <div className="header-featuers-container">
              <span className="header-featuers-container-seacrhIcon">
                <img
                  src={search_ic}
                  alt="main search icon"
                  className="icon header-searchIcon"
                />
              </span>
              <span className="header-featuers-container-countrySelector">
                <img
                  src={currencySelector_ic}
                  alt="currency icon"
                  className="icon noIcon"
                />
                <select className="trancy-selector">
                  {currencies.map((currency) => (
                    <option key={currency}>{currency}</option>
                  ))}
                </select>
              </span>
              <span className="header-featuers-container-countrySelector">
                <img
                  src={timeZone_ic}
                  alt="currency icon"
                  className="icon noIcon"
                />
                <select name="timeSelector" className="trancy-selector">
                  {timeZones.map((zone) => (
                    <option key={zone}>{zone}</option>
                  ))}
                </select>
              </span>
            </div>
            <div className="header-profile-container">
              <span onClick={this.handleButtonClick}>
                <img
                  src={userProfile_ic}
                  alt="currency icon"
                  className="icon profileIcon"
                />
                <img src={downArrow_ic} alt="currency icon" className="icon" />
              </span>
              <span className="header-profile-container-userDetails">
                <h2>User name</h2>
                <p>User role</p>
              </span>
              <img src={logout_ic} alt="currency icon" className="icon" />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Header;
