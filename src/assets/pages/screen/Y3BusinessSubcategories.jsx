import React, { Component } from "react";
import Header from "../navigation/Header";
import Sidebar from "../navigation/Sidebar";
import { Link } from "react-router-dom";
import Modal from "../../component/Modal";

class Y3BusinessSubcategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subcategory_name:"",
      category_name:"",
      data: [],
      nameTotals: {},
      statusTotals: {},
      isMenu: true,
      modalOpen: false,
      Status: "",
      isEditSubModalOpen: false,
      editItemId: null,
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/businesssubcategory"
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

  handleSubAccept = () => {
    this.handleAddSubBusinesstype();
    this.setState({ modalOpen: false });
  };
  // inputShortSubHandle = (e) => {
  //   this.setState({ subcategory_name: e.target.value });
  // };
  // inputNameSubHandle = (e) => {
  //   this.setState({category_name: e.target.value });
  // };



  handleAddSubBusinesstype = async () => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/businesssubcategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subcategory_name: this.state.subcategory_name,
            category_name: this.state.category_name,
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
  
  handleSubDelete = async (id) => {
    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/deletebusinesssubcategory`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subcategory_name: id,
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
  ////////////add
  inputSubNameSearchHandle = (e) => {
    this.setState({ subcategory_name: e.target.value });
  };
  inputSubCateSearchHandle = (e) => {
    this.setState({ category_name: e.target.value });
  };
  inputSubStatusSearchHandle = (e) => {
    this.setState({ Status: e.target.value });
  };
////////
  inputNamesubcatHandle = (e) => {
    this.setState({ subcategory_name: e.target.value });
  };
    inputSubsubHandle = (e) => {
    this.setState({ category_name: e.target.value });
  };
  inputsubStatusHandle = (e) => {
    this.setState({ Status: e.target.value });
  };
  ////
  inputNamesSubHandle =(e) => {
    this.setState({ subcategory_name: e.target.value });
  };
  inputCateSubHandle = (e) => {
    this.setState({ category_name: e.target.value });
  };
  handleSubSearch = async () => {
    const { subcategory_name, category_name, Status } = this.state;
  
    try {
      let searchCriteria = {};
  
      if (subcategory_name) {
        searchCriteria.subcategory_name = subcategory_name;
      }
      if (category_name) {
        searchCriteria.category_name = category_name;
      }
      if (Status) {
        searchCriteria.Status = Status;
      }
  
      if (!subcategory_name && !Status && !category_name) {
        searchCriteria.subcategory_name = "";
      }
      console.log("Search Criteria:", searchCriteria);
  
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/searchbusinesssubcategory`,
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
        console.log("API Response:", result);
        this.setState({ data: result.businessubcategories });
      } else {
        console.log("Error occurred while searching business types");
      }
    } catch (error) {
      console.error("An error occurred ", error);
    }
  };
  /////////////update///////
  handleEditSubModalOpen = (item) => {
    const { _id,subcategory_name,
      category_name,
      Status} = item;
    this.setState(
      {
        isEditSubModalOpen: true,
        subcategory_name,
        category_name,
        Status,
        id: _id,
      },
      () => {}
    );
  };
  handleAcceptSubEdit = async () => {
    try {
      const { id, subcategory_name,
        category_name,
        Status } = this.state;

      const response = await fetch(
        ` http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/updatebusinesssubcategory`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            subcategory_name,
            category_name,
            Status,
          }),
        }
      );

      if (response.ok) {
        await this.fetchData();
        this.setState({ isEditSubModalOpen: false });

        // Close the edit modal
        this.setState({ isEditModalOpen: false });
      } else {
        console.log("Error occurred while updating business type");
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
            <h3>Business Sub Categories</h3>
            <div className="dashboardcontainer">
              <div className="search-container">
                <span>
                  <label for="">Name:</label>
                  <input
                    type="text"
                    onChange={this.inputSubNameSearchHandle}
                    value={this.state.subcategory_name}
                  />
                </span>
                <span>
                  <label for="">Category Name:</label>
                  <input
                    type="text"
                    onChange={this.inputSubCateSearchHandle}
                    value={this.state.category_name}
                  />
                </span>
                <span>
                  <label for="">Status:</label>
                  <input
                    type="text"
                    onChange={this.inputSubStatusSearchHandle}
                    value={this.state.Status}
                  />
                </span>
                <button className="btn" onClick={this.handleSubSearch}>
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
                      heading={"Add SubBusiness Type"}
                      onCloseModal={this.handleModalClose}
                      onDecline={this.handleDecline}
                      onAccept={this. handleSubAccept}
                      children={
                        <div>
                          <label>Name</label>
                          <input
                            type="text"
                            onChange={this.inputNamesSubHandle}
                            value={this.state.subcategory_name}
                            name="Name"
                          />
                            <label>Category</label>
                          <input
                            type="text"
                            onChange={this.inputCateSubHandle}
                            value={this.state.category_name}
                            name="Category"
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
                          <th>Category</th>
                          <th>Status</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data && data.map((item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.subcategory_name}</td>
                            <td>{item.category_name}</td>
                            <td
                              className={
                                item.Status === "Active" ? "active" : "deactive"
                              }
                            >
                              {item.Status}
                            </td>
                            <td className="edit-delete-icon">
                              <i className="fas fa-trash-alt"   onClick={() =>
                                    this.handleSubDelete(item.subcategory_name)
                                  } />
                                <i
                                  className="fas fa-edit"
                                  onClick={() => this.handleEditSubModalOpen(item)}
                                />
                              </td>
                              {this.state.isEditSubModalOpen && (
                                <Modal
                                  heading={"Edit SubBusiness Type"}
                                  onCloseModal={() =>
                                    this.setState({ isEditSubModalOpen: false })
                                  }
                                  onDecline={() =>
                                    this.setState({ isEditSubModalOpen: false })
                                  }
                                  onAccept={this.handleAcceptSubEdit}
                                  children={
                                    <div>
                                      <label>Name</label>
                                      <input
                                        type="text"
                                        onChange={this.inputNamesubcatHandle}
                                        value={this.state.subcategory_name}
                                        name="Name"
                                      />
                                      <label>category</label>
                                      <input
                                        type="text"
                                        onChange={this. inputSubsubHandle}
                                        value={this.state.category_name}
                                        name="category"
                                      />
                                        <label>Status</label>
                                      <input
                                        type="text"
                                        onChange={this.inputsubStatusHandle}
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

export default Y3BusinessSubcategories;
