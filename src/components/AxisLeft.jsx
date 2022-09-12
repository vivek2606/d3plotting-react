import PropTypes from "prop-types";

export const AxisLeft = ({ yScale, dimensions }) =>
  yScale.ticks().map((tickValue) => (
    <g key={tickValue} transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={dimensions.boundedWidth} className="stroke-slate-300" />
      <text className="text-sm font-light" textAnchor="end" dy="0.32em" x={-5}>
        {tickValue}
      </text>
    </g>
  ));

AxisLeft.propTypes = {
  yScale: PropTypes.func,
  dimensions: PropTypes.object,
};
