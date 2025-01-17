import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
        <div className='Logolar'>
            <img src="../../../../icons/tubitak-logo.webp" alt="" className='Tubitaklogo logo'/>
            <img src="../../../../icons/alimname-logo.webp" alt="Alimname.com" className='Alimnamelogo logo'/>
        </div>
        <div className='AllRightsReserved'><h3>Tüm hakları saklıdır. 2024 Alimname.com</h3></div>
        <h3 className='ProducedBy'>Produced by Hüseyin YEGİN</h3>
        <h3 className='ProducedBy'>En iyi deneyim ve filtreleme seçenekleri için tablet veya bilgisayar kullanımı tavsiye edilir</h3>
    </footer>
  )
}

export default Footer
