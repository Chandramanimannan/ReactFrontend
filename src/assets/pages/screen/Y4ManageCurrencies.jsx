import React, { Component } from "react";
import Header from "../navigation/Header";
import Sidebar from "../navigation/Sidebar";
import { Link } from "react-router-dom";
import Modal from "../../component/Modal";

class Y4ManageCurrencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency_name:"", 
currency_code:"",
      data: [],
      nameTotals: {},
      statusTotals: {},
      isMenu: true,
      modalOpen: false,
      Status: "",
      isEditManageModalOpen: false,
      editItemId: null,
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/currency"
      );
      const result = await response.json();
      this.setState({ data: result });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleButtonClick = () => {
    this.setState({ modalOpen: true });
  };
  handleDecline = () => {
    this.setState({ modalOpen: false });
  };
  inputCurrencyHandle = (e) => {
    this.setState({ currency_name : e.target.value });
  };

  inputCodeHandle = (e) => {
    this.setState({currency_code: e.target.value });
  };
  handlecurrencyAccept = () => {
    this.handleManageCurrency();
    this.setState({ modalOpen: false });
  };

  handleManageCurrency = async () => {
    try {
      const response = await fetch(
        " http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/currency",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          
            currency_name:this.state.currency_name,
       currency_code:this.state.currency_code,
          }),
        }
      );
      if (response.ok) {
        this.fetchData();
      } else {
        console.log("Error occurred");
      }
    } catch (error) {
      console.error("An error occurred ", error);
    }
  };

  handleManageDelete = async (id) => {
    try {
      const response = await fetch(
        ` http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/deletecurrency`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currency_name : id,
          }),
        }
      );
      if (response.ok) {
        this.fetchData();
      } else {
        console.log("Error occurred");
      }
    } catch (error) {
      console.error("An error occurred ", error);
    }
  };
  handleEditManageModalOpen = (item) => {
    const { _id,currency_name, 
      currency_code,
      Status} = item;
    this.setState(
      {
        isEditManageModalOpen: true,
        currency_name, 
        currency_code,
        Status,
        id: _id,
      },
      () => {}
    );
  };
  inputNameManageHandle = (e) => {
    this.setState({ currency_name: e.target.value });
  };

  inputSubManageHandle = (e) => {
    this.setState({ currency_code: e.target.value });
  };
  inputStatusManageHandle = (e) => {
    this.setState({ Status: e.target.value });
  };
  handleAcceptManageEdit = async () => {
    try {
      const { id, currency_name, 
        currency_code,
        Status
       } = this.state;

      const response = await fetch(
        `  http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/updatecurrency`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            currency_name, 
            currency_code,
            Status
          }),
        }
      );

      if (response.ok) {
        await this.fetchData();

        // Close the edit modal
        this.setState({ isEditManageModalOpen: false });
      } else {
        console.log("Error occurred while updating business type");
      }
    } catch (error) {
      console.error("An error occurred ", error);
    }
  };

  inputManageNameSearchHandle = (e) => {
    this.setState({ currency_name: e.target.value });
  };

  inputCurrencyManageHandle = (e) => {
    this.setState({ currency_code: e.target.value });
  };

  inputStatusManageHandle = (e) => {
    this.setState({ Status: e.target.value });
  };

  handleManageSearch = async () => {
    const { currency_name, currency_code, Status } = this.state;

    try {
      let searchCriteria = {};

      if (currency_name) {
        searchCriteria.currency_name = currency_name;
      }
      if (currency_code) {
        searchCriteria.currency_code = currency_code;
      }
      if (Status) {
        searchCriteria.Status = Status;
      }
      if (!currency_name && !Status && !currency_code) {
        searchCriteria.currency_name= "";
      }

      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/searchcurrency`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(searchCriteria)
        }
      );
      
      if (response.ok) {
        const result = await response.json();
        this.setState({ data: result.currencies });
      } else {
        console.log("Error occurred while searching currencies");
      }
    } catch (error) {
      console.error("An error occurred ", error);
    }
  };

  render() {
    const { data } = this.state;

    return (
      <>
        <Header />
        <Sidebar />
        <div id="dashboard">
          <div className="dashboard">
            <h3>Manage Currencies</h3>
            <div className="dashboardcontainer">
              <div className="search-container">
              <span>
              <label htmlFor="">Name:</label>
                  <input
                    type="text"
                    onChange={this.inputManageNameSearchHandle}
                    value={this.state.currency_name}
                  />
                </span>
                <span>
                  <label htmlFor="">Currency Code:</label>
                  <input
                    type="text"
                    onChange={this.inputCurrencyManageHandle}
                    value={this.state.currency_code}
                  />
                </span>
                <span>
                  <label htmlFor="">Status:</label>
                  <input
                    type="text"
                    onChange={this.inputStatusManageHandle}
                    value={this.state.Status}
                  />
                </span>
                <button className="btn" onClick={this.handleManageSearch}>
                  Search
                </button>
              </div>
              <div className="Mastertable">
                <div className="TableHeader-Option">
                  <div></div>
                  <div>
                    <i
                      className="customizeColumn"
                      class="fa-solid fa-plus"
                      onClick={this.handleButtonClick}
                    ></i>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </div>
                  {this.state.modalOpen && (
                    <Modal
                      heading={"Currency"}
                      onCloseModal={this.handleModalClose}
                      onDecline={this.handleDecline}
                      onAccept={this.handlecurrencyAccept}
                      children={
                        <div>
                          <label>Currency Name</label>
                          <input
                            type="text"
                            onChange={this.inputCurrencyHandle}
                            value={this.state.currency_name}
                            name="Currency Name"
                          />
                            <label>Currency code</label>
                          <input
                            type="text"
                            onChange={this.inputCodeHandle}
                            value={this.state.currency_code}
                            name="Currency code"
                          />
                        </div>
                      }
                    />
            
                )}       
                </div>      
                   <div id="CommonTable">
                  <div className="CommonTable">
                    <table>
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Currency Name</th>
                          <th>Currency Code</th>
                          <th>Status</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data && data.map((item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.currency_name}</td>
                            <td>{item.currency_code}</td>
                            <td
                              className={
                                item.Status === "Active" ? "active" : "deactive"
                              }
                            >
                              {item.Status}
                            </td>
                            <td className="edit-delete-icon">
                            <i className="fas fa-trash-alt"   onClick={() =>
                                    this.handleManageDelete(item.currency_name)
                                  } />
                              <i
                                  className="fas fa-edit"
                                  onClick={() => this.handleEditManageModalOpen(item)}
                                />
                              </td>
                              {this.state.isEditManageModalOpen && (
                                <Modal
                                  heading={"Edit currencyBusiness Type"}
                                  onCloseModal={() =>
                                    this.setState({ isEditManageModalOpen: false })
                                  }
                                  onDecline={() =>
                                    this.setState({ isEditManageModalOpen: false })
                                  }
                                  onAccept={this.handleAcceptManageEdit}
                                  children={
                                    <div>
                                      <label>Currency Name</label>
                                      <input
                                        type="text"
                                        onChange={this.inputNameManageHandle}
                                        value={this.state.currency_name}
                                        name="Name"
                                      />
                                      <label>currency code</label>
                                      <input
                                        type="text"
                                        onChange={this. inputSubManageHandle}
                                        value={this.state.currency_code}
                                        name="code"
                                      />
                                           <label>Status</label>
                                       <input
                                        type="text"
                                        onChange={this. inputStatusManageHandle}
                                        value={this.state.Status}
                                        name="code"
                                      />
                                      
                                    </div>
                                  }
                                />
                              )}
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

export default Y4ManageCurrencies;
