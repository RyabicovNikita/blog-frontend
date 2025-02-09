import { useEffect, useState } from "react";
import { getWeatherWithIcon } from "../../services";
import { getWeatherUserCountry } from "../../services/weathers";
import "./Footer.scss";

export const Footer = () => {
  const [userCountry, setUserCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  useEffect(() => {
    getWeatherUserCountry().then((data) => {
      setUserCountry(data?.country ?? null);
      setTemp(data?.temp ?? null);
      setWeather(data?.weather ?? null);
    });
  }, []);
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__info">
          <span className="footer__blog-name">Design-blog</span>
          <span className="footer__current-year">{new Date().getFullYear()}</span>
        </div>
        <div className="footer__weather">
          <span> {userCountry}</span>
          <span> {temp}</span>
          <span>{getWeatherWithIcon(weather)}</span>
        </div>
      </div>
    </footer>
  );
};
