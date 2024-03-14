import React, { Component, createRef } from "react";
// import Sidebar from "../Navigation/Sidebar";
import Header from "../navigation/Header";
import Modal from "../../component/Modal";
import PDFGenerator from "../../component/PDFGenerator";

class CreateSettlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenu: true,
      MDR: 8,
      TxnApp: 0.5,
      RR: 10,
      SFee: 2,
      TV: 1000,
      TotalTxn: 10,
      data: [],
      Settlementdata: [],
      company_name: this.extractENameFromURL(),
      openPlusModal: false,
      openPDFModal: false,
      fromDate: "",
      toDate: "",
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
    const { fromDate, toDate } = this.state;
    this.handleCalculateButton(fromDate, toDate, this.state.company_name);
    this.setState({ openPlusModal: false });
  };

  handlePlusDecline = () => {
    this.setState({ openPlusModal: false });
  };

  handleCalculateButton = async (fromDate, toDate, company_name) => {
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
      console.log(result);
    } catch (error) {
      console.error("Error fetching settlement details:", error);
    }
  };

  handleViewMoreClick = () => {
    this.setState({ openPDFModal: true });
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

  render() {
    return (
      <>
        <Header />
        <div id="dashboard">
          {this.state.openPlusModal && (
            <Modal
              heading={"Create Settlement"}
              onCloseModal={this.handlePlusModalClose}
              onDecline={this.handlePlusDecline}
              onAccept={this.handlePlusAccept}
              children={
                <>
                  <div class="form__group field">
                    <input
                      type="input"
                      class="form__field transparent-input"
                      placeholder="From"
                      required=""
                      value={this.state.fromDate}
                      onChange={(e) =>
                        this.setState({ fromDate: e.target.value })
                      }
                      onKeyDown={(e) => this.handleKeyDown(e, this.toInputRef)}
                    />
                    <label for="name" class="form__label">
                      From
                    </label>
                  </div>
                  <br />
                  <br />

                  <div class="form__group field">
                    <input
                      ref={this.toInputRef}
                      type="input"
                      class="form__field transparent-input"
                      placeholder="To"
                      required=""
                      value={this.state.toDate}
                      onChange={(e) =>
                        this.setState({ toDate: e.target.value })
                      }
                      onKeyDown={(e) => this.handleKeyDown(e, this.btnRef)}
                    />
                    <label for="name" class="form__label">
                      To
                    </label>
                  </div>
                  <br />
                  <br />
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
                    <PDFGenerator />
                  </span>
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
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.Settlementdata.map((item, index) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{item.date_settled}</td>
                            <td>{item.total_volume}</td>
                            <td
                              className={
                                item.settlement_volume < 0
                                  ? "deactive"
                                  : "active"
                              }
                            >
                              {item.settlement_volume}
                            </td>
                            <td>{item.status}</td>
                            <td className="dlkchgdkl">
                              {/* {item.view} */}
                              <button
                                onClick={this.handleViewMoreClick}
                                className="btn"
                              >
                                View More
                              </button>
                            </td>

                            {/* {this.state.modalOpen && (
                            <Modal onClose={this.handleModalClose}>
                              <span
                                className="close-button"
                                onClick={this.handleModalClose}
                              >
                                &times;
                              </span>

                              <div>
                                <PDFGenerator></PDFGenerator>
                              </div>

                              <button
                                ref={this.btnRef}
                                class="Modelbtn"
                                onClick={this.handleClickButton}
                              >
                                {" "}
                                Ok
                              </button>
                              <br />
                              <br />
                            </Modal>
                          )} */}
                            <td className="MSoption">
                              <i
                                style={{ color: "#3e8cf3" }}
                                className="fa-solid fa-pen-to-square"
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
