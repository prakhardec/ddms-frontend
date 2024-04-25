import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { USER_MEGS } from "../utils/appUtils";

const Login = () => {
  const [showOtp] = useState(false);
  const [userMsg, setUserMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserMsg(null);
    var formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/user/login", {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "content-type": "application/json",
          "sec-ch-ua":
            '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
        referrer: "http://localhost:4200/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify({
          email,
          password,
          ip_address: "202.142.121.161",
        }),
        method: "POST",
        mode: "cors",
        credentials: "omit",
      });

      const jsonRes = await res.json();

      if (jsonRes?.status === 200) {
        localStorage.setItem("token", jsonRes?.token);
        history.push("/");
      } else if (jsonRes?.status === 400) {
        setUserMsg(USER_MEGS.WRONG_EMAIL_PASSWORD);
        setLoading(false);
      }
    } catch (err) {
      console.log(err?.code, err);
      if (err?.code === "auth/wrong-password") {
        setUserMsg(USER_MEGS.WRONG_EMAIL_PASSWORD);
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-9 col-md-4 mx-auto my-4">
          <h4 className="text-center mb-3">DDMS</h4>
          <p className="text-center mb-3">Sign in to start your session</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">Email</label>
              <input
                disabled={loading}
                required
                type="email"
                name="email"
                className="form-control shadow-none"
                readOnly={loading}
              />
            </div>
            <div className={`mb-${showOtp ? "4" : "1"}`}>
              <label className="form-label">Password</label>
              <input
                disabled={loading}
                required
                type="password"
                name="password"
                className="form-control shadow-none"
                readOnly={loading}
              />
            </div>

            <p
              style={{
                visibility: userMsg ? "visible" : "hidden",
              }}
              className={`m-0 text-${
                userMsg?.success ? "success" : "danger"
              } mb-2`}
            >
              {userMsg ? userMsg?.msg : "Hello"}
            </p>
            <button
              disabled={loading}
              type="submit"
              className="btn w-100 btn-outline-primary shadow-none"
            >
              {loading ? (
                <>
                  <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Loading...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="d-flex mt-3 justify-content-between">
            <Link className="fw-500" to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
