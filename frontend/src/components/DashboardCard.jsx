import React from "react";
import "./DashboardCard.css";

const DashboardCard = ({ title, value, color }) => {
  return (
    <div className="card" style={{ borderTop: `5px solid ${color}` }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default DashboardCard;
