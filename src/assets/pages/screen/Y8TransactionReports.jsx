import React, { Component } from "react";
import Sidebar from "../navigation/Sidebar";
import Header from "../navigation/Header";
import Modal from "../../component/Modal";
import Table from "../../component/Table";

class TransactionReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isSidebarOpen: "",
      isMenu: true,
      modalOpen: false,
      formFields: [
        { label: "Txn ID/order ID:", name: "txnid" },
        { label: "Status:", name: "Status" },
        { label: "From:", name: "fromdate" },
        { label: "To:", name: "todate" },
      ],
      additionalFields: [],
      mody_additionalFields: [
        { label: "Merchant", name: "merchant", id: 1 },
        { label: "MID", name: "MID", id: 2 },
        { label: "Payment Gateway", name: "paymentgateway", id: 3 },
        { label: "Currency", name: "currency", id: 4, isDropdown: true },
        { label: "Country", name: "country", id: 5, isDropdown: true },
        { label: "Card Type", name: "cardtype", id: 6, isDropdown: true },
        { label: "Card Number", name: "cardnumber", id: 7, isText: true },
      ],

      displayOrder: [
        "merchant",
        "MID",
        "paymentgateway",
        "currency",
        "country",
        "cardyype",
        "cardnumber",
      ],
      formData: {},
      searcheddata: [],
      quicksearchdata: [],
      id: "",
    };
  }

  componentDidMount() {
    this.extractdataFromURL();
  }

  extractdataFromURL() {
    const currentPath = window.location.pathname;
    const afterCreatesettlement = currentPath.split("/transactionreport/")[1];
    if (!afterCreatesettlement) {
      return;
    }
    console.log("id", afterCreatesettlement);
    this.handlequicksearchdata(afterCreatesettlement);
  }

  handlequicksearchdata = async (id) => {
    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/transactionreport?id=${id}`
      );

      if (response.ok) {
        const result = await response.json();
        this.setState({ searcheddata: result }, () => {
          console.log("search result", this.state.searcheddata);
        });
        <Table data={this.state.searcheddata} />;
        console.log("result", result);
      } else {
        const errorData = await response.json();
        this.setState({
          error: errorData.error || "An error occurred.",
        });
      }
    } catch (error) {
      console.error("An error occurred ", error);
      this.setState({
        error: "An error occurred",
      });
    }
  };

  handleButtonClick = () => {
    this.setState({ modalOpen: true });
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

  handleModalFieldClick = (field) => {
    // Check if the field already exists
    if (!this.state.additionalFields.find((f) => f.id === field.id)) {
      this.setState((prevState) => ({
        additionalFields: [...prevState.additionalFields, field],
      }));
    }
  };

  handleRemoveField = (id) => {
    this.setState((prevState) => {
      const updatedFields = prevState.additionalFields.filter(
        (field) => field.id !== id
      );
      return { additionalFields: updatedFields };
    });
  };

  handleChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSearchClick = async () => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/transactionreport",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        this.setState({ searcheddata: result.records });
        this.setState({ formData: {} });
      } else {
        const errorData = await response.json();
        this.setState({
          error: errorData.error || "An error occurred.",
          searcheddata: null,
        });
      }
    } catch (error) {
      console.error("An error occurred ", error);
      this.setState({
        error: "An error occurred",
        searcheddata: null,
      });
    }
  };

  render() {
    const {
      modalOpen,
      formFields,
      additionalFields,
      mody_additionalFields,
      displayOrder,
    } = this.state;
    const sortedAdditionalFields = additionalFields.sort(
      (a, b) => displayOrder.indexOf(a.name) - displayOrder.indexOf(b.name)
    );
    const allFields = [...formFields, ...additionalFields];
    return (
      <>
        {/* 
        <Sidebar isSidebarOpen={this.handleChildData} />
        <div
          className={`mainBg background-overlay ${
            !this.state.isMenu ? "modyMainBG" : ""
          }`}
        > */}

        <Header />
        <Sidebar />
        <div id="dashboard">
          <div className="dashboard">
            <div className="Reportsrow1">
              <div className="grid-container">
                {allFields.map((field, index) => (
                  <div key={index}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <br></br>

                    <div className="Reports-Feilds">
                      {field.isDropdown ? (
                        <select id={field.name} name={field.name}>
                          {/* Options for the dropdown */}
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          {/* Add more options or fetch them from API */}
                        </select>
                      ) : (
                        <input
                          type="text"
                          id={field.name}
                          name={field.name}
                          onChange={this.handleChange}
                          value={this.state.formData[field.name] || ""}
                        />
                      )}
                      {index >= formFields.length && (
                        <div className="feildsRemoveBtn">
                          <button
                            type="button"
                            onClick={() => this.handleRemoveField(field.id)}
                          >
                            <i class="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Button to open the modal */}
                <button
                  type="button"
                  className="Ellipsebtn"
                  onClick={this.handleButtonClick}
                >
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </div>
              <button
                type="search"
                className="btn Searchbtn"
                onClick={this.handleSearchClick}
              >
                Search
              </button>
            </div>

            {modalOpen && (
              <Modal
                heading={"Add Fields"}
                onCloseModal={this.handleModalClose}
                onDecline={this.handleDecline}
                onAccept={this.handleAccept}
                children={mody_additionalFields.map((field) => (
                  <div
                    className="modalFeilds"
                    key={field.id}
                    onClick={() => this.handleModalFieldClick(field)}
                  >
                    <label htmlFor={field.name}>{field.label}</label>
                  </div>
                ))}
              ></Modal>
            )}

            <div className="reportContainer">
              <Table data={this.state.searcheddata} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default TransactionReport;
