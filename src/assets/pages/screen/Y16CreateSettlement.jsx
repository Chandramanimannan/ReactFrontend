import React, { Component, createRef } from "react";
// import Sidebar from "../Navigation/Sidebar";
import Header from "../navigation/Header";
import Modal from "../../component/Modal";
import PDFGenerator from "../../component/PDFGenerator";
import Sidebar from "../navigation/Sidebar";

class CreateSettlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenu: true,
      data: [],
      Settlementdata: [],
      company_name: this.extractENameFromURL(),
      openPlusModal: false,
      openPDFModal: false,
      openEditStatusModal: false,
      fromDate: "",
      toDate: "",
      no_of_refund: 0,
      no_of_chargeback: 0,
      exchange_rate: 0,
      idforPDF: "",
      idforEdit: "",
      statusforEdit: "",
    };
    this.toInputRef = createRef();
    this.fromInputRef = createRef();
  }

  componentDidMount() {
    this.showSettlementRecord(this.state.company_name);
  }

  handleChildData = (dataFromChild) => {
    this.setState({ isMenu: dataFromChild });
  };

  extractENameFromURL() {
    const currentPath = window.location.pathname;
    const afterCreatesettlement = currentPath.split("/createsettlement/")[1];
    return afterCreatesettlement;
  }

  handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current.focus();
    }
  };

  openPlusModal = () => {
    this.setState({ openPlusModal: !this.state.openPlusModal });
  };

  handlePlusModalClose = () => {
    this.setState({ openPlusModal: false });
  };

  handlePlusAccept = () => {
    const { fromDate, toDate, no_of_refund, no_of_chargeback, exchange_rate } =
      this.state;
    this.handleCalculateButton(
      fromDate,
      toDate,
      this.state.company_name,
      no_of_refund,
      no_of_chargeback,
      exchange_rate
    );
    this.setState({ openPlusModal: false });
  };

  handlePlusDecline = () => {
    this.setState({ openPlusModal: false });
  };

  handleCalculateButton = async (
    fromDate,
    toDate,
    company_name,
    no_of_refund,
    no_of_chargeback,
    exchange_rate
  ) => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/settlements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fromDate,
            toDate,
            company_name,
            no_of_refund,
            no_of_chargeback,
            exchange_rate,
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        this.setState({ data: result });
        this.showSettlementRecord(company_name);
        this.handleModalClose();
      }
    } catch (error) {
      console.error("Error fetching entity details:", error);
    }
  };

  showSettlementRecord = async (company_name) => {
    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/settlements?company_name=${company_name}`
      );
      const result = await response.json();
      this.setState({ Settlementdata: result });
    } catch (error) {
      console.error("Error fetching settlement details:", error);
    }
  };

  handleViewMoreClick = (id) => {
    this.setState({ openPDFModal: true });
    this.setState({ idforPDF: id });
  };

  handlePDFModalClose = () => {
    this.setState({ openPDFModal: false });
  };

  handlePDFAccept = () => {
    this.setState({ openPDFModal: false });
  };

  handlePDFDecline = () => {
    this.setState({ openPDFModal: false });
  };

  handleEditStatus = (item) => {
    this.setState({ openEditStatusModal: true });
    this.setState({ idforEdit: item._id });
    this.setState({ statusforEdit: item.status });
  };

  handleEditStatusModalClose = () => {
    this.setState({ openEditStatusModal: false });
  };

  handleEditStatusAccept = () => {
    this.setState({ openEditStatusModal: false });
    this.editStatus();
  };

  handleEditStatusDecline = () => {
    this.setState({ openEditStatusModal: false });
  };

  editStatus = async () => {
    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/updatesettlements`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: this.state.idforEdit,
            status: this.state.statusforEdit,
          }),
        }
      );
      const result = await response.json();
    } catch (error) {
      console.error("Error fetching rates data:", error);
    }
    this.showSettlementRecord(this.state.company_name);
  };

  getStatusColor(status) {
    switch (status) {
      case "Success":
        return "#3CB371";
      case "Pending":
        return "#ffc125";
      default:
        return "#ffffff";
    }
  }

  render() {
    return (
      <>
        <Header />
        <Sidebar />
        <div id="dashboard">
          {this.state.openPlusModal && (
            <Modal
              heading={"Create Settlement"}
              onCloseModal={this.handlePlusModalClose}
              onDecline={this.handlePlusDecline}
              onAccept={this.handlePlusAccept}
              children={
                <>
                  <div className="form-container">
                    <label for="name" className="form-label">
                      From
                    </label>
                    <input
                      type="input"
                      className="form-input"
                      placeholder="From"
                      required=""
                      value={this.state.fromDate}
                      onChange={(e) =>
                        this.setState({ fromDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-container">
                    <label for="name" className="form-label">
                      To
                    </label>
                    <input
                      ref={this.toInputRef}
                      type="input"
                      className="form-input"
                      placeholder="To"
                      required=""
                      value={this.state.toDate}
                      onChange={(e) =>
                        this.setState({ toDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-container">
                    <label for="name" className="form-label">
                      Number of Refunds
                    </label>
                    <input
                      ref={this.toInputRef}
                      type="input"
                      className="form-input"
                      placeholder=""
                      value={this.state.no_of_refund}
                      onChange={(e) =>
                        this.setState({ no_of_refund: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-container">
                    <label for="name" className="form-label">
                      Number of Chargebacks
                    </label>
                    <input
                      ref={this.toInputRef}
                      type="input"
                      className="form-input"
                      placeholder=""
                      value={this.state.no_of_chargeback}
                      onChange={(e) =>
                        this.setState({ no_of_chargeback: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-container">
                    <label for="name" className="form-label">
                      EUR to USD Exc Rate
                    </label>
                    <input
                      ref={this.toInputRef}
                      type="input"
                      className="form-input"
                      placeholder=""
                      required=""
                      value={this.state.exchange_rate}
                      onChange={(e) =>
                        this.setState({ exchange_rate: e.target.value })
                      }
                    />
                  </div>
                </>
              }
            ></Modal>
          )}
          {this.state.openPDFModal && (
            <Modal
              heading={"PDF"}
              onCloseModal={this.handlePDFModalClose}
              onDecline={this.handlePDFDecline}
              onAccept={this.handlePDFAccept}
              children={
                <div>
                  <span>
                    <PDFGenerator id={this.state.idforPDF} />
                  </span>
                </div>
              }
            />
          )}

          {this.state.openEditStatusModal && (
            <Modal
              heading={"Edit Status"}
              onCloseModal={this.handleEditStatusModalClose}
              onDecline={this.handleEditStatusDecline}
              onAccept={this.handleEditStatusAccept}
              children={
                <div className="form-container">
                  <label for="status" className="form-label">
                    Status
                  </label>
                  <select
                    ref={this.toInputRef}
                    className="form-select"
                    value={this.state.statusforEdit}
                    onChange={(e) =>
                      this.setState({ statusforEdit: e.target.value })
                    }
                  >
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              }
            />
          )}
          <div className="dashboard">
            <div className="settlementContainers">
              <h1>{`${this.state.company_name}`}</h1>
              <div className="checksettletable">
                <div className="headerRight">
                  <span>
                    <i
                      className="customizeColumn"
                      class="fa-solid fa-plus"
                      onClick={() => this.openPlusModal()}
                    ></i>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </span>
                </div>
                <div id="CommonTable">
                  <div className="CommonTable">
                    <table>
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Date</th>
                          <th>Total Volume</th>
                          <th>Settled Volume</th>
                          <th>Status</th>
                          <th>View</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.Settlementdata.map((item, index) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{item.date_settled}</td>
                            <td>
                              {"$ " +
                                (item.total_sales_amount +
                                  item.total_declines_amount)}
                            </td>
                            <td
                              className={
                                item.settlement_volume < 0
                                  ? "deactive"
                                  : "active"
                              }
                            >
                              {"$ " +
                                (
                                  item.settlement_volume -
                                  item.refund_amount -
                                  item.chargeback_amount
                                ).toFixed(3)}
                            </td>
                            <td
                              style={{
                                color: this.getStatusColor(item.status),
                                fontWeight: 700,
                              }}
                            >
                              {item.status}
                            </td>
                            <td className="dlkchgdkl">
                              <button
                                onClick={() =>
                                  this.handleViewMoreClick(item._id)
                                }
                                className="btn"
                              >
                                View More
                              </button>
                            </td>

                            <td className="MSoption">
                              <i
                                style={{ color: "#3e8cf3" }}
                                className="fa-solid fa-pen-to-square"
                                onClick={() => this.handleEditStatus(item)}
                              ></i>
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

export default CreateSettlement;
