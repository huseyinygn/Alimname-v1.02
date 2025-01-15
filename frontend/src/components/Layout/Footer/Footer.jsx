import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
        <div className='Logolar'>
            <img src="../../../../icons/tubitak-logo.png" alt="" className='Tubitaklogo logo'/>
            <img src="../../../../icons/alimname-logo.png" alt="Alimname.com" className='Alimnamelogo logo'/>
        </div>
        <div className='AllRightsReserved'><h3>Tüm hakları saklıdır. 2024 Alimname.com</h3></div>
        <h3 className='ProducedBy'>Produced by Hüseyin Y.</h3>
        <Link to={"/hakkimizda"}>
          <h4 className='Hakkımızda'>Hakkımızda</h4>
          </Link>
    </footer>
  )
}

export default Footer
