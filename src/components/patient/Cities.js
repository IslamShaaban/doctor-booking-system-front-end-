import { event } from "jquery";
import React, { useState, useEffect } from "react";
import { Select } from "semantic-ui-react";

// const cities = [{ key: "dd", value: "dd", text: "AL Buheira" }];

const Cities = ({sendCityIDToParent,t}) => {
  
  var _data;
  const [cities, setData] = useState([]);
  const [districts, setDistricts] = useState([]);

  const onChangeHandler = (e, data) => {
    console.log(data.value);
    getDistrictsAPI(data.value).then(users => {
      sendCityIDToParent(data.value,users);
    });;
    
    // sendDistrictsToParent(districts);
  };
  useEffect(() => {
    getCitiesAPI();
  }, []);

  function getCitiesAPI() {
    fetch(`http://127.0.0.1:8000/api/cities/70`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Res => ", res);

        var cities = [
          { key: "cit", value: "null", text: "City" },
        ];
        let _cities = res.map((city) => {
          return {
            key: city["id"],
            value: city["id"],
            text: city["name_en"],
          };
        });
        _cities.forEach((i) => cities.push(i));
        setData(cities);
      })

      .catch((error) => {
        console.log(error);
      });
  }

   function getDistrictsAPI(cityID) {
    return fetch(`http://127.0.0.1:8000/api/districts/${cityID}`)
      .then((response) => response.json())
      .then((res) => {
        console.log("Res => ", res);
        
        var districts = [
          { key: "dis", value: "null", text: "District" },
        ];
        
        let _districts = res.map((district) => {
          return {
            key: district["id"],
            value: district["id"],
            text: district["name_en"],
          };
        });
        
        _districts.forEach((i) => districts.push(i));
        return districts;
      })

      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Select
      placeholder={t('Cities.cityName')}
      style={{ border: "none" }}
      options={cities}
      onChange={onChangeHandler}
    />
  );
};

export default Cities;
