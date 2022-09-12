import * as d3 from "d3";
import PropTypes from "prop-types";

export const AxisBottom = ({ xScale, dimensions, tickFormat }) =>
  xScale.ticks(d3.timeMonth).map((tickValue) => (
    <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={dimensions.boundedHeight} className="stroke-slate-300" />
      <text
        className="text-sm font-light"
        y={dimensions.boundedHeight + 10}
        textAnchor="middle"
        dy="0.73em"
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));

AxisBottom.propTypes = {
  xScale: PropTypes.func,
  tickFormat: PropTypes.func,
  dimensions: PropTypes.object,
};
