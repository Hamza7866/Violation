import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

const Newyork = () => {
  const [dataCar, setDataCar] = useState([]);

  const inputRef = useRef(null);

  const handleClick = () => {
    getNewYork(inputRef.current.value);
  };
  const getNewYork = async (query) => {
    try {
      const res = await axios.get(
        `https://data.cityofnewyork.us/resource/nc67-uf89.json?plate=${query}`
      );
      const { data } = res;

      setDataCar(data);
    } catch (err) {}
  };
  useEffect(() => {
    getNewYork();
  }, []);
  return (
    <div className="container">
      <h1>New York Violation</h1>
      <p className="type">Please type in uppercase letter</p>
      <div className="main">
        <input type="text" placeholder="Search plate..." ref={inputRef} />
        <button onClick={handleClick}>Search</button>
      </div>
      {dataCar.map((car, index) => {
        return (
          <div key={index}>
            <div className="card">
              <h2>Plate Number: {car.plate}</h2>
              <p>Fine: ${car.fine_amount}</p>
              <p>Fine Amount Due: {car.amount_due}</p>
              <p>Violation Type: {car.violation}</p>
              <p>Violation Date:{car.issue_date}</p>
              <p>Violation Time:{car.violation_time}</p>
              <a href={car.summons_image.url} target="_blank" rel="noreferrer">
                Check Violation
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Newyork;
