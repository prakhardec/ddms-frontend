import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/loader";
import AppRoutes from "./routes/app-routes";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/login");
    }
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading && (
        <div
          className="d-flex align-items-center justify-content-center h-100 position-absolute w-100 bg-light"
          style={{
            zIndex: 9999,
          }}
        >
          <Loader />
        </div>
      )}
      <div className="App container">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
