import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import dashboard from "../../media/icon/dashboard.png";
import settings from "../../media/icon/settings.png";
import report from "../../media/icon/business-report.png";
import merchant from "../../media/icon/merchant.png";
import settelment from "../../media/icon/key.png";
import api from "../../media/icon/work-plan.png";
import gateway from "../../media/icon/secure-payment.png";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: null,
    };
  }

  handleCategoryClick = (category) => {
    this.setState((prevState) => ({
      activeCategory: prevState.activeCategory === category ? null : category,
    }));
  };

  renderSubOptions = (subOptions) => {
    const { activeCategory } = this.state;

    return (
      subOptions &&
      subOptions.length > 0 &&
      activeCategory && (
        <ul className="sub-options">
          {subOptions.map((option, index) => (
            <li key={index}>
              <NavLink
                to={option.link}
                onClick={this.closeSidebar}
                activeClassName="active"
              >
                {option.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )
    );
  };

  render() {
    const { activeCategory } = this.state;

    const categories = [
      {
        label: "Dashboard",
        link: "/dashboard",
        image: dashboard,
      },
      {
        label: "Master Setting",
        image: settings,
        subOptions: [
          { label: "Business Type", link: "/businesstype", icon: "industry" },
          { label: "Categories", link: "/categories" },
          { label: "Business Subcategories", link: "/businessSubcategories" },
          { label: "Manage Currencies", link: "/managecurrencies" },
          { label: "Document Type", link: "/documenttypes" },
          { label: "Document Categories", link: "/documentcategories" },
          { label: "Bank", link: "/banks" },
        ],
      },
      {
        label: "Reports",
        image: report,
        subOptions: [
          { label: "Transaction Report", link: "/transactionreport" },
          { label: "Temp Report", link: "/" },
          { label: "Temp Unique Order Report", link: "/" },
          { label: "Temp Common Order Report", link: "/" },
          { label: "Payout Report", link: "/" },
          { label: "Compare", link: "/" },
        ],
      },
      {
        label: "Manage Merchant",
        image: merchant,
        subOptions: [
          { label: "Add Merchant", link: "/" },
          { label: "All Merchant", link: "/" },
        ],
      },
      {
        label: "Settelments",
        link: "/",
        image: settelment,
      },
      {
        label: "API Documentation",
        link: "/",
        image: api,
      },
      {
        label: "Payment Gateway",
        link: "/paymentgateway",
        image: gateway,
      },
    ];

    return (
      <div className="sidebar">
        {/* <div className="menu">Menu</div> */}
        <div className="dropdown">
          {categories &&
            categories.map((category, index) => (
              <div key={index}>
                {category.link ? (
                  <Link to={category.link}>
                    <div
                      className={`dropbtn ${
                        activeCategory === category.label ? "active" : ""
                      }`}
                      onClick={() => this.handleCategoryClick(category.label)}
                    >
                      <img src={category.image} /> {category.label}
                    </div>
                  </Link>
                ) : (
                  <div
                    className={`dropbtn ${
                      activeCategory === category.label ? "active" : ""
                    }`}
                    onClick={() => this.handleCategoryClick(category.label)}
                  >
                    <img src={category.image} /> {category.label}
                  </div>
                )}
                {activeCategory === category.label &&
                  this.renderSubOptions(category.subOptions)}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Sidebar;
