import "./Mpupper.css";
import { Link } from "react-router-dom";
const Mpupper = () => {
  return (
    <div className="Mpupper-container">
      <div className="Mpupper-img">
      <img src="././icons/alimname-beyaz-yazi.webp" alt="" className="Mpupper-siteyazi-alimname"/>
      </div>
      
      <div className="Mpupper-Mapbtn"><Link to={"/map"}><i className="bi bi-globe-central-south-asia"></i></Link></div>
      
    </div>
  );
};
export default Mpupper;
