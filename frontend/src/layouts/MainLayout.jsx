import React from 'react'
import Proptypes from "prop-types";

const MainLayout = ({ children }) => {
  
    return (
      
      <div className="main-layout">
        {children}
      </div>
    );
  };

export default MainLayout;

MainLayout.propTypes = {
    children: Proptypes.node,
  };
