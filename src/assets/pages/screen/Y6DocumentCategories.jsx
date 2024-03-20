import React, { Component } from "react";
import Header from "../navigation/Header";
import Sidebar from "../navigation/Sidebar";
import { Link } from "react-router-dom";
import Modal from "../../component/Modal";

class Y7Banks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank_name: "",
      div_id: "",
      bank_url: "",

      data: [],
      nameTotals: {},
      statusTotals: {},
      isMenu: true,
      modalOpen: false,
      Status: "",
      isEditBankModalOpen: false,
      editBankItemId: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/bank"
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

  handleAcceptBank = () => {
    this.handleBank();
    this.setState({ modalOpen: false });
  };
  handleBank = async () => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/bank",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bank_name: this.state.bank_name,
            div_id: this.state.div_id,
            bank_url: this.state.bank_url,
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
 //add modal
  inputNameBankHandle = (e) => {
    this.setState({ bank_name: e.target.value });
  };

  inputDivBankHandle = (e) => {
    this.setState({ div_id: e.target.value });
  };
  inputCateBankHandle = (e) => {
    this.setState({ bank_url: e.target.value });
  };
  //////search
  inputBankNameSearchHandle = (e) => {
    this.setState({ bank_name: e.target.value });
  };
  inputBankCateSearchHandle = (e) => {
    this.setState({ div_id: e.target.value });
  };
  inputBankUrlSearchHandle = (e) => {
    this.setState({ bank_url: e.target.value });
  };
  inputBankStatusSearchHandle = (e) => {
    this.setState({ Status: e.target.value });
  };
//edit modal
  inputnameBankHandle = (e) => {
    this.setState({ bank_name: e.target.value });
  };

  inputBanksdivHandle= (e) => {
    this.setState({ div_id: e.target.value });
  };
  inputBankStatusSearchHandle = (e) => {
    this.setState({ Status: e.target.value });
  };
  inputBankURLHandle = (e) => {
    this.setState({ bank_url: e.target.value });
  };

  handleBankDelete = async (id) => {
    try {
      const response = await fetch(
        ` http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/deletebank`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bank_name: id,
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

  handleEditBankModalOpen = (item) => {
    const { _id, subcategory_name, category_name, Status } = item;
    this.setState(
      {
        isEditBankModalOpen: true,
        subcategory_name,
        category_name,
        Status,
        id: _id,
      },
      () => {}
    );
  };
  handleAcceptBankEdit = async () => {
    try {
      const { id, bank_name, div_id, bank_url, Status } = this.state;

      const response = await fetch(
        ` http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/updatebank`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            bank_name,
            div_id,
            bank_url,
            Status,
          }),
        }
      );

      if (response.ok) {
        await this.fetchData();

        // Close the edit modal
        this.setState({isEditBankModalOpen: false });
      } else {
        console.log("Error occurred while updating business type");
      }
    } catch (error) {
      console.error("An error occurred ", error);
    }
  };
  handleBankSearch = async () => {
    const { bank_name, div_id, bank_url, Status } = this.state;

    try {
      let searchCriteria = {};
  
      if (bank_name) {
        searchCriteria.bank_name = bank_name;
      }
      if (div_id) {
        searchCriteria.div_id = div_id;
      }
      if (bank_url) {
        searchCriteria.bank_url = bank_url;
      }
      if (Status) {
        searchCriteria.Status = Status;
      }
  

      if (!bank_name && !Status && !bank_url && !div_id) {
        searchCriteria.bank_name = "";
      }
  
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/searchbank`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchCriteria),
        }
      );
  
      if (response.ok) {
        const result = await response.json();
        this.setState({ data: result.banks });
      } else {
        console.log("Error occurred while searching banks");
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
            <h3>Banks</h3>
            <div className="dashboardcontainer">
              <div className="search-container">
                <span>
                  <label for="">Bankname:</label>
                  <input
                    type="text"
                    onChange={this.inputBankNameSearchHandle}
                    value={this.state.bank_name}
                  />
                </span>
                <span>
                  <label for="">divid:</label>
                  <input
                    type="text"
                    onChange={this.inputBankCateSearchHandle}
                    value={this.state.div_id}
                  />
                </span>
                <span>
                  <label for="">Bankurl:</label>
                  <input
                    type="text"
                    onChange={this.inputBankUrlSearchHandle}
                    value={this.state.bank_url}
                  />
                </span>
                <span>
                  <label for="">Status:</label>
                  <input
                    type="text"
                    onChange={this.inputBankStatusSearchHandle}
                    value={this.state.Status}
                  />
                </span>
                <button className="btn" onClick={this.handleBankSearch}>
                  search
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
                      heading={"Add BankType"}
                      onCloseModal={this.handleModalClose}
                      onDecline={this.handleDecline}
                      onAccept={this.handleAcceptBank}
                      children={
                        <div>
                          <label>Bank</label>
                          <input
                            type="text"
                            onChange={this.inputNameBankHandle}
                            value={this.state.bank_name}
                            name="Name"
                          />
                          <label>Div_id</label>
                          <input
                            type="text"
                            onChange={this.inputDivBankHandle}
                            value={this.state.div_id}
                            name="Div"
                          />
                          <label>Bank_url</label>
                          <input
                            type="text"
                            onChange={this.inputCateBankHandle}
                            value={this.state.bank_url}
                            name="Url"
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
                          <th>Bank Name</th>
                          <th>Div Id</th>
                          <th>Bank Url</th>
                          
                          <th>Status</th>
                          <th>Option</th>
                          <th>Image</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.map((item, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              {/* <td>{item.name}</td> */}
                              <td>{item.bank_name}</td>
                              <td>{item.div_id}</td>
                              <td>{item.bank_url}</td>

                              <td
                                className={
                                  item.Status === "Active"
                                    ? "active"
                                    : "deactive"
                                }
                              >
                                {item.Status}
                              </td>
                              <td className="edit-delete-icon">
                              <i
                                className="fas fa-trash-alt"
                                onClick={() =>
                                  this. handleBankDelete(item.bank_name)
                                }
                              />
                               <i
                                  className="fas fa-edit"
                                  onClick={() => this.handleEditBankModalOpen(item)}
                                />
                              </td>
                              {this.state.isEditBankModalOpen && (
                                <Modal
                                  heading={"Edit SubBusiness Type"}
                                  onCloseModal={() =>
                                    this.setState({
                                      isEditBankModalOpen: false,
                                    })
                                  }
                                  onDecline={() =>
                                    this.setState({
                                      isEditBankModalOpen: false,
                                    })
                                  }
                                  onAccept={this.  handleAcceptBankEdit }
                                  children={
                                    <div>
                                      <label>Name</label>
                                      <input
                                        type="text"
                                        onChange={this.inputnameBankHandle}
                                        value={this.state.bank_name}
                                        name="Name"
                                      />
                                      <label>Div_id</label>
                                      <input
                                        type="text"
                                        onChange={this.inputBanksdivHandle}
                                        value={this.state.div_id}
                                        name="category"
                                      />
                                         <label>BankUrl</label>
                                       <input
                                        type="text"
                                        onChange={this.inputBankURLHandle}
                                        value={this.state.bank_url}
                                        name="category"
                                      />
                                      <label>Status</label>
                                      <input
                                        type="text"
                                        onChange={this.inputBankStatusSearchHandle}
                                        value={this.state.Status}
                                        name="Status"
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

export default Y7Banks;
