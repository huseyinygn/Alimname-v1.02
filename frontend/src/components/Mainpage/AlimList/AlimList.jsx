import React from 'react'
import {ConfigProvider, Table, message, Spin, Flex } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import "./css/AlimList.css"
const AlimList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [centuryFilters, setCenturyFilters] = useState([]);
  const [civilizationFilters, setCivilizationFilters] = useState([]);
  const [worktypeFilters, setWorktypeFilters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Alim Görseli",
      dataIndex: "picture",
      key: "picture",
      render: (imgSrc) => { const defaultImg = 'https://r.resimlink.com/_oRpyZYj7JN.png'; return <img src={imgSrc || defaultImg} alt="Image" width={100} style={{borderRadius:"0.8rem"}} />; },
      align:"center",
    },
    {
      title: "İsmi",
      dataIndex: "name",
      key: "name",
      render: (text) => <p className='AlimList-name'>{text}</p>,
      align:"center",
    },
    {
      title: "Yaşadığı Yüzyıl",
      dataIndex: "century",
      key: "century",
      render: (text) => <p className='AlimList-others'>{text}</p>,
      filters: centuryFilters,
      onFilter: (value, record) => record.century ? record.century.includes(value) : false,
      align:"center",
      responsive: ['md'],

    },
    {
      title: "Uygarlığı",
      dataIndex: "civilization",
      key: "civilization",
      render: (text) => <p className='AlimList-others'>{text}</p>,
      filters: civilizationFilters,
      onFilter: (value, record) => record.civilization ? record.civilization.includes(value) : false,
      align:"center",
      responsive: ['md'],
    },
    {
      title: "Çalışma Alanı",
      dataIndex: "worktype",
      key: "workype",
      render: (text) => { 
        const worktypes = text.split(',').map(w => w.trim()); 
        const formattedWorktypes = worktypes.map((type, index) => 
          { if ((index + 1) % 3 === 0 && index !== worktypes.length - 1) 
            { return <span key={index}>{type}, <br /></span>; } 
            return <span key={index}>{type}{index !== worktypes.length - 1 ? ', ' : ''}</span>; });
             return <p className='AlimList-others'>{formattedWorktypes}</p>; },
      filters: worktypeFilters,
      onFilter: (value, record) => record.worktype ? record.worktype.includes(value) : false,
      align:"center",
      responsive: ['lg'],
    }
  ];

  const fetchAlims = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/alimler`);

      if (response.ok) {
        const data = await response.json();
        const updatedData = data.map(item => ({ ...item,
           century: item.century ? item.century : "Bilinmiyor",
           civilization: item.civilization ? item.civilization : "Bilinmiyor",
           worktype: item.worktype ? item.worktype.split(',').map(w => w.trim()).join(', ') : ["Bilinmiyor"] }));
        const sortedData = updatedData.sort((a, b) => a.name.localeCompare(b.name));
        setDataSource(sortedData);
        setFilteredData(sortedData);

        const uniqueCenturies = [...new Set(updatedData.map(item => item.century))];
        const filtersCenturies = uniqueCenturies.map(century => ({ text: century, value: century }));
        setCenturyFilters(filtersCenturies);

        const uniqueCivilizations = [...new Set(updatedData.map(item => item.civilization))];
        const filtersCivilizations = uniqueCivilizations.map(civilization => ({ text: civilization, value: civilization }));
        setCivilizationFilters(filtersCivilizations);

        const uniqueWorktypes = [...new Set(updatedData.flatMap(item => item.worktype.split(',').map(w => w.trim())))]; 
        const filtersWorktypes = uniqueWorktypes.map(worktype => ({ text: worktype, value: worktype })); 
        setWorktypeFilters(filtersWorktypes);} 
        else {
        message.error("Veri getirme başarısız.");
      }
    } catch (error) {
      console.log("Veri hatası:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);
  useEffect(() => {
    fetchAlims();
  }, [fetchAlims]);
const handleTableChange = (pagination, filters, sorter) => {
    let filteredData = dataSource;

    if (filters.century) {
      filteredData = filteredData.filter(item => filters.century.includes(item.century));
    }

    if (filters.civilization) {
      filteredData = filteredData.filter(item => filters.civilization.includes(item.civilization));
    }
    if (filters.worktype) { filteredData = filteredData.filter(item => filters.worktype.some(worktype => item.worktype.includes(worktype))); }

    setFilteredData(filteredData);
  };
  return loading?(
    <div style={{display:"flex", justifyContent:"center", margin:"4rem"}}>
    <Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin>
        </div>
  ):(
    <ConfigProvider theme={{
      components: {
        Table: {
          cellPaddingInline:"5rem",
          rowHoverBg:"var(--pageBackgroundColor)",
          headerBg:"var(--highcolor)",
          borderColor:"var(--firstcolor)",
          headerBorderRadius:"0.5rem",
          colorTextHeading:"var(--textcolor)"
        },
        Pagination:{
          colorPrimary:"var(--firstcolor)",
          colorPrimaryHover:"var(--highcolor)",
          colorPrimaryBorder:"var(--highcolor)",
          colorText:"var(--textcolor)"

        },
        Checkbox: {
          colorPrimary: "#1677FF",
        },
        Button: {
          colorPrimary: "var(--backgroundcolor)",
          colorPrimaryHover: "var(--highcolor)",
        }
      },
    }}>
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      className='Table'
      bordered={false}
      pagination={filteredData.length > 7 ? {
        pageSize:7,
        total: filteredData.length,
        position:['bottomCenter'],
        onChange:()=>{window.scrollTo(0, 220);}
      } : false}
      onChange={handleTableChange}
      onRow={(record) => ({
        onClick: () => {
          navigate(`/alim/${record._id}`);
          
        },className: 'table-row',})}
    />
    </ConfigProvider>
  );
};

export default AlimList
