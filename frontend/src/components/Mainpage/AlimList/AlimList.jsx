import React from 'react'
import {ConfigProvider, Table, message, Spin } from "antd";
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
  const [changedPage, setChangedPage] = useState(false);
  const pictureLinks = { 
    1: "https://r.resimlink.com/R38wQs.png", 
    2: "https://r.resimlink.com/afksH.png", 
    3: "https://r.resimlink.com/lNEj36s5hVJR.png",
    4: "https://r.resimlink.com/AxjSWCYQ.png",
    5: "https://r.resimlink.com/XtVCdb9S7MOp.png",
    6: "https://r.resimlink.com/yGp-N7v.png",
    7: "https://r.resimlink.com/a9YwkIb2e.png",
    8: "https://r.resimlink.com/nwG7ZdI9.png",
    9: "https://r.resimlink.com/aRUMhz14bt.png",};
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Alim Görseli",
      dataIndex: "picture",
      key: "picture",
      render: (imgSrc) => { const defaultImg = 'https://r.resimlink.com/Rj3Mz12_UB.png'; const finalImgSrc = imgSrc && !isNaN(imgSrc) ? pictureLinks[imgSrc] || defaultImg : (imgSrc || defaultImg); return <img src={finalImgSrc} alt="Image" width={100} style={{borderRadius:"0.8rem"}} />;},
      align:"center",
    },
    {
      title: "İsmi",
      dataIndex: "name",
      key: "name",
      render: (text) => {const formattedText = text .toLowerCase() .split(' ') .map(word => word.charAt(0).toUpperCase() + word.slice(1)) .join(' '); return <p className='AlimList-name'>{formattedText}</p>;},
      align:"center",
    },
    {
      title: "Yaşadığı Yüzyıl",
      dataIndex: "century",
      key: "century",
      render: (text) => <p className='AlimList-others'>{text}</p>,
      filters: centuryFilters,
      onFilter: (value, record) => record.century ? record.century.includes(value) : false,
      filterSearch: true,
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
      filterSearch: true,
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
      filterSearch: true,
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
        const sortedData = updatedData.sort((a, b) => {
          const isLinkA = a.picture && (a.picture.startsWith('http') || a.picture.startsWith('https')); const isLinkB = b.picture && (b.picture.startsWith('http') || b.picture.startsWith('https')); if (isLinkA && !isLinkB) return -1; if (!isLinkA && isLinkB) return 1; if (a.picture && !b.picture) return -1; if (!a.picture && b.picture) return 1; return a.name.localeCompare(b.name);});
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
          colorTextHeading:"var(--listheadercolor)",
        },
        Pagination:{
          colorPrimary:"var(--secondcolor)",
          colorPrimaryHover:"var(--highcolor)",
          colorPrimaryBorder:"var(--highcolor)",
          colorText:"var(--pagerotherbuttonstext)",
          itemActiveBg: "var(--firstcolor)",
          itemBg: "var(--pagerotherbuttons)",

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
  locale={{ 
    emptyText: (
      <div style={{ color: 'var(--organizercolor)', padding: '40px' }}>
        <b>Bu filtrelere uyan herhangi bir alim bulamadık! </b>
      </div>
    ), 
  }}
  columns={columns}
  rowKey={(record) => record._id}
  className={`Table ${changedPage ? "changed" : ""}`}
  bordered={false}
  pagination={filteredData.length > 7 ? {
    pageSize: 6,
    showSizeChanger:false,
    total: filteredData.length,
    position: ['bottomCenter'],
    onChange: (page) => {
      window.scrollTo(0, 230);
      if (page !== 1) {
        setChangedPage(true);
      }
    }
  } : false}
  onChange={(pagination, filters, sorter) => {
    handleTableChange(pagination, filters, sorter);
    if (pagination.current !== 1) {
      setChangedPage(true);
    }else{
      setChangedPage(false)
    }
  }}
  rowClassName="table-row"
  onRow={(record) => ({
    onClick: () => {
      navigate(`/alim/${record._id}`);
    },
  })}
/>

    </ConfigProvider>
  );
};

export default AlimList
