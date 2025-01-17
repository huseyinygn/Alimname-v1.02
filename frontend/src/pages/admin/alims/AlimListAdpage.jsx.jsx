import React, { useEffect } from "react";
import { Button, ConfigProvider, Popconfirm, Space, Table, message, Spin } from "antd";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import "../../css/AlimListAdpage.css";

const AlimList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
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
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    {
      title: "Alim Görseli",
      dataIndex: "picture",
      key: "picture",
      render: (imgSrc) => { const defaultImg = 'https://r.resimlink.com/Rj3Mz12_UB.png'; const finalImgSrc = imgSrc && !isNaN(imgSrc) ? pictureLinks[imgSrc] || defaultImg : (imgSrc || defaultImg); return <img src={finalImgSrc} alt="Image" width={100} style={{borderRadius:"0.8rem"}} />;},
    },
    {
      title: "İsmi",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        const formattedText = text
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return <p className='AlimList-name'>{formattedText}</p>;
      },
    },
    {
      title: "Doğum Yılı",
      dataIndex: "borntime",
      key: "borntime",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Vefat Yılı",
      dataIndex: "deathtime",
      key: "deathtime",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Yaşadığı Yüzyıl",
      dataIndex: "century",
      key: "century",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Oluşturulduğu Tarih",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p>{text.slice(0,10)}/{text.slice(11,19)}</p>,
    },
    {
      title: "Düzenleyen",
      dataIndex: "organizer",
      key: "organizer",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Yapabilecekleriniz",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => navigate(`/authpage/alim/update/${record._id}`)}>
            Düzenle
          </Button>
          <Popconfirm
            title="Alimi Sil"
            description="Alimi silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => /* deleteAlims(record._id) */ alert("Bu interaktif şuanlık kullanıma kapatılmıştır!")}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
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
          borntime: item.borntime ? item.borntime : "Bilinmiyor",
          deathtime: item.deathtime ? item.deathtime : "Bilinmiyor",
          createdAt : item.createdAt ? item.createdAt : "-"}));
        const sortedData = updatedData.sort((a, b) => a.name.localeCompare(b.name));
        setDataSource(sortedData);
      } else {
        message.error("Veri getirme başarısız.");
      }
    } catch (error) {
      console.log("Veri hatası:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const searchAlims = async () => {
    if (!searchTerm) return;

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/alimler/search/${searchTerm}`);

      if (response.ok) {
        const data = await response.json();
        const updatedData = data.map(item => ({ ...item,
          century: item.century ? item.century : "Bilinmiyor",
          civilization: item.civilization ? item.civilization : "Bilinmiyor",
          borntime: item.borntime ? item.borntime : "Bilinmiyor",
          deathtime: item.deathtime ? item.deathtime : "Bilinmiyor",
          createdAt : item.createdAt ? item.createdAt : "-"}));
        const sortedData = updatedData.sort((a, b) => a.name.localeCompare(b.name));
        setDataSource(sortedData);
      } else {
        message.error("Arama işlemi başarısız.");
      }
    } catch (error) {
      console.log("Arama hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    fetchAlims();
  };

  const deleteAlims = async (alimId) => {
    try {
      const response = await fetch(`${apiUrl}/alimler/${alimId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kategori başarıyla silindi.");
        fetchAlims();
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  useEffect(() => {
    fetchAlims();
  }, [fetchAlims]);
  const handleKeyDown = (event) => { if (event.key === 'Enter') { searchAlims(); } };
  return loading?(
    <div style={{display:"flex", justifyContent:"center", margin:"4rem"}}>
    <Spin spinning={true} indicator={<LoadingOutlined style={{ fontSize: 130, color:"var(--firstcolor)"}} spin />}></Spin>
        </div>
  ):(
    <div className='SearchAndTableFlex'>
      <h3 className='founded-alims'>{dataSource.length} alim bulundu</h3>
      <div className="AlimListAdpage-search">
      <input
        className="AlimListAdpage-search-input"
        type="text"
        placeholder="Alim arayın..."
        value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
      />
      <button className="AlimListAdpage-search-arabtn" onClick={searchAlims} >Ara</button>
      <button className='AlimListAdpage-search-resetbtn' onClick={resetSearch}>Reset</button>
    </div>
    <ConfigProvider
    theme={{
      components: {
        Table: {
          rowHoverBg:"var(--pageBackgroundColor)",
          headerBg:"var(--highcolor)",
          borderColor:"var(--firstcolor)",
          headerBorderRadius:"0.5rem",
        },
        Pagination:{
          colorPrimary:"var(--firstcolor)",
          colorPrimaryHover:"var(--highcolor)",
          colorPrimaryBorder:"var(--highcolor)"

        }
      },
    }}>
    <Table 
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      bordered={false}  
      className='Table-AlimListAdpage'
    />
    </ConfigProvider>
    </div>
  );
};

export default AlimList;
