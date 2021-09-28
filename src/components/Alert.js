import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert(false, "", "");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [msg]);
  return <div className={`alert ${type}`}>{msg}</div>;
};
export default Alert;
