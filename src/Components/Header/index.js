import React from "react";
import "./style.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Switch } from "@mui/material";

const Header = ({ isChecked, handleToggle, userType }) => {
  return (
    <header className="table-view-header">
      <div>
        <span>{userType.admin}</span>
        <Switch checked={isChecked} onChange={handleToggle} />
        <span>{userType.user}</span>
      </div>
      <LogoutIcon />
    </header>
  );
};

export default Header;
