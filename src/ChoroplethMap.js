import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import Jsondata from "./output.json"

const ChoroplethMap = ({ features }) => {
  const width = 1060/2;
  const height = 700/2;
  const standardScale = 2000
  const datas = Jsondata;

  const projection = d3.geoMercator().scale(standardScale/4).center([179.69167, 25.68944]);
  const path = d3.geoPath().projection(projection);

  const color = d3
    .scaleLinear()
    .domain(d3.extent(features, (feature) => feature.properties.value))
    .range(["#ccc", "#f00"]);
  const calcR = (weight) => {
    if(isNaN(Number(weight))){
      return "10"
    }
    if(weight <= 0.5){
      return "5"
    }else if(weight < 1){
      return "15"
    }
    return "30"
  }

  const getColor = (data) => {  
    let index =  data.年月日.indexOf("/");
    let year = Number(data.年月日.slice(0,index))

    if(year > 2000 ){
      return "red";
    }else if(year >= 1900){
      return "#ffff00"
    }else if(year >= 1800){
      return "#00ff00"
    }else{
      return "#00ffff"
    }
  }

  const circleStyle = {
    stroke : "black",
    strokeWidth: "0.5px",
    opacity: "0.8"
  }

  return (
    <svg width={width} height={height} >
      <g>
        {features.map((feature, i) => (
          <path
            key={i}
            d={path(feature)}
            fill="#008000"
            stroke="white"
          />
        ))}
        
        {datas.map((data,i) => {
          const x = projection([data.経度,data.緯度])[0];
          const y = projection([data.経度,data.緯度])[1];
          console.log(datas.length)
          return (
            <circle cx={x} cy={y} r={calcR(data["総重量 (kg)"])/4} fill={getColor(data)} style={circleStyle}/>
          )
        })}
        {datas.map((data) => {
          const x = projection([data.経度,data.緯度])[0];
          const y = projection([data.経度,data.緯度])[1];
          return (
            <circle cx={x} cy={y} r="0.5" fill="black"/>
          )
        })}
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
