import React, { Component } from "react";
import Header from "../navigation/Header";
import Sidebar from "../navigation/Sidebar";
import Modal from "../../component/Modal";

class Y2Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusTotals: {},
      isMenu: true,
      modalOpen: false,
      data: [],
      nameTotals: {},
      isEditCateModalOpen: false,
      editItemId: null,
      category_name: "",
      short_name: "",
      Status: "",
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/category"
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
    this. handleAddCategory();
    this.setState({ modalOpen: false });
  };
  handleAddCategory= async () => {
    try {
      const response = await fetch(
        "http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_name: this.state.category_name,
            short_name: this.state.short_name,
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
  inputNameCateHandle = (e) => {
    this.setState({ category_name: e.target.value });
  };
  inputShortCateHandle = (e) => {
    this.setState({ short_name: e.target.value });
  };



  ////////////delete////////////////

  
  handleCateDelete = async (id) => {
    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/deletecategory`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_name: id,
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


  ///////////update///////////
  handleEditCateModalOpen = (item) => {
    const { _id, category_name, short_name, Status } = item;
    this.setState({
      isEditCateModalOpen: true, // Corrected the state key
      category_name,
      short_name,
      Status,
      id: _id,
    },
    () => {}
  );
};



  handleAcceptCateEdit = async () => {
    try {
      const { id,   category_name,short_name,Status } = this.state;

      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/updatecategory`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            category_name,
            short_name,
            Status,
          }),
        }
      );

      if (response.ok) {
        await this.fetchData();

        // Close the edit modal
        this.setState({ isEditCateModalOpen: false });
      } else {
        console.log("Error occurred while updating business type");
      }
    } catch (error) {
      console.error("An error occurred ", error);
    }
  };
  inputNameCateHandle = (e) => {
    this.setState({ category_name: e.target.value });
  };
  inputShortNameCateHandle = (e) => {
    this.setState({ short_name: e.target.value });
  };
  inputStatusCateHandle = (e) => {
    this.setState({ Status: e.target.value });
  };

///////////////search//////////////
  ///// Search input
  inputNameSearchCateHandle = (e) => {
    this.setState({ category_name: e.target.value });
  };
  inputStatusSearchCateHandle = (e) => {
    this.setState({ Status: e.target.value });
  };
handleCateSearch = async () => {
  const { category_name,short_name,Status } = this.state;

  try {
    let searchCriteria = {};

    if (category_name) {
      searchCriteria.category_name = category_name;
    }
    if (short_name) {
      searchCriteria.short_name = short_name;
    }
    

    if (Status) {
      searchCriteria.Status = Status;
    }
    if (!category_name && !Status && !short_name) {
      searchCriteria.category_name = "";
    }

    const response = await fetch(
      ` http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/mastersettings/searchcategory`,
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
      this.setState({ data: result.categories });
    } else {
      // const errorData = await response.json();
      console.log("Error occurred while searching business types");
    }
  } catch (error) {
    console.error("An error occurred ", error);
  }
};


  render() {
    const { data} = this.state;

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
                  <input
                    type="text"
                    onChange={this.inputNameSearchCateHandle}
                    value={this.state.category_name}
                  />
                </span>
                <span>
                  <label for="">Status:</label>
                  <input
                    type="text"
                    onChange={this.inputStatusSearchCateHandle}
                    value={this.state.Status}/>
                </span>

                <button className="btn" onClick={this.handleCateSearch}>
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
                      heading={"Add Category Type"}
                      onCloseModal={this.handleModalClose}
                      onDecline={this.handleDecline}
                      onAccept={this.handleAccept}
                      children={
                        <div>
                          <label>Name</label>
                          <input
                            type="text"
                            onChange={this.inputNameCateHandle}
                            value={this.state.category_name}
                            name="Name"
                          />
                            <label>ShortName</label>
                          <input
                            type="text"
                            onChange={this.inputShortCateHandle}
                            value={this.state.short_name}
                            name="Short"
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
                          <th>Short Name</th>
                          <th>Status</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                      {data && data.map((item, index) => (
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.category_name}</td>
                          <td>{item.short_name}</td>
                          <td className={item.Status === "Active" ? "active" : "deactive"}>
                              {item.Status}
                            </td>
                            <td className="edit-delete-icon">
                              
                            <i
                                  className="fas fa-trash-alt"
                                  onClick={() =>
                                    this.handleCateDelete(item.category_name)
                                  }
                                />
                               <i
                                  className="fas fa-edit"
                                  onClick={() => this.handleEditCateModalOpen(item)}
                                />
                              </td>
                              {this.state.isEditCateModalOpen && (
                                <Modal
                                  heading={"Edit Category Type"}
                                  onCloseModal={() => this.setState({ isEditCateModalOpen: false })}
                                  onDecline={() => this.setState({ isEditCateModalOpen: false })}
                                  onAccept={this.handleAcceptCateEdit}
                                  children={
                                    <div>
                                      <label>Name</label>
                                      <input
                                        type="text"
                                        onChange={this.inputNameCateHandle}
                                        value={this.state.category_name}
                                        name="Name"
                                      />
                                       <label>ShortName</label>
                                      <input
                                        type="text"
                                        onChange={this.inputShortNameCateHandle}
                                        value={this.state.short_name}
                                        name="Short_Name"
                                      />
                                      <label>Status</label>
                                      <input
                                        type="text"
                                        onChange={this.inputStatusCateHandle}
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

export default Y2Categories;
