import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";

const ChoroplethMap = ({ features }) => {
  console.log("WSDFGHJ");
  const width = 960;
  const height = 500;

  const projection = d3.geoMercator().scale(1000).center([139.69167, 35.68944]);
  const path = d3.geoPath().projection(projection);

  const color = d3
    .scaleLinear()
    .domain(d3.extent(features, (feature) => feature.properties.value))
    .range(["#ccc", "#33CC66"]);
  console.log("DFGH");
  return (
    <svg width={width} height={height}>
      <g>
        {features.map((feature, i) => (
          <path
            key={i}
            d={path(feature)}
            fill={color(5000)}
            stroke="white"
          />
        ))}
      </g>
    </svg>
  );
};

export const ChoroplethMapPage = () => {
  const [features, setFeatures] = useState(null);
  useEffect(() => {
    console.log("DFGHJKL");
    (async () => {
      const res = await fetch(`${process.env.PUBLIC_URL}/data/japan.json`);
      const data = await res.json();
      const { features } = topojson.feature(data, data.objects.japan);
      setFeatures(features);
    })();
  }, []);
  console.log(features);

  if (features == null) {
    return <p>loading</p>;
  }
  return <ChoroplethMap features={features} />;
};

export default ChoroplethMap;