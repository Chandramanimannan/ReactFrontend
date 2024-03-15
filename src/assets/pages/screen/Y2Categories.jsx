import React, { Component } from "react";
import Header from "../navigation/Header";
import Sidebar from "../navigation/Sidebar";
import Modal from "../../component/Modal";

class Y2Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Sanu",
          shortname: "s",
          status: "Active",
          option: "2",
        },
        {
          name: "Merchant",
          shortname: "s",
          status: "Deactive",
          option: "2",
        },
        {
          name: "Merchant",
          shortname: "s",
          status: "Deactive",
          option: "2",
        },
        {
          name: "shivam",
          shortname: "s",
          status: "Active",
          option: "2",
        },
        {
          name: "sh",
          shortname: "s",
          status: "Active",
          option: "2",
        },
      ],
      statusTotals: {},
      isMenu: true,
      modalOpen: false,
    };
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleButtonClick = () => {
    this.setState({ modalOpen: true });
  };

  render() {
    const { data } = this.state;

    return (
      <>
        <Header />
        <Sidebar />
        <div id="dashboard">
          <div className="dashboard">
            <h3>Categories</h3>
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
                    <Modal onClose={this.handleModalClose}>
                      <span
                        className="close-button"
                        onClick={this.handleModalClose}
                      >
                        &times;
                      </span>

                      <div>
                        <h3>Add Categories</h3>
                        <input type="text" name="Name" />
                        <button className="btn">Ok</button>
                      </div>
                      <div class="form__group field"></div>
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
                          <th>Short Name</th>
                          <th>Status</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.shortname}</td>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Y2Categories;
