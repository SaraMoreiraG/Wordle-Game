import React from "react";

const Language = ({ language, currentLanguage, handleLanguageClick }) => (
  <div
    className={`language ${language === currentLanguage ? "green" : ""}`}
    onClick={() => handleLanguageClick(language)}
  >
    <img
      src={`${process.env.PUBLIC_URL}/images/icon-${language}.png`}
      alt={language}
      className="img-fluid"
    />
  </div>
);

export default Language;
