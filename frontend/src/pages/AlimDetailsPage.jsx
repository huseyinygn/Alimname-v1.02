import React from 'react'
import AlimDetails from '../components/Mainpage/AlimList/AlimDetails'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const AlimDetailsPage = () => {
  const [singleAlim, setSingleAlim] = useState(null);
  const { id: alimId } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSingleAlim = async () => {
      try {
        const response = await fetch(`${apiUrl}/alimler/${alimId}`);
        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }
        const data = await response.json();
        setSingleAlim(data);
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchSingleAlim();
  }, [apiUrl, alimId]);

  return singleAlim ? (
    <div>
      <Header/>
    <AlimDetails singleAlim={singleAlim}/>
    <Footer/>
    </div>
  ) : (
    <div>
    <Header/>
    <div style={{display:"flex", justifyContent:"center", margin:"4rem"}}>
    <Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin>
        </div>
    </div>
  );
  
};

export default AlimDetailsPage
