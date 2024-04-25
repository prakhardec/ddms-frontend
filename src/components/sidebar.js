import React, { useState } from "react";

import "./NavigationBaar.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const NavigationBar = ({ data }) => {
  const [expand, setExpand] = useState(null);
  const history = useHistory();
  const [options] = useState([
    {
      heading: "Explorer",
      menu: data?.folders,
      iconClass: "bi-laptop",
    },
    {
      heading: "DDMS Drive",
      menu: data?.folders,
      iconClass: "bi-laptop",
    },
    {
      heading: "Search",
      menu: [],
      iconClass: "bi-search",
    },
    {
      heading: "Administration",
      menu: [],
      iconClass: "bi-person-fill",
    },
    {
      heading: "Reports",
      menu: [],
      iconClass: "bi-bar-chart-line-fill",
    },
    {
      heading: "Help",
      menu: [],
      iconClass: "bi-info-circle",
    },
  ]);
  return (
    <div className={`navigation-bar`}>
      <div className="expand-button">
        <span>Admin</span>
        <i class="bi bi-person-circle fs-24"></i>
      </div>

      {options?.map((opt, index) => (
        <div className="expand-button d-flex flex-column">
          <div
            className="d-flex flex-row w-100 pl-4 pointer"
            onClick={() => {
              setExpand(index === expand ? null : index);
            }}
          >
            <i class={`bi ${opt?.iconClass}`}></i>
            <span className="ml-4">{opt?.heading}</span>
            {opt?.menu?.length > 0 && <i class="bi bi-chevron-right ml-2"></i>}
          </div>

          <div className="menu-list flex-column">
            {expand === index &&
              opt?.menu?.map((folder) => (
                <div className="w-100 my-1">
                  <span className="ml-5 pl-3 my-1 text-left text-muted pointer">
                    {folder?.Uploaded_filename}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}
      <div className="expand-button d-flex flex-column">
        <div
          className="d-flex flex-row w-100 pl-4 pointer"
          onClick={() => {
            localStorage.clear("token");
            history.push("/login");
          }}
        >
          <i class="bi bi-box-arrow-left"></i>
          <span className="ml-4">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
