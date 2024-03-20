import React, { Component } from "react";
import Header from "../navigation/Header";
import Sidebar from "../navigation/Sidebar";
import { Link } from "react-router-dom";
import Modal from "../../component/Modal";

class Y5DocumentTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document_type: "",

      Status: "",
      nameTotals: {},
      statusTotals: {},
      isMenu: true,
      modalOpen: false,

      isEditTypeModalOpen: false,
      editTypeItemId: null,
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/documenttype"
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
  inputTypeHandle = (e) => {
    this.setState({ document_type: e.target.value });
  };
  handleDocAccept = () => {
    this.handleDocument();
    this.setState({ modalOpen: false });
  };

  handleDocument = async () => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/documenttype",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            document_type: this.state.document_type,
            Status: this.state.Status,
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
  handleTypeDelete = async (id) => {
    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/deletedocumenttype`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            document_type: id,
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
  inputNameTypeHandle = (e) => {
    this.setState({ document_type: e.target.value });
  };
  inputStatusTypeHandle = (e) => {
    this.setState({ Status: e.target.value });
  };

  inputNamedocTypeHandle = (e) => {
    this.setState({ document_type: e.target.value });
  };

  inputStatusdocTypeHandle = (e) => {
    this.setState({ Status: e.target.value });
  };

  handleEditTypeModalOpen = (item) => {
    const { _id, document_type, Status } = item;
    this.setState(
      {
        isEditTypeModalOpen: true,
        document_type,
        Status,
        id: _id,
      },
      () => {}
    );
  };

  handleTypeEdit = async () => {
    try {
      const { id, document_type, Status } = this.state;

      const response = await fetch(
        ` http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/updatedocumenttype`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            document_type,
            Status,
          }),
        }
      );

      if (response.ok) {
        await this.fetchData();

        // Close the edit modal
        this.setState({ isEditTypeModalOpen: false });
      } else {
        console.log("Error occurred while updating business type");
      }
    } catch (error) {
      console.error("An error occurred ", error);
    }
  };

  handleDocSearch = async () => {
    const { document_type, Status } = this.state;

    try {
      let searchCriteria = {};

      if (document_type) {
        searchCriteria.document_type = document_type;
      }

      if (Status) {
        searchCriteria.Status = Status;
      }

      if (!document_type && !Status) {
        searchCriteria.document_type = "";
      }

      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/searchdocumenttype`,
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
        this.setState({ data: result.documentTypes });
      } else {
        console.log("Error occurred while searching document types");
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
            <h3>Document Types</h3>
            <div className="dashboardcontainer">
              <div className="search-container">
                <span>
                  <label for="">Name:</label>
                  <input
                    type="text"
                    onChange={this.inputNameTypeHandle}
                    value={this.state.document_type}
                  />
                </span>
                <span>
                  <label for="">Status:</label>
                  <input
                    type="text"
                    onChange={this.inputStatusTypeHandle}
                    value={this.state.Status}
                  />
                </span>
                <button className="btn" onClick={this.handleDocSearch}>
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
                      heading={"Add Business Type"}
                      onCloseModal={this.handleModalClose}
                      onDecline={this.handleDecline}
                      onAccept={this.handleDocAccept}
                      children={
                        <div>
                          <label>Name</label>
                          <input
                            type="text"
                            onChange={this.inputTypeHandle}
                            value={this.state.document_type}
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
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.document_type}</td>
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
                                    this.handleTypeDelete(item.document_type)
                                  }
                                />
                                <i
                                  className="fas fa-edit"
                                  onClick={() =>
                                    this.handleEditTypeModalOpen(item)
                                  }
                                />
                              </td>
                              {this.state.isEditTypeModalOpen && (
                                <Modal
                                  heading={"Edit DocumentBusiness Type"}
                                  onCloseModal={() =>
                                    this.setState({
                                      isEditTypeModalOpen: false,
                                    })
                                  }
                                  onDecline={() =>
                                    this.setState({
                                      isEditTypeModalOpen: false,
                                    })
                                  }
                                  onAccept={this.handleTypeEdit}
                                  children={
                                    <div>
                                      <label>Name</label>
                                      <input
                                        type="text"
                                        onChange={this.inputNamedocTypeHandle}
                                        value={this.state.document_type}
                                        name="Name"
                                      />
                                      <label>Status</label>
                                      <input
                                        type="text"
                                        onChange={this.inputStatusdocTypeHandle}
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

export default Y5DocumentTypes;
