import React, { Component } from "react";
import visa from "../media/image/visa.png";
import mastercard from "../media/image/mastercard.png";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      currentPage: 1,
      perPage: 50,
      isfullScreen: false,
      isCustomizeColumn: false,
      formattedTimestamp: [],
      columns: [
        { id: "col1", label: "s.no", isVisible: false, filterable: false },
        { id: "col2", label: "txnid", isVisible: true, filterable: false },
        {
          id: "col3",
          label: "paymentgateway",
          isVisible: true,
          filterable: true,
        },
        {
          id: "col4",
          label: "merchantTxnId",
          isVisible: true,
          filterable: false,
        },
        { id: "col5", label: "merchant", isVisible: true, filterable: true },
        { id: "col6", label: "orderNo", isVisible: true, filterable: false },
        { id: "col7", label: "MID", isVisible: true, filterable: false },
        { id: "col8", label: "cname", isVisible: true, filterable: false },
        { id: "col9", label: "email", isVisible: true, filterable: false },
        {
          id: "col10",
          label: "cardnumber",
          isVisible: true,
          filterable: false,
        },
        { id: "col11", label: "cardtype", isVisible: true, filterable: true },

        { id: "col12", label: "country", isVisible: true, filterable: true },
        { id: "col13", label: "amount", isVisible: true, filterable: false },
        { id: "col14", label: "currency", isVisible: true, filterable: true },
        {
          id: "col15",
          label: "transactiondate",
          isVisible: true,
          filterable: false,
        },
        { id: "col16", label: "Status", isVisible: true, filterable: true },
        { id: "col17", label: "message", isVisible: true, filterable: false },
        { id: "col18", label: "pdate", isVisible: true, filterable: false },
        { id: "col19", label: "router", isVisible: true, filterable: false },
        { id: "col20", label: "webURL", isVisible: true, filterable: false },
      ],
    };
  }

  // componentDidMount() {
  //   this.fetchData();
  // }

  // fetchData = async () => {
  //   const { currentPage, perPage } = this.state;

  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/transactiontables?page=${currentPage}&per_page=${perPage}`
  //     );
  //     const result = await response.json();
  //     this.setState({ data: result });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // Function to handle page change
  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage }, this.fetchData);
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

  getCardType(cardType) {
    switch (cardType) {
      case "Visa":
        return <img className="cardTypeImage" alt="Visa Logo" src={visa} />;
      case "Mastercard":
        return (
          <img
            className="cardTypeImage"
            alt="Mastercard Logo"
            src={mastercard}
          />
        );
      default:
        return "";
    }
  }

  handleFullScreenComponent = () => {
    this.setState({ isfullScreen: !this.state.isfullScreen });
  };

  toggleCustomizeColumnModal = () => {
    this.setState((prevState) => ({
      isCustomizeColumn: !prevState.isCustomizeColumn,
    }));
  };

  toggleColumnVisibility = (columnId) => {
    this.setState((prevState) => ({
      columns: prevState.columns.map((col) =>
        col.id === columnId ? { ...col, isVisible: !col.isVisible } : col
      ),
    }));
  };

  render() {
    const { currentPage } = this.state;
    const { data } = this.props;
    // const { columns, isfullScreen, isCustomizeColumn } = this.props;
    const columnStyles = {
      col2: { whiteSpace: "nowrap", textAlign: "left" },
      col6: { whiteSpace: "nowrap" },
      col4: { whiteSpace: "nowrap" },
      col5: { whiteSpace: "nowrap" },
      col17: { minWidth: "15rem", textAlign: "left" },
    };
    return (
      <>
        <div id="masterTable">
          <div className="masterTable">
            <div className="table-functionality-layer">
              <div className="first-option">
                {/* <input type="text" /> */}
                <select>
                  <option>Filter</option>
                  <option>Filter val1</option>
                  <option>Filter val2</option>
                  <option>Filter val3</option>
                </select>
                <select>
                  <option>Customise</option>
                  <option>coloum 1</option>
                  <option>coloum 2</option>
                  <option>coloum 3</option>
                </select>
                <div className="second-option">
                  <i
                    className="customizeColumn"
                    onClick={this.toggleCustomizeColumnModal}
                    class="fa-solid fa-screwdriver-wrench"
                  ></i>
                  {this.state.isfullScreen === true ? (
                    <i
                      onClick={() => this.handleFullScreenComponent()}
                      class="fa-solid fa-down-left-and-up-right-to-center"
                    ></i>
                  ) : (
                    <i
                      onClick={() => this.handleFullScreenComponent()}
                      class="fa-solid fa-up-right-and-down-left-from-center"
                    ></i>
                  )}
                  {/* <button>Import</button>
                  <button>Export</button> */}
                </div>
              </div>
            </div>
            <div className="Table-main">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>S.No.</th>
                    {this.state.columns
                      .filter((col) => col.isVisible)
                      .map((col) => (
                        <th key={col.id}>{col.label}</th>
                      ))}
                    <th>Send Webhook</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td class="centered">
                        <input type="checkbox" />
                      </td>
                      <td>{index + 1}</td>
                      {this.state.columns
                        .filter((col) => col.isVisible)
                        .map((col) => (
                          <td
                            key={col.id}
                            style={
                              col.id === "col16"
                                ? {
                                    padding: "2px 0px",
                                    width: "5rem",
                                    height: "1.5rem",
                                    borderRadius: "15px",
                                    color: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: this.getStatusColor(
                                      row[col.label]
                                    ),
                                  }
                                : columnStyles[col.id] || {}
                            }
                          >
                            {col.id === "col11"
                              ? this.getCardType(row[col.label])
                              : row[col.label]}
                          </td>
                        ))}
                      <td>Send webhook</td>
                      <td>Edite Delete</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {this.state.isCustomizeColumn && (
          <div className="CustomColumnmodal-background">
            <div className="CustomColumnmodal">
              <div className="modalheader">
                <h1>Customize Columns</h1>
                <button onClick={this.toggleCustomizeColumnModal}>x</button>
              </div>

              <div className="customColumn">
                {this.state.columns.map((col) => (
                  <form>
                    <div class="checkbox-wrapper-29" key={col.id}>
                      <label class="checkbox">
                        <input
                          type="checkbox"
                          checked={col.isVisible}
                          onChange={() => this.toggleColumnVisibility(col.id)}
                          class="checkbox__input"
                        />
                        <span class="checkbox__label"></span>
                        {col.label}
                      </label>
                    </div>
                  </form>
                ))}
              </div>
              <div className="columnLine"></div>
              <div className="customModalfooter">
                <button onClick={this.toggleCustomizeColumnModal}>OK</button>
              </div>
            </div>
          </div>
        )}

        <div className="Pagination">
          {/* <div className="paginationLeft">
            <span>
              {(currentPage - 1) * this.state.rowsPerPage + 1}-
              {currentPage === totalPages
                ? data.length
                : currentPage * this.state.rowsPerPage}{" "}
              of {data.length}
            </span>
          </div> */}
          <div className="paginationRight">
            <div className="paginationbtn">
              <button
                className="paginationButton"
                onClick={() => this.handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i class="fa-solid fa-angles-left"></i>
              </button>
            </div>
            {/* {this.renderPageButtons()} */}
            <div className="paginationbtn">
              <button
                className="paginationButton"
                onClick={() => this.handlePageChange(currentPage + 1)}
                // disabled={currentPage === totalPages}
              >
                <i class="fa-solid fa-angles-right"></i>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Table;
