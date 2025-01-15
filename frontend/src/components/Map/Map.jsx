import React, { useCallback, useEffect, useState } from "react";
import { ConfigProvider, Spin, Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import "./Map.css";
import WorldMap from "../../../public/map/Alimname-Map.svg";

const Map = () => {
  // MAP
  const regionMap = {
    A: "Orta Balkan Ülkeleri",
    B: "Türkiye",
    C: "Suriye",
    Ç: "İran",
    D: "Irak",
    E: "Arap Yarımadasındaki Ülkeler",
    F: "Ürdün",
    G: "Lübnan, İsrail ve Filistin",
    Ğ: "Mısır",
    H: "Libya",
    I: "Tunus",
    İ: "Cezayir",
    J: "Fas",
    K: "Azerbeycan",
    L: "Gürcistan",
    M: "Ermenistan",
    N: "Rusya",
    O: "Ukrayna",
    Ö: "Moldova",
    P: "Romanya",
    R: "Bulgaristan",
    S: "Yunanistan",
    Ş: "Macaristan",
    T: "Türkmenistan",
    U: "Afganistan",
  };
  const [storedRegion, setStoredRegion] = useState(null);
  useEffect(() => {
    const handleRegionClick = (e) => {
      const svgElement = document.getElementById("svg-map");
      const svgDoc = svgElement.contentDocument;
      const regionId = e.target.closest("g").id;
      if (regionId) {
        localStorage.setItem("Region", regionId);
        setStoredRegion(regionId);
        const regions = svgDoc.querySelectorAll("g");
        regions.forEach((region) => {
          const pathElement = region.querySelector("path");
          if (pathElement) {
            pathElement.style.fill = region.id === regionId ? "orange" : "";
          }
        });
      }
    };
    const svgElement = document.getElementById("svg-map");
    svgElement.addEventListener("load", () => {
      const svgDoc = svgElement.contentDocument;
      if (svgDoc) {
        const regions = svgDoc.querySelectorAll("g");
        regions.forEach((region) => {
          const pathElement = region.querySelector("path");
          const textElement = region.querySelector("text");
          const roadElement = region.querySelector("road");

          region.addEventListener("click", handleRegionClick);
          region.addEventListener("mouseover", () => {
            if (pathElement) {
              if (pathElement.style.fill !== "orange") {
                pathElement.style.fill = "#ddba7ae6";
                pathElement.style.cursor = "pointer";
              }
            }
          });
          region.addEventListener("mouseout", () => {
            if (pathElement) {
              if (pathElement.style.fill !== "orange") {
                pathElement.style.fill = "";
              }
            }
          });
          if (textElement) {
            textElement.style.cursor = "pointer";
          }
          if (roadElement) {
            roadElement.style.cursor = "pointer";
          }
        });
      }
    });
  }, []);

  // LIST
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [centuryFilters, setCenturyFilters] = useState([]);
  const [civilizationFilters, setCivilizationFilters] = useState([]);
  const [worktypeFilters, setWorktypeFilters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
      align: "center",
    },
    {
      title: "Yaşadığı Yüzyıl",
      dataIndex: "century",
      key: "century",
      render: (text) => <p className="AlimList-others">{text}</p>,
      filters: centuryFilters,
      onFilter: (value, record) =>
        record.century ? record.century.includes(value) : false,
      filterSearch: true,
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Uygarlığı",
      dataIndex: "civilization",
      key: "civilization",
      render: (text) => <p className="AlimList-others">{text}</p>,
      filters: civilizationFilters,
      onFilter: (value, record) =>
        record.civilization ? record.civilization.includes(value) : false,
      filterSearch: true,
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Çalışma Alanı",
      dataIndex: "worktype",
      key: "worktype",
      render: (text) => {
        const worktypes = text.split(",").map((w) => w.trim());
        const formattedWorktypes = worktypes.map((type, index) => {
          if ((index + 1) % 3 === 0 && index !== worktypes.length - 1) {
            return (
              <span key={index}>
                {type}, <br />
              </span>
            );
          }
          return (
            <span key={index}>
              {type}
              {index !== worktypes.length - 1 ? ", " : ""}
            </span>
          );
        });
        return <p className="AlimList-others">{formattedWorktypes}</p>;
      },
      filters: worktypeFilters,
      onFilter: (value, record) =>
        record.worktype ? record.worktype.includes(value) : false,
      filterSearch: true,
      align: "center",
      responsive: ["lg"],
    },
  ];

  const fetchAlims = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/alimler`);

      if (response.ok) {
        const data = await response.json();
        const updatedData = data.map((item) => ({
          ...item,
          century: item.century ? item.century : "Bilinmiyor",
          civilization: item.civilization ? item.civilization : "Bilinmiyor",
          worktype: item.worktype
            ? item.worktype
                .split(",")
                .map((w) => w.trim())
                .join(", ")
            : ["Bilinmiyor"],
        }));
        const sortedData = updatedData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        const storedRegion = localStorage.getItem("Region");
        const sortedAndRegionFiltredData = sortedData.filter(
          (item) => item.region === storedRegion
        );

        setDataSource(sortedAndRegionFiltredData);
        setFilteredData(sortedAndRegionFiltredData);

        const uniqueCenturies = [
          ...new Set(sortedAndRegionFiltredData.map((item) => item.century)),
        ];
        const filtersCenturies = uniqueCenturies.map((century) => ({
          text: century,
          value: century,
        }));
        setCenturyFilters(filtersCenturies);

        const uniqueCivilizations = [
          ...new Set(
            sortedAndRegionFiltredData.map((item) => item.civilization)
          ),
        ];
        const filtersCivilizations = uniqueCivilizations.map(
          (civilization) => ({ text: civilization, value: civilization })
        );
        setCivilizationFilters(filtersCivilizations);

        const uniqueWorktypes = [
          ...new Set(
            sortedAndRegionFiltredData.flatMap((item) =>
              item.worktype.split(",").map((w) => w.trim())
            )
          ),
        ];
        const filtersWorktypes = uniqueWorktypes.map((worktype) => ({
          text: worktype,
          value: worktype,
        }));
        setWorktypeFilters(filtersWorktypes);
      } else {
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
  }, [storedRegion, fetchAlims]);

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
    if (filters.worktype) {
      filteredData = filteredData.filter((item) =>
        filters.worktype.some((worktype) => item.worktype.includes(worktype))
      );
    }

    setFilteredData(filteredData);
  };
  useEffect(() => {
    if (storedRegion) {
      const mapFilterElement = document.getElementById("Map-filtername");
      if (mapFilterElement) {
        window.scrollTo({
          top: mapFilterElement.offsetTop - 65,
          behavior: "smooth",
        });
      }
    }
  }, [storedRegion]);

  const getRegionName = (regionId) => {
    return regionMap[regionId] || regionId;
  };
  return (
    <div className="Map-container">
      <div className="Map">
        <object
          id="svg-map"
          type="image/svg+xml"
          data={WorldMap}
          className="Map-svg"
        />
      </div>
      <p className="Map-info">*Çeşitli sebeplerden ve milletlerin bilime, eğitime yatkınlıklarının farklı olmasından dolayı çoğu alim İran, Türkiye ve Mısırdan çıkmıştır.*</p>
      {storedRegion && (
        <>
          {" "}
          <div className="Map-filtername" id="Map-filtername">
            <p>
              <b>Filtre: </b>
              {getRegionName(storedRegion)}
            </p>
          </div>{" "}
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  cellPaddingInline: "5rem",
                  rowHoverBg: "var(--pageBackgroundColor)",
                  headerBg: "var(--highcolor)",
                  borderColor: "var(--firstcolor)",
                  headerBorderRadius: "0.5rem",
                  colorTextHeading: "var(--listheadercolor)",
                },
                Pagination: {
                  colorPrimary: "var(--secondcolor)",
                  colorPrimaryHover: "var(--highcolor)",
                  colorPrimaryBorder: "var(--highcolor)",
                  colorText: "var(--pagerotherbuttonstext)",
                  itemActiveBg: "var(--firstcolor)",
                  itemBg: "var(--pagerotherbuttons)",
                },
                Checkbox: { colorPrimary: "#1677FF" },
                Button: {
                  colorPrimary: "var(--backgroundcolor)",
                  colorPrimaryHover: "var(--highcolor)",
                },
              },
            }}
          >
            {" "}
            <Table
              locale={{
                emptyText: (
                  <div
                    style={{ color: "var(--organizercolor)", padding: "20px" }}
                  >
                    {" "}
                    <b>Bu bölgede herhangi bir alim bulamadık! </b>
                  </div>
                ),
              }}
              dataSource={dataSource}
              columns={columns}
              rowKey={(record) => record._id}
              className="Map-Table"
              bordered={false}
              loading={{
                spinning: loading,
                indicator: (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "10rem",
                    }}
                  >
                    {" "}
                    <Spin
                      spinning={true}
                      indicator={
                        <LoadingOutlined
                          style={{ fontSize: 130, color: "var(--firstcolor)" }}
                          spin
                        />
                      }
                    ></Spin>{" "}
                  </div>
                ),
              }}
              pagination={
                filteredData.length > 7
                  ? {
                    showSizeChanger:false,
                      pageSize: 7,
                      total: filteredData.length,
                      position: ["bottomCenter"],
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
            />{" "}
          </ConfigProvider>{" "}
        </>
      )}{" "}
    </div>
  );
};

export default Map;
