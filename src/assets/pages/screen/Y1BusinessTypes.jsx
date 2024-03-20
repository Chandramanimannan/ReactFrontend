import React, { Component } from "react";
import Header from "../navigation/Header";
import Sidebar from "../navigation/Sidebar";
import { Link } from "react-router-dom";
import Modal from "../../component/Modal";

class Y1BusinessTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesstype_name: "",
      data: [],
      nameTotals: {},
      statusTotals: {},
      isMenu: true,
      modalOpen: false,
      Status: "",
      isEditModalOpen: false,
      editItemId: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/businesstypes"
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

  handleAccept = () => {
    this.handleAddBusinesstype();
    this.setState({ modalOpen: false });
  };

  handleAddBusinesstype = async () => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/businesstypes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            businesstype_name: this.state.businesstype_name,
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

  handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/deletebusinesstypes`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            businesstype_name: id,
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

  inputHandle = (e) => {
    this.setState({ businesstype_name: e.target.value });
  };
  /////////edit
  inputNameHandle = (e) => {
    this.setState({ businesstype_name: e.target.value });
  };

  inputStatusHandle = (e) => {
    this.setState({ Status: e.target.value });
  };
  ///// Search input
  inputNameSearchHandle = (e) => {
    this.setState({ businesstype_name: e.target.value });
  };
  inputStatusSearchHandle = (e) => {
    this.setState({ Status: e.target.value });
  };
  handleEditModalOpen = (item) => {
    const { _id, businesstype_name, Status } = item;
    this.setState(
      {
        isEditModalOpen: true,
        businesstype_name,
        Status,
        id: _id,
      },
      () => {}
    );
  };

  handleAcceptEdit = async () => {
    try {
      const { id, businesstype_name, Status } = this.state;

      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/updatebusinesstypes`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            businesstype_name,
            Status,
          }),
        }
      );

      if (response.ok) {
        await this.fetchData();

        // Close the edit modal
        this.setState({ isEditModalOpen: false });
      } else {
        console.log("Error occurred while updating business type");
      }
    } catch (error) {
      console.error("An error occurred ", error);
    }
  };
  handleSearch = async () => {
    const { businesstype_name, Status } = this.state;

    try {
      let searchCriteria = {};

      if (businesstype_name) {
        searchCriteria.businesstype_name = businesstype_name;
      }

      if (Status) {
        searchCriteria.Status = Status;
      }
      if (!businesstype_name && !Status) {
        searchCriteria.businesstype_name = "";
      }

      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/searchbusinesstypes`,
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
        // this.setState({ data: result.data });
        this.setState({ data: result.businessTypes });
      } else {
        // const errorData = await response.json();
        console.log("Error occurred while searching business types");
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
            <h3>Bussiness Type</h3>
            <div className="dashboardcontainer">
              <div className="search-container">
                <span>
                  <label for="">Name:</label>
                  <input
                    type="text"
                    onChange={this.inputNameSearchHandle}
                    value={this.state.businesstype_name}
                  />
                </span>
                <span>
                  <label for="">Status:</label>
                  <input
                    type="text"
                    onChange={this.inputStatusSearchHandle}
                    value={this.state.Status}
                  />
                </span>
                <button className="btn" onClick={this.handleSearch}>
                  Search
                </button>
              </div>

              <div className="Mastertable">
                <div className="TableHeader-Option">
                  <div></div>
                  <div>
                    <i
                      className="customizeColumn fa-solid fa-plus"
                      onClick={this.handleButtonClick}
                    ></i>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </div>
                  {this.state.modalOpen && (
                    <Modal
                      heading={"Add Business Type"}
                      onCloseModal={this.handleModalClose}
                      onDecline={this.handleDecline}
                      onAccept={this.handleAccept}
                      children={
                        <div>
                          <label>Name</label>
                          <input
                            type="text"
                            onChange={this.inputHandle}
                            value={this.state.businesstype_name}
                            name="Name"
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
                          <th>Name</th>
                          <th>Status</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.businesstype_name}</td>
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
                                    this.handleDelete(item.businesstype_name)
                                  }
                                />
                                <i
                                  className="fas fa-edit"
                                  onClick={() => this.handleEditModalOpen(item)}
                                />
                              </td>
                              {this.state.isEditModalOpen && (
                                <Modal
                                  heading={"Edit Business Type"}
                                  onCloseModal={() =>
                                    this.setState({ isEditModalOpen: false })
                                  }
                                  onDecline={() =>
                                    this.setState({ isEditModalOpen: false })
                                  }
                                  onAccept={this.handleAcceptEdit}
                                  children={
                                    <div>
                                      <label>Name</label>
                                      <input
                                        type="text"
                                        onChange={this.inputNameHandle}
                                        value={this.state.businesstype_name}
                                        name="Name"
                                      />
                                      <label>Status</label>
                                      <input
                                        type="text"
                                        onChange={this.inputStatusHandle}
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

export default Y1BusinessTypes;
