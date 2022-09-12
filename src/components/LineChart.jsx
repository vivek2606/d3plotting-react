import * as d3 from "d3";
import { curveNatural } from "d3";
import { useState, useEffect } from "react";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import PropTypes from "prop-types";

const LineChart = ({ data }) => {
  //Accessor Functions
  const yAccessor = (d) => d.temperatureMax;
  const dateParser = d3.timeParse("%Y-%m-%d");
  const xAccessor = (d) => dateParser(d.date);
  const dimensions = {
    width: window.innerWidth * 0.8,
    height: 400,
    margin: {
      top: 15,
      right: 25,
      bottom: 40,
      left: 60,
    },
  };
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  const tickFormat = d3.timeFormat("%b'%y");

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();
  const freezingTempPlacement = yScale(32);
  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)))
    .curve(curveNatural);

  if (!data) {
    return <div className="font-semibold px-5 text-xl">Loading....</div>;
  }
  return (
    <div className="grid grid-cols-1 place-items-center">
      <div className="text-gray-400 py-5 font-bold text-2xl">Line Chart</div>
      <svg width={dimensions.width} height={dimensions.height}>
        <g
          transform={`translate(${dimensions.margin.left},${dimensions.margin.top})`}
        >
          <rect
            className="fill-green-100"
            x="0"
            width={dimensions.boundedWidth}
            height={dimensions.boundedHeight - freezingTempPlacement}
            y={freezingTempPlacement}
          />
          <path
            className="fill-transparent stroke-red-400 stroke-2"
            strokeLinejoin="round"
            strokeLinecap="round"
            d={lineGenerator(data)}
          />

          <AxisBottom
            xScale={xScale}
            dimensions={dimensions}
            tickFormat={tickFormat}
          />
          <AxisLeft yScale={yScale} dimensions={dimensions} />
          <text
            className="fill-gray-600 font-semibold text-lg"
            x={dimensions.boundedWidth / 2}
            y={dimensions.boundedHeight + 40}
            textAnchor="middle"
          >
            ---- Months ----
          </text>
        </g>
      </svg>
    </div>
  );
};

export default LineChart;

LineChart.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
