import React, { Component } from "react";
import logo from "../../assets/media/image//centpays_full_logo.png";

class PDFGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Settlementdata: [],
      ratesdata: [],
    };
    this.receiptBoxRef = React.createRef();
  }

  componentDidMount() {
    this.showpdfRecord(this.props.id);
    console.log("id", this.props.id);
  }

  showpdfRecord = async (id) => {
    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/getsettlementrecordforpdf?id=${id}`
      );
      const result = await response.json();
      this.setState({ Settlementdata: result });
    } catch (error) {
      console.error("Error fetching settlement details:", error);
    }
    this.showRates(this.state.Settlementdata.company_name);
  };

  showRates = async (company_name) => {
    try {
      const response = await fetch(
        `http://centpaysdb-env.eba-jwsrupux.ap-south-1.elasticbeanstalk.com/ratetables?company_name=${company_name}`
      );
      const result = await response.json();
      this.setState({ ratesdata: result });
    } catch (error) {
      console.error("Error fetching rates data:", error);
    }
  };

  generatePDF = () => {
    if (this.receiptBoxRef.current) {
      const tempReceiptBox = this.receiptBoxRef.current.cloneNode(true);
      const tempWrapper = document.createElement("div");
      tempWrapper.appendChild(tempReceiptBox);

      const printWindow = window.open("", "_blank");

      const stylesheets = document.styleSheets;
      for (let i = 0; i < stylesheets.length; i++) {
        const stylesheet = stylesheets[i];
        const rules = stylesheet.cssRules || stylesheet.rules;
        if (rules) {
          const styleElement = printWindow.document.createElement("style");
          styleElement.type = "text/css";
          for (let j = 0; j < rules.length; j++) {
            styleElement.appendChild(
              printWindow.document.createTextNode(rules[j].cssText)
            );
          }
          printWindow.document.head.appendChild(styleElement);
        }
      }

      printWindow.document.body.appendChild(tempWrapper);

      printWindow.print();

      printWindow.onafterprint = function () {
        printWindow.close();
      };
    }
  };

  render() {
    const { id } = this.props;
    const { ratesdata, Settlementdata } = this.state;
    {
      console.log("PDF", this.state.Settlementdata);
    }
    return (
      <div className="pdf-container">
        <div ref={this.receiptBoxRef} className="pdf-inner-container">
          <div className="pdf-header">
            <img className="companylogo" src={logo} alt="Ceentpays logo"></img>
          </div>
          <div className="pdf-firstsection">
            <div className="merchant-info">
              <div className="grid-item">Merchant</div>
              <div className="grid-item">{Settlementdata.company_name}</div>
            </div>
            <div className="sheet-info">
              <div className="grid-item">Accounting Period</div>
              <div className="grid-item">
                {Settlementdata.fromDate + " to " + Settlementdata.toDate}
              </div>
              <div className="grid-item">Settlement Date</div>
              <div className="grid-item">{Settlementdata.date_settled}</div>
              <div className="grid-item">Currency</div>
              <div className="grid-item">USDT</div>
            </div>
          </div>
          {/* <div className="pdf-ruler"></div> */}
          <div className="pdf-secondsection">
            <table>
              <thead>
                <th></th>
                <th>EUR</th>
                <th>USD</th>
                <th>Total Count</th>
                <th>Total Amount (USD)</th>
              </thead>
              <tbody>
                <tr>
                  <td className="head">Sales</td>
                  <td>{Settlementdata.eur_sales_count}</td>
                  <td>{Settlementdata.usd_sales_count}</td>
                  <td>{Settlementdata.total_sales_count}</td>
                  <td>{Settlementdata.total_sales_amount + " $"}</td>
                </tr>
                <tr>
                  <td className="head">Declines</td>
                  <td>{Settlementdata.eur_declines_count}</td>
                  <td>{Settlementdata.usd_declines_count}</td>
                  <td>{Settlementdata.total_declines_count}</td>
                  <td>{Settlementdata.total_declines_amount + " $"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="net-total-div">
            <p>Net Total</p>
            <p>
              {Settlementdata.total_sales_amount +
                Settlementdata.total_declines_amount +
                " $"}
            </p>
          </div>
          {/* <div className="pdf-ruler"></div> */}
          <div className="pdf-thirdsection">
            <table>
              <thead>
                <th></th>
                <th>Fee Rates (USD)</th>
                <th>Amount</th>
              </thead>
              <tbody>
                <tr>
                  <td className="head">MDR</td>
                  <td>{ratesdata.MDR + " %"}</td>
                  <td>{Settlementdata.MDR_amount + " $"}</td>
                </tr>
                <tr>
                  <td className="head">Sale Transaction Fee</td>
                  <td>{ratesdata.txn_app + " $"}</td>
                  <td>{Settlementdata.app_amount + " $"}</td>
                </tr>
                <tr>
                  <td className="head">Decline Transaction Fee</td>
                  <td>{ratesdata.txn_dec + " $"}</td>
                  <td>{Settlementdata.dec_amount + " $"}</td>
                </tr>
                <tr>
                  <td className="head">Rolling Reserve</td>
                  <td>{ratesdata.RR + " %"}</td>
                  <td>{Settlementdata.RR_amount + " $"}</td>
                </tr>
                <tr>
                  <td className="head">Settlement Fee</td>
                  <td>{ratesdata.settlement_fee + " %"}</td>
                  <td>{Settlementdata.s_val + " $"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="net-total-div">
            <p>Fee Total</p>
            <p>{Settlementdata.total_fee + " $"}</p>
          </div>
          {/* <div className="pdf-ruler"></div> */}
          <div className="net-total-div">
            <p>Settlement Total</p>
            <p>{Settlementdata.settlement_volume + " $"}</p>
          </div>
          <table>
            <tbody>
              <tr>
                <td className="head">Refunds</td>
                <td>{ratesdata.refund_fee + " $"}</td>
                <td>{Settlementdata.refund_amount + " $"}</td>
              </tr>
              <tr>
                <td className="head">Chargebacks</td>
                <td>{ratesdata.chargeback_fee + " $"}</td>
                <td>{Settlementdata.chargeback_amount + " $"}</td>
              </tr>
            </tbody>
          </table>
          <div className="net-total-div">
            <p>Settlement Amount</p>
            <p>
              {(
                Settlementdata.settlement_volume -
                Settlementdata.refund_amount -
                Settlementdata.chargeback_amount
              ).toFixed(3) + " $"}
            </p>
          </div>
        </div>
        <div className="pdf-lastsection">
          <button className="pdf-button" onClick={this.generatePDF}>
            Generate PDF
          </button>
        </div>
      </div>
    );
  }
}

export default PDFGenerator;
