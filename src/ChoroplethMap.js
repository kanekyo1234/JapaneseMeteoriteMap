import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import Jsondata from "./output.json";

const ChoroplethMap = ({ features }) => {
  const width = 1060;
  const height = 800;
  const standardScale = 2000;
  const datas = Jsondata;
  let now = ["10", "20", "25", "15", "0"];
  const [Era, setEra] = useState(); //年代
  const [Weight, setWeight] = useState(4); //年代
  const projection = d3
    .geoMercator()
    .scale(standardScale)
    .center([139.69167, 42.68944]);
  const path = d3.geoPath().projection(projection);

  const color = d3
    .scaleLinear()
    .domain(d3.extent(features, (feature) => feature.properties.value))

    .range(["#ccc", "#f00"]);
  const calcR = (weight) => {
    if (isNaN(Number(weight))) {
      return "15";
    }
    if (weight <= 0.5) {
      return "10";
    } else if (weight <= 1) {
      return "20";
    }
    return "25";
  };

  const getColor = (data) => {
    let index = data.年月日.indexOf("/");
    let year = Number(data.年月日.slice(0, index));

    if (year > 2000) {
      return "red";
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
      <div className="container">
        <div className="columns">
          <div className="column  is-one-fifth">
            <section className="section">
              <Circle />
              <EraBox setEra={(Era, setEra)} />
              <WeightBox setWeight={(Weight, setWeight)} />
            </section>
          </div>
          <div className="column">
            <svg width={width} height={height}>
              <g>
                {features.map((feature, i) => (
                  <path
                    key={i}
                    d={path(feature)}
                    fill="#008000"
                    stroke="white"
                  />
                ))}

                {datas.map((data, i) => {
                  const x = projection([data.経度, data.緯度])[0];
                  const y = projection([data.経度, data.緯度])[1];
                  console.log(datas.length);
                  if (now[Weight] === "0") {
                    return (
                      <circle
                        cx={x}
                        cy={y}
                        r={calcR(data["総重量 (kg)"])}
                        fill={getColor(data)}
                        style={circleStyle}
                      />
                    );
                  }
                  if (now[Weight] === calcR(data["総重量 (kg)"])) {
                    return (
                      <circle
                        cx={x}
                        cy={y}
                        r={calcR(data["総重量 (kg)"])}
                        fill={getColor(data)}
                        style={circleStyle}
                      />
                    );
                  }
                })}
                {datas.map((data) => {
                  const x = projection([data.経度, data.緯度])[0];
                  const y = projection([data.経度, data.緯度])[1];
                  return <circle cx={x} cy={y} r="0.5" fill="black" />;
                })}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </body>
  );
};

const EraBox = (props) => {
  console.log(props);
  const change = (event) => {
    console.log(event.target.value);
    props.setEra(event.target.value);
  };
  return (
    <form>
      <div class="select">
        <select onChange={change}>
          <option value="5"></option>
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
        </select>
      </div>
    </form>
  );
};

const WeightBox = (props) => {
  const change = (event) => {
    console.log(props);
    console.log(event.target.value);
    props.setWeight(event.target.value);
  };
  return (
    <form>
      <div class="select">
        <select onChange={change}>
          <option value="4">総重量の選択</option>
          <option value="0">~0.5Kg</option>
          <option value="1">0.5kg~1.0kg</option>
          <option value="2">1kg~</option>
          <option value="3">???</option>
        </select>
      </div>
    </form>
  );
};

const Circle = () => {
  const width = 800;
  const height = 200;
  return (
    <svg width={width} height={height}>
      <g transform="translate(0, 0)">
        <circle cx="70" cy="80" r="10" fill="#00FFFF" opacity="0.8" />
        <text x="120" y="85" fontSize="20" textAnchor="middle">
          :~1800
        </text>
        <circle cx="180" cy="80" r="10" fill="#00FF00" opacity="0.8" />
        <text x="250" y="85" fontSize="20" textAnchor="middle">
          :1800~1900
        </text>
        <circle cx="330" cy="80" r="10" fill="#FFFF00" opacity="0.8" />
        <text x="400" y="85" fontSize="20" textAnchor="middle">
          :1900~2000
        </text>
        <circle cx="480" cy="80" r="10" fill="red" opacity="0.8" />
        <text x="530" y="85" fontSize="20" textAnchor="middle">
          :2000~
        </text>
      </g>
      <g transform="translate(0, 50)">
        <circle cx="70" cy="80" r="10" opacity="0.8" />
        <text x="120" y="85" fontSize="20" textAnchor="middle">
          :~0.5Kg
        </text>
        <circle cx="180" cy="80" r="20" opacity="0.8" />
        <text x="250" y="85" fontSize="20" textAnchor="middle">
          :0.5Kg~ 1Kg
        </text>
        <circle cx="350" cy="80" r="25" opacity="0.8" />
        <text x="420" y="85" fontSize="20" textAnchor="middle">
          :1Kg~
        </text>
        <circle cx="480" cy="80" r="15" opacity="0.8" />
        <text x="520" y="85" fontSize="20" textAnchor="middle">
          :　???
        </text>
      </g>
    </svg>
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
