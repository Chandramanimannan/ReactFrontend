import React, { useRef } from "react";
import logo from "../../assets/media/image//centpays_full_logo.png";

const PDFGenerator = () => {
  const receiptBoxRef = useRef(null);
  const generatePDF = () => {
    if (receiptBoxRef.current) {
      const tempReceiptBox = receiptBoxRef.current.cloneNode(true);
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

  return (
    <div className="PDFGenerator">
      <div ref={receiptBoxRef} className="receipt-box">
        <div className="actual-receipt">
          <div className="receipt-organization-logo">
            <img alt="logo" src={logo} />
          </div>
          <table>
            <tr>
              <th colSpan="3">Summary</th>
            </tr>
            <tr>
              <td>Total Amount (USD)</td>
              <td colSpan="2">$54,449.59</td>
            </tr>
            <tr>
              <td>Currency</td>
              <td colSpan="2">USD</td>
            </tr>

            <tr>
              <th colSpan="3">Details</th>
            </tr>
            <tr>
              <td>Amount</td>
              <td colSpan="2">$3,539.22</td>
            </tr>
            <tr>
              <td>Total Count</td>
              <td colSpan="2">1,109</td>
            </tr>
            <tr>
              <td>Fee Rates (USD)</td>
              <td>6.50%</td>
              <td>0.45</td>
            </tr>
            <tr>
              <td>Merchant</td>
              <td colSpan="2">Centpays-FTD</td>
            </tr>
            <tr>
              <td>Accounting Period</td>
              <td colSpan="2">2023-11-10 to 2023-11-16</td>
            </tr>
            <tr>
              <td>Settlement Date</td>
              <td colSpan="2">2023-11-23</td>
            </tr>

            <tr>
              <th colSpan="3">Sales Details</th>
            </tr>
            <tr>
              <td>Sales</td>
              <td colSpan="2">$3,539.22</td>
            </tr>
            <tr>
              <td>Declines</td>
              <td colSpan="2">1,109</td>
            </tr>
            <tr>
              <td>Refunds</td>
              <td>6.50%</td>
              <td>0.45</td>
            </tr>
            <tr>
              <td>Chargebacks</td>
              <td colSpan="2">Centpays-FTD</td>
            </tr>
            <tr>
              <td>Net Total</td>
              <td colSpan="2">2023-11-10 to 2023-11-16</td>
            </tr>
          </table>
          <div className="actions-right">
            <button
              className="receipt-modal-download-button"
              onClick={generatePDF}
            >
              Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFGenerator;
