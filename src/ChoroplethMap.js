import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import Jsondata from "./output.json";

const ChoroplethMap = ({ features }) => {
  const width = 1060;
  const height = 700;
  // var browserWidth = $(window).width();
  const datas = Jsondata;
  let now = [];
  now.push("10");

  const [Era, setEra] = useState(); //年代
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
      {/* <EraBox></EraBox> */}
      <svg width={width} height={height} style={stroke}>
        <g>
          {features.map((feature, i) => (
            <path key={i} d={path(feature)} fill="#008000" stroke="white" />
          ))}

          {datas.map((data, i) => {
            const x = projection([data.経度, data.緯度])[0];
            const y = projection([data.経度, data.緯度])[1];
            console.log(datas.length);
            console.log(now[0]);
            console.log(calcR(data["総重量 (kg)"]));
            if (now[0] === calcR(data["総重量 (kg)"])) {
              return (
                <circle
                  cx={x}
                  cy={y}
                  r={calcR(data["総重量 (kg)"])}
                  fill={getColor(data)}
                />
              );
            }
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

// const Setumei = () => {
//   return (
//     <body>
//       <div>
//         <article class="message is-dark">
//           <div className="container">
//             <section className="section">
//               <div class="message-header">
//                 <p>隕石ページの描画</p>
//               </div>
//               <div class="message-body">
//                 過去861年から現在に至るまでの日本に落ちた隕石の位置を描画している.隕石一つ一つのデータがjsonファイルに格納されており,内訳は
//                 <strong>
//                   名前,落下場所,年月日,種類,総重量 (kg),個数,緯度,経度
//                 </strong>
//                 である.その中で使用するデータは
//                 <div class="content">
//                   <ol type="1">
//                     <li>年</li>
//                     <li>総重量</li>
//                     <li>緯度</li>
//                     <li>経度</li>
//                   </ol>
//                 </div>
//                 の四つである.それぞれどのように反映させているかというと,年のデータでまとまった年代ごとの色分けを行う.緯度,経度の数値を日本地図上に反映し,隕石が落ちた場所を円の中心とするようにする.日本地図がすでに実際の緯度経度が反映されて描かれているので位置は正確に描画される.そして円の大きさを総重量の値によって決める.
//               </div>
//             </section>
//           </div>
//         </article>

//         <article class="message is-link">
//           <div class="message-header">
//             <p>可視化の目的</p>
//           </div>
//           <div class="message-body">この可視化は日本のどこに隕石が落ち</div>
//         </article>
//       </div>
//       <div class="field">
//         <div class="control">
//           <div class="select is-primary">
//             <select>
//               <option>dropdown</option>
//               <option>With options</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div class="field">
//         <div class="control">
//           <div class="select is-primary">
//             <select>
//               <option>Select dropdown</option>
//               <option>With options</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </body>
//   );
// };

const Select = (props) => {
  const change = (event) => {
    console.log(event.target.value);
    props.setI(event.target.value - 1);
  };
  return (
    <form>
      <div class="select">
        <select onChange={change}>
          <option value="0">----</option>
          <option value="1">インターネット普及率</option>
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
