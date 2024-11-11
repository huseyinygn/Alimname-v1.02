import React, { useState } from 'react'
import "./css/AlimDetails.css"
import PropTypes from "prop-types";

const AlimDetails = ({singleAlim}) => {
   const borntime = singleAlim.borntime ? singleAlim.borntime : "Bilinmiyor";
   const deathtime = singleAlim.deathtime ? singleAlim.deathtime : "Bilinmiyor";
   const fullname = singleAlim.fullname ? singleAlim.fullname : singleAlim.name;
   const century = singleAlim.century ? singleAlim.century : "Bilinmiyor";
   const civilization = singleAlim.civilization ? singleAlim.civilization : "Bilinmiyor";
   const life = singleAlim.life ? singleAlim.life : null;
   const works = singleAlim.works ? singleAlim.works : null;
   const picture = singleAlim.picture ? singleAlim.picture : 'https://r.resimlink.com/_oRpyZYj7JN.png';
   const sources = singleAlim.source ? singleAlim.source.split(',').map(source => source.trim()) : [];
   const formatSourceURL = (url) => { return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`; };   
  return (
    <div className='AlimDetails-Container'>
      <div className='AlimDetails-Flex'>
        <div className='AlimDetails-FirstFlex Flex'>
        <div className='Alims-organizer'><h3>Düzenleyen:</h3><h4>{singleAlim.organizer}</h4></div>
          <h2 className='Alims-name word-break'>{singleAlim.name}</h2>
          <h2 className='Alims-borndeathtime'>({borntime}-{deathtime})</h2>
          <div className='Alims-shortdetails'>
           <img src={picture} alt="İmage" className='Alims-picture'/> 
          <div className='Alims-shortdetailstext'>
          <h2 className='Alims-fullname shortdetails'><h3>Tam İsmi:</h3> <h4>{fullname}</h4></h2>
          <h2 className='Alims-century shortdetails'><h3>Yaşadığı Yüzyıl:</h3> <h4 className='word-break'>{century}</h4></h2>
          <h2 className='Alims-worktype shortdetails'><h3>Çalışma Alanları:</h3> <h4 className='word-break'>{singleAlim.worktype}</h4></h2>
          <h2 className='Alims-civilization shortdetails'><h3>Uygarlığı:</h3> <h4>{civilization}</h4></h2>
          </div>
          </div>
        </div>
        {life && ( <div className='AlimDetails-SecondFlex Flex'> <h2 className='Alims-life shortdetails'><h3>Alimin Hayatı:</h3> <h4>{life}</h4></h2> </div> )}
        {works && ( <div className='AlimDetails-SecondFlex Flex'> <h2 className='Alims-works shortdetails'><h3>Alimin Çalışmaları ve Eserleri:</h3> <h4>{works}</h4></h2> </div> )}
        <div className='AlimDetails-SecondFlex Flex'>
          <h2 className='Alims-source shortdetails'><h3>Kaynakca:</h3> <h4 className='word-break'> {sources.map((source, index) => ( <div key={index}> <a href={formatSourceURL(source)} target="_blank" rel="noopener noreferrer" className='Alims-source-link'> {source} </a> <br /> </div> ))} </h4></h2>
        </div>
      </div>
    </div>
  )
}

export default AlimDetails;
AlimDetails.propTypes = {
    singleAlim: PropTypes.object,
  };

