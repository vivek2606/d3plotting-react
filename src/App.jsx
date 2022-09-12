import LineChart from "./components/LineChart";
import { useData } from "./useData";
import PropTypes from "prop-types";

const App = () => {
  const data = useData();
  return (
    <>
      <div className="text-4xl font-bold text-center bg-teal-400 p-7 text-white drop-shadow-lg">
        My Charting Library
      </div>
      <LineChart data={data} />
    </>
  );
};
export default App;

App.propTypes = {
  data: PropTypes.array,
};
