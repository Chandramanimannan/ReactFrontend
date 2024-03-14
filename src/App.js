import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* --------------------------- CSS File import---------------------------------- */

import "./assets/style/main.css";

/* ---------------------------Screens import----------------------------------- */
import Dashboard from "./assets/pages/screen/Dashboard";
import Login from "./assets/pages/screen/Login";
import Signup from "./assets/pages/screen/Signup";
import ErrorPage from "./assets/pages/screen/ErrorPage";
import BusinessTypes from "./assets/pages/screen/Y1BusinessTypes";
import Categories from "./assets/pages/screen/Y2Categories";
import BusinessSubcategories from "./assets/pages/screen/Y3BusinessSubcategories";
import ManageCurrencies from "./assets/pages/screen/Y4ManageCurrencies";
import DocumentTypes from "./assets/pages/screen/Y5DocumentTypes";
import DocumentCategories from "./assets/pages/screen/Y6DocumentCategories";
import Banks from "./assets/pages/screen/Y7Banks";
import TransactionReport from "./assets/pages/screen/Y8TransactionReports";
import CheckSettlement from "./assets/pages/screen/Y15CheckSettlement";
import CreateSettlement from "./assets/pages/screen/Y16CreateSettlement";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<ErrorPage />} />

          <Route path="/businesstypes" element={<BusinessTypes />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/businesssubcategories"
            element={<BusinessSubcategories />}
          />
          <Route path="/managecurrencies" element={<ManageCurrencies />} />
          <Route path="/documenttypes" element={<DocumentTypes />} />
          <Route path="/documentcategories" element={<DocumentCategories />} />
          <Route path="/banks" element={<Banks />} />
          <Route path="/checksettlement" element={<CheckSettlement />} />
          <Route
            path="/createsettlement/:company_name"
            element={<CreateSettlement />}
          />
          <Route path="/transactionreport" element={<TransactionReport />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
