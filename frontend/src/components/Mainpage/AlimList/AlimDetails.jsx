import React, { useEffect } from "react";
import "./css/AlimDetails.css";
import PropTypes from "prop-types";

const AlimDetails = ({ singleAlim }) => {
  // İlk harf ve boşluktan sonra gelen ilk harfleri büyük yapma fonksiyonu
  const capitalizeWords = (text) => {
    const formattedText = text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return formattedText;
  };

  const borntime = singleAlim.borntime ? singleAlim.borntime : "Bilinmiyor";
  const deathtime = singleAlim.deathtime ? singleAlim.deathtime : "Bilinmiyor";
  const fullname = singleAlim.fullname ? capitalizeWords(singleAlim.fullname) : capitalizeWords(singleAlim.name);
  const century = singleAlim.century ? singleAlim.century : "Bilinmiyor";
  const civilization = singleAlim.civilization
    ? singleAlim.civilization
    : "Bilinmiyor";
  const life = singleAlim.life ? singleAlim.life : null;
  const works = singleAlim.works ? singleAlim.works : null;
  const extra = singleAlim.extra ? singleAlim.extra : null;
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
  const picture = singleAlim.picture ? (isNaN(singleAlim.picture) ? singleAlim.picture : pictureLinks[singleAlim.picture]) : "https://r.resimlink.com/Rj3Mz12_UB.png";
  const sources = singleAlim.source
    ? singleAlim.source.split(",").map((source) => source.trim())
    : [];

  const formatSourceURL = (url) => {
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `http://${url}`;
  };
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      const headerOffset = 6.5 * 10;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    };
    const links = document.querySelectorAll(".Pagerouter-btn");
    links.forEach((link) => link.addEventListener("click", handleSmoothScroll));
    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleSmoothScroll)
      );
    };
  }, []);
  return (
    <div className="AlimDetails-Container">
      <div className="AlimDetails-Pagerouter">
        <a href="#section-first" className="Pagerouter-btn">
        <i class="bi bi-arrow-up"></i>
        </a>
        {life && (
          <a href="#section-life" className="Pagerouter-btn">
            <i class="bi bi-tree-fill"></i>
          </a>
        )}
        {works && (
          <a href="#section-works" className="Pagerouter-btn">
            <i class="bi bi-book"></i>
          </a>
        )}
        {extra && (
          <a href="#section-extra" className="Pagerouter-btn">
            <i class="bi bi-database-add"></i>
          </a>
        )}
        <a href="#section-source" className="Pagerouter-btn">
          <i class="bi bi-arrow-down"></i>
        </a>
      </div>
      <div className="AlimDetails-Flex">
        <section
          className="AlimDetails-FirstFlex Flex section"
          id="section-first"
        >
          <div className="Alims-organizer">
            <h3>Düzenleyen:</h3>
            <h4>{singleAlim.organizer}</h4>
          </div>
          <h2 className="Alims-name word-break">{capitalizeWords(singleAlim.name)}</h2>
          <h2 className="Alims-borndeathtime">
            ({borntime}-{deathtime})
          </h2>
          <div className="Alims-shortdetails">
            <img src={picture} alt="İmage" className="Alims-picture" />
            <div className="Alims-shortdetailstext">
              <h2 className="Alims-fullname shortdetails">
                <h3>Tam İsmi:</h3> <h4>{fullname}</h4>
              </h2>
              <h2 className="Alims-century shortdetails">
                <h3>Yaşadığı Yüzyıl:</h3>{" "}
                <h4 className="word-break">{century}</h4>
              </h2>
              <h2 className="Alims-worktype shortdetails">
                <h3>Çalışma Alanları:</h3>{" "}
                <h4 className="word-break">{singleAlim.worktype}</h4>
              </h2>
              <h2 className="Alims-civilization shortdetails">
                <h3>Uygarlığı:</h3> <h4>{civilization}</h4>
              </h2>
            </div>
          </div>
        </section>
        <section id="section-life" className="section">
          {life && (
            <div className="AlimDetails-SecondFlex Flex">
              <h2 className="Alims-life shortdetails">
              <h3>Alimin Hayatı:</h3> <h4 dangerouslySetInnerHTML={{ __html: life.replace(/\n/g, '<br />') }}></h4>
              </h2>
            </div>
          )}
        </section>
        <section id="section-works" className="section">
          {works && (
            <div className="AlimDetails-SecondFlex Flex">
              <h2 className="Alims-works shortdetails">
              <h3>Alimin Çalışmaları ve Eserleri:</h3> <h4 dangerouslySetInnerHTML={{ __html: works.replace(/\n/g, '<br />') }}></h4>
              </h2>
            </div>
          )}
        </section>
        <section id="section-extra" className="section">
          {extra && (
            <div className="AlimDetails-SecondFlex Flex">
              <h2 className="Alims-extra shortdetails">
              <h3>Alim ile İlgili Ek Bilgiler:</h3> <h4 dangerouslySetInnerHTML={{ __html: extra.replace(/\n/g, '<br />') }}></h4>
              </h2>
            </div>
          )}
        </section>
        <section id="section-source" className="section">
          <div className="AlimDetails-SecondFlex Flex">
            <h2 className="Alims-source shortdetails">
              <h3>Kaynakça:</h3>
              <h4 className="word-break">
                {sources.map((source, index) => (
                  <div key={index}>
                    <a
                      href={formatSourceURL(source)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="Alims-source-link"
                    >
                      {source}
                    </a>
                    <br />
                  </div>
                ))}
              </h4>
            </h2>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AlimDetails;
AlimDetails.propTypes = {
  singleAlim: PropTypes.object,
};
