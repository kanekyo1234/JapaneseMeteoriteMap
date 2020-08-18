import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import Jsondata from "./output.json";

const ChoroplethMap = ({ features }) => {
  const width = 1060;
  const height = 700;

  const datas = Jsondata;

  const projection = d3.geoMercator().scale(2000).center([129.69167, 40.68944]);
  const path = d3.geoPath().projection(projection);
  const color = d3
    .scaleLinear()
    .domain(d3.extent(features, (feature) => feature.properties.value))
    .range(["#ccc", "#f00"]);
  const calcR = (weight) => {
    if (weight === 10) {
      return "10";
    }
    if (weight >= 100) {
      return "50";
    } else if (weight < 2) {
      return weight * 4;
    }
    return weight * 0.8;
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

  const stroke = {
    stroke: "black",
    strokeWidth: "0.5px",
  };

  for (let i = 0; i < datas.length; i++) {
    if (isNaN(Number(datas[i]["総重量 (kg)"]))) {
      datas[i]["総重量 (kg)"] = "10";
    }
  }

  return (
    <body>
      <div class="field">
        <div class="control">
          <div class="select is-primary">
            <select>
              <option>dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <div class="select is-primary">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>
      <p>dfghjkl</p>

      <svg width={width} height={height} style={stroke}>
        <g>
          {features.map((feature, i) => (
            <path key={i} d={path(feature)} fill="#008000" stroke="white" />
          ))}

          {datas.map((data, i) => {
            const x = projection([data.経度, data.緯度])[0];
            const y = projection([data.経度, data.緯度])[1];
            console.log(datas.length);
            return (
              <circle
                cx={x}
                cy={y}
                r={calcR(data["総重量 (kg)"])}
                fill={getColor(data)}
              />
            );
          })}
        </g>
      </svg>
    </body>
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

// import React, { useEffect, useState } from "react";
// import * as d3 from "d3";
// import * as topojson from "topojson";
// import Jsondata from "./output2.json";
// const ChoroplethMap = ({ features }) => {
//   const width = 1060;
//   const height = 700;
//   // const width = 960;
//   // const height = 500;
//   console.log(features);
//   const datas = Jsondata;

//   console.log(datas);

//   const projection = d3.geoMercator().scale(2000).center([129.69167, 40.68944]);
//   const path = d3.geoPath().projection(projection);

//   const color = d3
//     .scaleLinear()
//     .domain(d3.extent(features, (feature) => feature.properties.value))
//     .range(["#ccc", "#f00"]);

//   datas.map((datas, i) => console.log(datas.経度));

//   return (
//     <svg width={width} height={height}>
//       <g>
//         {features.map((feature, i) => (
//           <path
//             key={i}
//             d={path(feature)}
//             fill={color(feature.properties.value)}
//             stroke="white"
//           />
//         ))}
//         {datas.map((datas, i) => (
//           <circle cx={datas.経度} cy={height / 4 + datas.緯度} r={String(i)} />
//         ))}
//       </g>
//     </svg>
//   );
// };

// // const Dataputout = (features) => {
// //   const datas = useState(null);
// //   useEffect(() => {
// //     console.log("sdfghj");
// //     (async () => {
// //       const res = await fetch(`${process.env.PUBLIC_URL}/data/output.json`);
// //       datas = "#$%&'(";
// //       console.log(res);
// //     })();
// //   }, []);
// //   return <ChoroplethMap feature={features} data={datas} />;
// // };

// export const ChoroplethMapPage = () => {
//   const [features, setFeatures] = useState(null);

//   useEffect(() => {
//     console.log("DFGHJKL");
//     (async () => {
//       const res1 = await fetch(`${process.env.PUBLIC_URL}/data/japan.json`);

//       const data1 = await res1.json();
//       const { features } = topojson.feature(data1, data1.objects.japan);
//       setFeatures(features);
//     })();
//   }, []);
//   if (features == null) {
//     return <p>loading</p>;
//   }
//   return <ChoroplethMap features={features} />;
// };
