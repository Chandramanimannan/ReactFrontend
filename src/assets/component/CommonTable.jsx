import React, { Component } from "react";

class CommonTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
    };
  }

  componentDidMount() {
    // Fetch data from the provided API URL
    // For demonstration purposes, I'm using a placeholder API endpoint
    fetch(this.props.apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ tableData: data }))
      .catch((error) => console.error(error));
  }

  render() {
    const { tableHeaders } = this.props;

    return (
      <div>
        <h2>Common Table</h2>
        <table border="1">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map((row, index) => (
              <tr key={index}>
                {tableHeaders.map((header) => (
                  <td key={header}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CommonTable;
