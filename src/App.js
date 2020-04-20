import React, { useState, useEffect } from "react";
import { csv } from "d3";
import csv_file from "./example_profile.csv";
import { BarChart } from "reaviz";

const Plot = () => {
  const [data, setData] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [value, setValue] = useState("maxTimeTotal");
  // here you must add the callback in another function
  useEffect(() => {
    csv(csv_file).then((dt) => {
      let dat = dt;
      console.log(dat[0]);
      dat = dat.slice(0, 10).map((obj) => {
        return { key: obj.routine, data: parseInt(obj[value]) };
      });
      console.log(dat);
      setSelectOptions(Object.keys(dt[0]));
      setData(dat);
      console.log(Object.keys(dt[0]));
    });
  }, [value]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
        width: "100%",
        paddingRight: "30%",
        flexWrap: "wrap",
      }}
    >
      <BarChart width={500} height={500} data={data} />
      <div>
        <select
          id="discriminator"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          {selectOptions.map(
            (e) => e !== "routine" && <option value={e}> {e} </option>
          )}
        </select>
      </div>
    </div>
  );
};

const Modal = () => {
  const [values, setValues] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [inputValStates, setInputValStates] = useState([]);
  useEffect(() => {
    csv(csv_file).then((dt) => {
      let dat = dt;
      dat = dat.slice(0, 500).map((obj) => {
        return obj.routine;
      });
      setValues(dat);
      console.log(dat);
    });
  }, []);
  return (
    <>
      <button
        type="button"
        class="btn btn-lg"
        data-toggle="modal"
        data-target="#myModal"
      >
        Add new plot
      </button>

      <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
              <h4 class="modal-title">
                Select the elemnts that you want to display in the chart{" "}
              </h4>
            </div>
            <div class="modal-body">
              <div>
                {inputValStates.map((e) => (
                  <div> {e} </div>
                ))}
              </div>
              <input
                list="ss"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <datalist id="ss">
                {values.map((e) => (
                  <option id={e} value={e} />
                ))}
              </datalist>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
              >
                Add
              </button>
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <div class="container">
      <Plot />

      <Modal />
    </div>
  );
}

export default App;
