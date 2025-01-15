import "./Mpupper.css";
import { Link } from "react-router-dom";
const Mpupper = () => {
  return (
    <div className="Mpupper-container">
      <div className="Mpupper-img">
      <img src="././icons/alimname-beyaz-yazi.png" alt="" className="Mpupper-siteyazi-alimname"/>
      </div>
      
      <div className="Mpupper-Mapbtn"><Link to={"/map"}><i className="bi bi-globe-central-south-asia"></i></Link></div>
      
      
      <div className="Mpupper-aboutbtn"> <Link to={"/hakkimizda"}><i className="bi bi-info-circle"></i></Link></div>
      
    </div>
  );
};
export default Mpupper;
