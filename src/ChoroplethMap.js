import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import Jsondata from "./output.json";

const ChoroplethMap = ({ features }) => {
  const width = 1060;
  const height = 700;
  const standardScale = 2000;
  const datas = Jsondata;
  let now = [];
  now.push("10");

  const [Era, setEra] = useState(); //年代
  const projection = d3
    .geoMercator()
    .scale(standardScale)
    .center([129.69167, 40.68944]);
  const path = d3.geoPath().projection(projection);

  const color = d3
    .scaleLinear()
    .domain(d3.extent(features, (feature) => feature.properties.value))

    .range(["#ccc", "#f00"]);
  const calcR = (weight) => {
    if (isNaN(Number(weight))) {
      return "10";
    }
<<<<<<< HEAD
    if (weight <= 0.5) {
      return "5";
    } else if (weight < 1) {
      return "15";
=======
    if(weight <= 0.5){
      return "5"
    }else if(weight <= 1){
      return "15"
>>>>>>> 8291364902c407aa14a79542ee4adc33597b40a2
    }
    return "30";
  };

  const getColor = (data) => {
    let index = data.年月日.indexOf("/");
    let year = Number(data.年月日.slice(0, index));

    if (year > 2000) {
      return "black";
    } else if (year >= 1900) {
      return "#ffff00";
    } else if (year >= 1800) {
      return "#00ff00";
    } else {
      return "#00ffff";
    }
  };

  const circleStyle = {
    stroke: "black",
    strokeWidth: "0.5px",
    opacity: "0.8",
  };
  const stroke = {
    stroke: "black",
    strokeWidth: "0.5px",
  };

  return (
    <body>
      {/* <EraBox></EraBox> */}

      <svg width={width} height={height}>
        <g>
          {features.map((feature, i) => (
            <path key={i} d={path(feature)} fill="#008000" stroke="white" />
          ))}

          {datas.map((data, i) => {
            const x = projection([data.経度, data.緯度])[0];
            const y = projection([data.経度, data.緯度])[1];
            console.log(datas.length);
            // if (now[0] === calcR(data["総重量 (kg)"])) {
            return (
              <circle
                cx={x}
                cy={y}
                r={calcR(data["総重量 (kg)"])}
                fill={getColor(data)}
                style={circleStyle}
              />
            );
            // }
          })}
          {datas.map((data) => {
            const x = projection([data.経度, data.緯度])[0];
            const y = projection([data.経度, data.緯度])[1];
            return <circle cx={x} cy={y} r="0.5" fill="black" />;
          })}
        </g>
      </svg>
    </body>
  );
};

const Erabox = (props) => {
  const change = (event) => {
    console.log(event.target.value);
    props.setI(event.target.value - 1);
  };
  return (
    <form>
      <div class="select">
        <select onChange={change}>
          <option value="0">----</option>
          <option value="1"></option>
          <option value="2">電子政府率の国際比較</option>
          <option value="3">行政のオンライン化状況</option>
          <option value="4">マイナンバーカード普及率</option>
        </select>
      </div>
    </form>
  );
};

export const ChoroplethMapPage = () => {
  const [features, setFeatures] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.PUBLIC_URL}/data/japan.json`);
      const data = await res.json();
      const { features } = topojson.feature(data, data.objects.japan);
      setFeatures(features);
    })();
  }, []);

  if (features == null) {
    return <p>loading</p>;
  }
  return <ChoroplethMap features={features} />;
};
