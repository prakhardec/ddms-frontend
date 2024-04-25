import Spinner from "../assets/svgs/spinner.svg";

const Loader = ({ size = 85 }) => {
  return <img width={size} alt="loader" height={size} src={Spinner} />;
};

export default Loader;
