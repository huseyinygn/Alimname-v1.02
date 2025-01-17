import { Link, useNavigate } from "react-router-dom";
import "./Search.css";
import React, { useState, useEffect } from "react";
import { ConfigProvider, Table, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Search = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [centuryFilters, setCenturyFilters] = useState([]);
  const [civilizationFilters, setCivilizationFilters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
      render: (imgSrc) => {
        const defaultImg = "https://r.resimlink.com/Rj3Mz12_UB.png";
        const finalImgSrc = imgSrc && !isNaN(imgSrc) ? pictureLinks[imgSrc] || defaultImg : (imgSrc || defaultImg); 
        return (
          <img
            src={finalImgSrc}
            alt="Image"
            width={100}
            style={{ borderRadius: "0.8rem" }}
          />
        );
      },
      align: "center",
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
      render: (text) => <p className="Searchlist-others">{text}</p>,
      filters: centuryFilters,
      onFilter: (value, record) =>
        record.century ? record.century.includes(value) : false,
      align: "center",
    },
    {
      title: "Uygarlığı",
      dataIndex: "civilization",
      key: "civilization",
      render: (text) => <p className="Searchlist-others">{text}</p>,
      filters: civilizationFilters,
      onFilter: (value, record) =>
        record.civilization ? record.civilization.includes(value) : false,
      align: "center",
    },
  ];
  useEffect(() => {
    const storedItem = localStorage.getItem("search-item");
    if (storedItem) {
      setInputValue(storedItem);
      handleSearch();
    }
  }, []);
  const handleSearch = async () => {
    setLoading(true);
    const alimName = localStorage.getItem("search-item");
    try {
      const res = await fetch(`${apiUrl}/alimler/search/${alimName}`);
      if (!res.ok) {
        message.error("Alim bulunamadı!");
      }
      const data = await res.json();
      const updatedData = data.map((item) => ({
        ...item,
        century: item.century ? item.century : "Bilinmiyor",
        civilization: item.civilization ? item.civilization : "Bilinmiyor",
      }));
      const sortedData = updatedData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFilteredData(sortedData);
      setSearchResults(sortedData);
      localStorage.removeItem("search-item");
      const uniqueCenturies = [
        ...new Set(updatedData.map((item) => item.century)),
      ];
      const filtersCenturies = uniqueCenturies.map((century) => ({
        text: century,
        value: century,
      }));
      setCenturyFilters(filtersCenturies);

      const uniqueCivilizations = [
        ...new Set(updatedData.map((item) => item.civilization)),
      ];
      const filtersCivilizations = uniqueCivilizations.map((civilization) => ({
        text: civilization,
        value: civilization,
      }));
      setCivilizationFilters(filtersCivilizations);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleTableChange = (pagination, filters, sorter) => {
    let filteredData = dataSource;

    if (filters.century) {
      filteredData = filteredData.filter((item) =>
        filters.century.includes(item.century)
      );
    }

    if (filters.civilization) {
      filteredData = filteredData.filter((item) =>
        filters.civilization.includes(item.civilization)
      );
    }

    setFilteredData(filteredData);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    localStorage.setItem("search-item", inputValue);
    handleSearch();
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };
  return loading ? (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "4rem" }}
      >
        <Spin
          spinning={true}
          indicator={
            <LoadingOutlined
              style={{ fontSize: 130, color: "var(--firstcolor)" }}
              spin
            />
          }
        ></Spin>
      </div>
    </div>
  ) : (
    <div className="Search-body">
      <div className="Search-container">
        <Link to={"/"}>
          <img
            src="../../../../icons/alimname-krem-yazi.webp"
            alt="Alimname.com"
            className="Alimname-yazi"
          />
        </Link>
        <div className="Searchs">
          <div className="searchbar">
            <input
              className="textinput"
              type="text"
              placeholder="Alim arayın..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button className="arabtn" onClick={handleButtonClick}>
              Ara
            </button>
          </div>
          <div className="search-results">
            {searchResults?.length === 0 && (
              <div className="sorry-message">
                <h3>
                  Alim aradığınız için teşekkür ederiz ama ne yazık ki
                  aradığınız alimi bulamadık. Lütfen kelimelerinizi doğru
                  seçerek birdaha deneyin!❤
                </h3>
              </div>
            )}
            {searchResults?.length > 0 && (
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      cellPaddingInline: "5rem",
                      rowHoverBg: "var(--pageBackgroundColor)",
                      headerBg: "var(--highcolor)",
                      borderColor: "var(--firstcolor)",
                      headerBorderRadius: "0.5rem",
                      colorTextHeading:"var(--listheadercolor)",
                    },
                    Pagination: {
                      colorPrimary: "var(--secondcolor)",
                      colorPrimaryHover: "var(--highcolor)",
                      colorPrimaryBorder: "var(--highcolor)",
                      colorText: "var(--pagerotherbuttonstext)",
                      itemActiveBg: "var(--firstcolor)",
                      itemBg: "var(--pagerotherbuttons)",
                    },
                    Checkbox: {
                      colorPrimary: "#1677FF",
                    },
                    Button: {
                      colorPrimary: "var(--backgroundcolor)",
                      colorPrimaryHover: "var(--highcolor)",
                    },
                  },
                }}
              >
                <h3 className="founded-alims">
                  {searchResults.length} alim bulundu
                </h3>
                <Table
                  dataSource={searchResults}
                  locale={{ emptyText: ( <div style={{ color: 'var(--organizercolor)', padding: '40px' }}> <b>Bu filtrelere uyan herhangi bir alim bulamadık! </b></div> ), }}
                  columns={columns}
                  rowKey={(record) => record._id}
                  className="Table-search"
                  bordered={false}
                  pagination={
                    
                    filteredData.length > 7
                      ? {
                        showSizeChanger:false,
                          pageSize: 7,
                          total: filteredData.length,
                          position: ["bottomCenter"],
                          onChange: () => {
                            window.scrollTo(0, 220);
                          },
                        }
                      : false
                      
                  }
                  onChange={handleTableChange}
                  onRow={(record) => ({
                    onClick: () => {
                      navigate(`/alim/${record._id}`);
                    },
                    className: "table-row",
                  })}
                />
              </ConfigProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
