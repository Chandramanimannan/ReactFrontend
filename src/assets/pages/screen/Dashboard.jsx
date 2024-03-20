import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../navigation/Header";
import Sidebar from "../navigation/Sidebar";
import Table from "../../component/Table";
import dashboard_ic from "../../media/icon/home_page.png";
import notification_ic from "../../media/icon/mark.png";
import Bargraph from "../../component/Bargraph";
import Piechart from "../../component/Piechart";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: "admin",
      showNoti: false,
      searchid: "",
      searchresult: "",
      currentPage: 1,
      perPage: 50,
      DashboardTabledata: [],
    };
  }

  componentDidMount() {
    // const role = sessionStorage.getItem("role");
    // this.setState({ userRole: role });
    this.fetchData();
  }

  fetchData = async () => {
    // const { currentPage, perPage } = this.state;

    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/transactiontables`
      );
      const result = await response.json();
      this.setState({ DashboardTabledata: result });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleNotification = () => {
    this.setState({ showNoti: !this.state.showNoti });
  };

  toggleMessageSize = () => {
    this.setState((prevState) => ({
      isMessageExpanded: !prevState.isMessageExpanded,
    }));
  };

  handleSearch = async () => {
    const { searchid } = this.state;
    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/transactiontables/quicksearch?id=${searchid}`
      );

      const result = await response.json();

      this.setState({ searchresult: result });
    } catch (error) {
      console.error("An error occurred during searching:", error);
    }
  };

  getStatusColor(Status) {
    switch (Status) {
      case "Success":
        return "#3CB371";
      case "Pending":
        return "#ffc125";
      case "Failed":
        return "#F08080";
      default:
        return "#ffffff";
    }
  }

  render() {
    const { userRole, showNoti, searchid } = this.state;
    if (userRole === "admin") {
      return (
        <>
          <Header />
          <Sidebar />
          <div id="dashboard">
            <div className="dashboard">
              <div className="upper-part">
                <div>
                  <img
                    src={dashboard_ic}
                    alt="dashboard icon"
                    className="icon"
                  />
                  <h3>Dashboard</h3>
                </div>

                {showNoti && (
                  <div className="Notification-Box">
                    <img
                      src={notification_ic}
                      alt="notification icon"
                      className="icon"
                    />
                    <p>Hello! User</p>
                    <i onClick={() => this.handleNotification()}>x</i>
                  </div>
                )}
              </div>

              <div className="middle-part">
                <div className="quicksearchContainer">
                  <div className="quickSearch">
                    <input
                      type="text"
                      placeholder="TxnId / OrderId"
                      value={searchid}
                      onChange={(e) =>
                        this.setState({ searchid: e.target.value })
                      }
                    />
                    <button type="search" onClick={this.handleSearch}>
                      Search
                    </button>
                  </div>
                  <div className="quickresponse">
                    <div className="status">
                      <h4>Status: </h4>
                      <p
                        style={{
                          color: this.getStatusColor(
                            this.state.searchresult.Status
                          ),
                        }}
                      >
                        {this.state.searchresult.Status}
                      </p>

                      {
                        <Link
                          to={`/transactionreport/${this.state.searchresult._id}`}
                        >
                          {" "}
                          <i class="fa-solid fa-ellipsis"></i>
                        </Link>
                      }
                    </div>
                    <div className="message">
                      <h4>Message: </h4>
                      <p>{this.state.searchresult.message}</p>
                    </div>
                  </div>
                </div>

                <div className="salesContainer">
                  <span>
                    <h4>Sales</h4>
                    <h1>Rs. 50,000 /-</h1>
                    <p>Today</p>
                  </span>
                  <Bargraph />
                </div>
                <div className="statisticsContainer">
                  <span>
                    <h4>Statistics</h4>
                    <div>
                      <p style={{ color: "#3CB371" }}>Succeed</p>
                      <p style={{ color: "#ffc125" }}>Pending</p>
                      <p style={{ color: "#F08080" }}>Failed</p>
                    </div>
                  </span>
                  <Piechart />
                </div>
              </div>
              <div className="tableContainer">
                <Table data={this.state.DashboardTabledata} />
              </div>
            </div>
          </div>
        </>
      );
    }
    if (userRole === "merchant") {
      return (
        <>
          <Header />
          <div id="dashboard">Merchant Dashboard</div>
        </>
      );
    }
    if (userRole === "employee") {
      return (
        <>
          <Header />
          <div id="dashboard">Employee Dashboard</div>
        </>
      );
    }
  }
}
export default Dashboard;
