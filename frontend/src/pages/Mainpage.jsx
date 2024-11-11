import React from "react";
import "./css/Mainpage.css"
import MpHeader from "../components/Mainpage/Mpheader/Mpheader";
import Mpupper from "../components/Mainpage/Mpupper/Mpupper";
import AlimList from "../components/Mainpage/AlimList/AlimList";
import Footer from "../components/Layout/Footer/Footer";

const Mainpage = () => {
  
  return (
    <React.Fragment>
      <div className="Mpheader-app">
        <MpHeader />  
         <AlimList /> 
         <Footer/>
      </div>
      <div className="Mpbackground-app"></div>
      <div className="Mpbackground-mask-app"></div>
      <Mpupper />
    </React.Fragment>
  );
}

export default Mainpage