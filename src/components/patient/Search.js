import React, { useState } from "react";
import Cities from "./Cities";
import Departments from "./Departments";
import Districts from "./Districts";
import OurSystem from "./OurSystem";
import { Link, Redirect } from "react-router-dom";
function Search({ sendDoctorDataParent, t }) {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [cityID, setCityID] = React.useState(null); // the lifted state
  const [districtID, setDistrictID] = React.useState(null); // the lifted state
  const [departmentID, setDepartmentID] = React.useState(null); // the lifted state
  const [doctorName, setDoctorName] = React.useState(null); // the lifted state

  const [searchParams, setSearchParams] = React.useState([]); // the lifted state

  const [doctorData, setDoctorData] = React.useState([]); // the lifted state

  const [_dis, setDistricts] = React.useState(null); // the lifted state
  const [redirect, setRedirect] = useState(false);

  const sendCityIDToParent = (index, data) => {
    // the callback. Use a better name
    console.log("Parent | setCityID => ", index);
    console.log("Parent | _districts => ", data);
    setCityID(index);
    setDistricts(data);
  };

  const sendDistrictIDToParent = (index) => {
    // the callback. Use a better name
    console.log("Parent | setDistrictID => ", index);
    setDistrictID(index);
  };

  const sendDepartmentIDToParent = (index) => {
    // the callback. Use a better name
    console.log("Parent | setDepartmentID => ", index);
    setDepartmentID(index);
  };

  const searchByName = (event) => {
    setDoctorName(event.target.value);
  };

  const handleSubmit = (event) => {
    let searchParam = [];
    searchParam["specialty"] = departmentID != null ? departmentID : null;
    searchParam["city"] = cityID != null ? cityID : null;
    searchParam["district"] = districtID != null ? districtID : null;
    searchParam["name"] = doctorName != null ? doctorName : null;

    console.log("searchParam => ", searchParam);

    search(searchParam);

    event.preventDefault();
  };

  const search = (key) => {
    fetch(
      `http://127.0.0.1:8000/api/search?name=${key["name"]}&specialty=${key["specialty"]}&city=${key["city"]}&district=${key["district"]}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("res from server => ", res);
        console.log("res from server - size => ", res.data.length);
        setRedirect(true);
        sendDoctorDataParent(res, key);
        setDoctorData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (redirect) {
    if(window.location.href.search("/home") > 0){
      
      console.log("Reloading ... ")
    }else{

      return <Redirect to="/home" />;
    }
  }
  return (
    <React.Fragment>
      <section className="container home-search home-page-search mb-5">
        <form action="#" method="get" className="search-box">
          <div className="row">
            <div className="select-form col-lg col-md-4 col-sm-12">
              <label>
                <i className="fa fa-search-location"></i> {t("Search.city")}
              </label>
              <div className="nice-select" tabIndex="0">
                <span className="current"></span>
                <Cities sendCityIDToParent={sendCityIDToParent} t={t} />
              </div>
            </div>
            <div className="select-form col-lg col-md-4 col-sm-12">
              <label>
                <i className="fa fa-search-location"></i> {t("Search.district")}
              </label>

              <div className="nice-select" tabIndex="0">
                <span className="current"></span>
                <Districts
                  _dis={_dis}
                  sendDistrictIDToParent={sendDistrictIDToParent}
                  t={t}
                />
              </div>
            </div>
            <div className="select-form col-lg col-md-4 col-sm-12">
              <label htmlFor="department">
                <i className="fa fa-list"></i> {t("Search.department")}
              </label>

              <div className="nice-select" tabIndex="0">
                <span className="current"></span>
                <Departments
                  sendDepartmentIDToParent={sendDepartmentIDToParent}
                  t={t}
                />
              </div>
            </div>
            <div className="input-form col-lg col-md-8 col-sm-10">
              <label>
                <i className="fa fa-user-md"></i> {t("Search.doctor")}
              </label>
              <input
                id="doctor"
                type="text"
                name="doctor"
                // placeholder={t('Search.doctorName')}
                placeholder={t("Search.doctorName")}
                onChange={searchByName}
              />
            </div>
            <button
              className="search-form col-lg-1 col-md-4 col-sm-2"
              type="submit"
              onClick={handleSubmit}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
}

export default Search;
