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
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/mastersettings/businesstypes"
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
        "http://localhost:3000/mastersettings/businesstypes",
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
        console.log("Error occured");
      }
    } catch (error) {
      console.error("An error occurred ", error);
    }
  };

  inputHandle = (e) => {
    this.setState({ businesstype_name: e.target.value });
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
                  <input type="text" />
                </span>
                <span>
                  <label for="">Status:</label>
                  <input type="text" />
                </span>

                <button className="btn">search</button>
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
                    >
                      {/* <div>
                        <input type="text" name="Name" />
                      </div>
                      <div class="form__group field"></div> */}
                    </Modal>
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
                        {data.map((item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.businesstype_name}</td>
                            <td
                              className={
                                item.status === "Active" ? "active" : "deactive"
                              }
                            >
                              {item.status}
                            </td>
                            <td className="edit-delete-icon">
                              <i className="fas fa-trash-alt" />
                              <i className="fas fa-edit" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* <div className="NameTotals">
                    <h3>Name Totals</h3>
                    <ul>
                      {Object.keys(nameTotals).map((name) => (
                        <li key={name}>
                          {name}: {nameTotals[name]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="StatusTotals">
                    <h3>Status Totals</h3>
                    <ul>
                      <li>Active: {statusTotals.Active}</li>
                      <li>Deactive: {statusTotals.Deactive}</li>
                    </ul>
                  </div> */}
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
