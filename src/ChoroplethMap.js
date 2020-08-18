import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import Jsondata from "./output.json"

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
    if(weight === 10){
      return "10"
    }
    if(weight >= 100){
      return "50"
    }else if(weight < 2){
      return weight*4
    }
    return weight*0.8
  }

  const getColor = (data) => {
    let index =  data.年月日.indexOf("/");
    let year = Number(data.年月日.slice(0,index))

    if(year > 2000 ){
      return "black";
    }else if(year >= 1900){
      return "#ffff00"
    }else if(year >= 1800){
      return "#00ff00"
    }else{
      return "#00ffff"
    }
  }

  const stroke = {
    stroke : "black",
    strokeWidth: "0.5px"
  }

  for(let i = 0; i < datas.length; i++){
    if(isNaN(Number(datas[i]["総重量 (kg)"]))){
      datas[i]["総重量 (kg)"] = "10"
    }
  }

  return (
    <svg width={width} height={height} style={stroke}>
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
            <circle cx={x} cy={y} r={calcR(data["総重量 (kg)"])} fill={getColor(data)}/>)
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
