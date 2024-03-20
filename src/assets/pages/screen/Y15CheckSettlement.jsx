import React, { Component } from "react";
import Header from "../navigation/Header";
import { Link } from "react-router-dom";
import Modal from "../../component/Modal";
import Sidebar from "../navigation/Sidebar";

class CheckSettlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ratesdata: [],
      showRatesModal: false,
      showMerchant: true,
      showPSP: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/clients`
      );
      const result = await response.json();
      this.setState({ data: result });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleCheckboxChange = (checkboxName) => {
    if (
      (checkboxName === "showMerchant" && !this.state.showPSP) ||
      (checkboxName === "showPSP" && !this.state.showMerchant)
    ) {
      return;
    }

    this.setState(
      (prevState) => ({
        [checkboxName]: !prevState[checkboxName],
      }),
      () => {
        // this.updateOverlayState();
      }
    );
  };

  openModal = async (company_name) => {
    this.setState({ openRatesModal: !this.state.openRatesModal });
    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/ratetables?company_name=${company_name}`
      );
      const result = await response.json();
      this.setState({ ratesdata: result });
    } catch (error) {
      console.error("Error fetching rates data:", error);
    }
  };

  handleModalClose = () => {
    this.setState({ openRatesModal: false });
  };

  handleDecline = () => {
    this.setState({ openRatesModal: false });
  };

  handleAccept = () => {
    this.setState({ openRatesModal: false });
  };

  render() {
    const { overlay, data, selectedEntity, ratesdata, showMerchant, showPSP } =
      this.state;
    return (
      <>
        <Header />
        <Sidebar />
        <div id="dashboard">
          {this.state.openRatesModal && (
            <Modal
              heading={"Rate List"}
              onCloseModal={this.handleModalClose}
              onDecline={this.handleDecline}
              onAccept={this.handleAccept}
              children={
                <div>
                  {
                    <ul>
                      <li>
                        <b>MDR: &nbsp;</b>
                        {ratesdata.MDR}%
                      </li>
                      <li>
                        <b>Txn App Rate: &nbsp;</b>
                        {ratesdata.txn_app}$
                      </li>
                      <li>
                        <b>Txn Dec Rate: &nbsp;</b>
                        {ratesdata.txn_dec}$
                      </li>
                      <li>
                        <b>Rolling Reserve: &nbsp;</b>
                        {ratesdata.RR}%
                      </li>
                      <li>
                        <b>Refund Fees: &nbsp;</b>
                        {ratesdata.refund_fee}$
                      </li>
                      <li>
                        <b>Chargeback Fees: &nbsp;</b>
                        {ratesdata.chargeback_fee}$
                      </li>
                    </ul>
                  }
                </div>
              }
            />
          )}
          <div className="dashboard">
            <h3>View Settlement</h3>
            <div className="settlementContainers">
              <div className="checkbox-container">
                <div
                  className={`heading ${showMerchant ? "active" : ""}`}
                  onClick={() => this.handleCheckboxChange("showMerchant")}
                >
                  Merchant
                </div>
                <div
                  className={`heading ${showPSP ? "active" : ""}`}
                  onClick={() => this.handleCheckboxChange("showPSP")}
                >
                  PSP
                </div>
              </div>

              <div className="settlementTableContainer">
                <div className="settlement-top-selector">
                  <select>
                    <option>Select Merchant</option>
                  </select>
                  <button className="btn">Search</button>
                </div>

                <div id="CommonTable">
                  <div className="CommonTable">
                    <table>
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Entity Name</th>
                          <th>Entity Type</th>
                          <th>Status</th>
                          <th>Last Settled Date</th>
                          <th>Rates</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={item.company_name}>
                            <td>{index}</td>
                            <td>{item.company_name}</td>
                            <td>{item.company_type}</td>
                            <td
                              className={
                                item.status === "Active" ? "active" : "deactive"
                              }
                            >
                              {item.status}
                            </td>
                            <td>{item.last_settled_date}</td>
                            <td className="MSoption">
                              <i
                                style={{ color: "#3e8cf3" }}
                                className="fa-solid fa-pen-to-square"
                                onClick={() =>
                                  this.openModal(item.company_name)
                                }
                              ></i>
                            </td>
                            <td>
                              <Link
                                to={`/createsettlement/${item.company_name}`}
                              >
                                <button
                                  className={`btn ${overlay ? "" : "dc"}`}
                                >
                                  Settle Now
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CheckSettlement;
