import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import Jsondata from "./output.json";

const ChoroplethMap = ({ features }) => {
  const width = 1060;
  const height = 800;
  const standardScale = 2000;
  const datas = Jsondata;
  let nowEra = ["#00ffff", "#00ff00", "#ffff00", "red", "0"];
  let nowWeight = ["10", "20", "30", "?", "0"];
  let now = ["1", "2"];
  const [Era, setEra] = useState(4); //年代
  const [Weight, setWeight] = useState(4); //総重量
  const [Now, setNow] = useState(1); //総重量
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
      return "?";
    }
    if (weight <= 0.5) {
      return "10";
    } else if (weight <= 1) {
      return "20";
    }
    return "30";
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

              <NowBox setNow={(Now, setNow)} />
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
                  if (now[Now] === "1") {
                    //ここら辺は選択肢の条件付け
                    //または

                    if (
                      nowWeight[Weight] === calcR(data["総重量 (kg)"]) ||
                      nowWeight[Weight] === "0" ||
                      nowEra[Era] === getColor(data) ||
                      nowEra[Era] === "0"
                    ) {
                      if (calcR(data["総重量 (kg)"]) === "?") {
                        return (
                          <rect
                            x={x - 10}
                            y={y - 10}
                            width="20"
                            height="20"
                            fill={getColor(data)}
                            style={circleStyle}
                          />
                        );
                      } else {
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
                    }
                  } else {
                    if (
                      (nowWeight[Weight] === calcR(data["総重量 (kg)"]) ||
                        nowWeight[Weight] === "0") &&
                      (nowEra[Era] === getColor(data) || nowEra[Era] === "0")
                    ) {
                      if (calcR(data["総重量 (kg)"]) === "?") {
                        return (
                          <rect
                            x={x - 10}
                            y={y - 10}
                            width="20"
                            height="20"
                            fill={getColor(data)}
                            style={circleStyle}
                          />
                        );
                      } else {
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
                    }
                  }
                })}
                {datas.map((data) => {
                  const x = projection([data.経度, data.緯度])[0];
                  const y = projection([data.経度, data.緯度])[1];
                  if (now[Now] === "1") {
                    //または

                    if (
                      nowWeight[Weight] === calcR(data["総重量 (kg)"]) ||
                      nowWeight[Weight] === "0" ||
                      nowEra[Era] === getColor(data) ||
                      nowEra[Era] === "0"
                    ) {
                      return <circle cx={x} cy={y} r="0.5" fill="black" />;
                    }
                  } else {
                    //または

                    if (
                      (nowWeight[Weight] === calcR(data["総重量 (kg)"]) ||
                        nowWeight[Weight] === "0") &&
                      (nowEra[Era] === getColor(data) || nowEra[Era] === "0")
                    ) {
                      return <circle cx={x} cy={y} r="0.5" fill="black" />;
                    }
                  }
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
    props.setEra(event.target.value);
  };
  return (
    <div class="field">
      <form>
        <div class="select is-rounded">
          <select onChange={change}>
            <option value="4">年代の選択</option>
            <option value="0"> ~1800</option>
            <option value="1">1800~1900</option>
            <option value="2">1900~2000</option>
            <option value="3">2000~</option>
          </select>
        </div>
      </form>
    </div>
  );
};
const NowBox = (props) => {
  console.log(props);
  const change = (event) => {
    props.setNow(event.target.value);
  };
  return (
    <div class="field">
      <form>
        <div class="select is-rounded">
          <select onChange={change}>
            <option value="1">かつ</option>
            <option value="0">または</option>
          </select>
        </div>
      </form>
    </div>
  );
};

const WeightBox = (data) => {
  const change = (event) => {
    data.setWeight(event.target.value);
  };
  return (
    <div class="field">
      <form>
        <div class="select is-rounded">
          <select onChange={change}>
            <option value="4">総重量の選択</option>
            <option value="0"> ~0.5Kg</option>
            <option value="1">0.5~1.0kg</option>
            <option value="2">1kg~</option>
            <option value="3">???</option>
          </select>
        </div>
      </form>
    </div>
  );
};

const Circle = () => {
  const width = 800;
  const height = 200;
  return (
    <svg width={width} height={height}>
      <g transform="translate(50, 0)">
        <text x="0" y="85" fontSize="20" textAnchor="middle">
          落ちた年
        </text>
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
      <g transform="translate(50, 50)">
        <text x="0" y="85" fontSize="20" textAnchor="middle">
          総重量
        </text>
        <circle cx="70" cy="80" r="10" opacity="0.8" />
        <text x="120" y="85" fontSize="20" textAnchor="middle">
          :~0.5Kg
        </text>
        <circle cx="190" cy="80" r="20" opacity="0.8" />
        <text x="260" y="85" fontSize="20" textAnchor="middle">
          :0.5~ 1Kg
        </text>
        <circle cx="352" cy="80" r="30" opacity="0.8" />
        <text x="420" y="85" fontSize="20" textAnchor="middle">
          :1Kg~
        </text>
        <rect x="470" y="70" width="20" height="20" />
        <text x="530" y="85" fontSize="20" textAnchor="middle">
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
