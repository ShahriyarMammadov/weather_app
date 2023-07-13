"use client";

import styles from "./page.module.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Input } from "antd";
import snow from "./assets/images/snow.gif";
import cloudy from "./assets/images/cloud.gif";
import rainy from "./assets/images/rainy.gif";
import sunny from "./assets/images/sun.gif";
import thunderstorm from "./assets/images/thunderstorm.gif";
import drizzle from "./assets/images/drizzle.gif";
import mist from "./assets/images/mist.gif";
import tornado from "./assets/images/tornado.gif";
import LoadingComponent from "./components/loading";
import { useTranslation } from "react-i18next";
// import i18n from "i18next";
import i18n from "./locales/i18n";
import Bar from "./components/bar";

export default function Home() {
  // {
  //   latitude: 40.4143569,
  //   longitude: 50.1176359,
  // }
  const [location, setLocation] = useState();
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const { Search } = Input;

  const fetchCoordinates = async (value) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLocation({ latitude: lat, longitude: lon });
        setLoading(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const setThemeColor = (color) => {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", color);
      } else {
        const newMeta = document.createElement("meta");
        newMeta.setAttribute("name", "theme-color");
        newMeta.setAttribute("content", color);
        document.head.appendChild(newMeta);
      }
    };

    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const color = prefersDarkMode ? "#0E2954" : "#AAC8A7";
    setThemeColor(color);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          setLocation({
            latitude: 40.4143569,
            longitude: 50.1176359,
          });
          console.log(error);
        }
      );
    } else {
      setLoading(false);
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const data = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location?.latitude}&lon=${location?.longitude}&appid=121644eb7e360359ae4457fdf296252f`
        );
        setLoading(false);
        setWeatherData(data.data);
      } catch (error) {
        alert(error);
      }
    };

    location ? getWeatherData() : null;
  }, [location]);

  // Gundelik DAta
  const weatherDatas = weatherData?.list;

  const dailyData = {};

  weatherDatas?.forEach((data) => {
    const timestamp = data.dt * 1000;

    const date = new Date(timestamp);
    const key = date.toISOString().split("T")[0];

    if (dailyData[key]) {
      dailyData[key].push(data);
    } else {
      dailyData[key] = [data];
    }
  });

  const dailyDataArray = Object.entries(dailyData).map(
    ([date, data], index) => ({
      key: `dailyData-${index}`,
      date,
      data,
    })
  );

  // search
  const onSearch = (value) => {
    if (value.trim() != "") {
      fetchCoordinates(value);
    }
  };
  // -----------------------------------

  let sunriseTimestamp = weatherData?.city?.sunrise;
  let sunsetTimestamp = weatherData?.city?.sunset;

  const sunrise = new Date(sunriseTimestamp * 1000);
  const sunset = new Date(sunsetTimestamp * 1000);

  // Saatliq Data +
  const hourlyData = weatherData?.list?.slice(0, 6);

  // Language
  const { t } = useTranslation();

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };

  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="weather application" />
      </Head>
      <main>
        <section>
          {loading ? (
            <LoadingComponent />
          ) : (
            <React.Fragment>
              <Bar />
              <div className={styles.weather}>
                <div className={styles.weatherContainer}>
                  <div className={styles.inputDiv}>
                    <Search
                      className={styles.input}
                      placeholder={t("search for cities")}
                      allowClear
                      enterButton={t("search")}
                      size="large"
                      onSearch={onSearch}
                    />
                  </div>
                  <div className={styles.weatherDetails}>
                    <div className={styles.left}>
                      <div className={styles.iconAndCountryCity}>
                        <div>
                          <div className={styles.cityName}>
                            <h2>
                              {weatherData?.city?.name},{" "}
                              {weatherData?.city?.country}
                            </h2>
                          </div>
                          <div className={styles.description}>
                            <p>
                              {t(
                                `${weatherData?.list[0]?.weather[0]?.description}`
                              )}
                            </p>
                          </div>
                          <div className={styles.cityPopulation}>
                            <h4>
                              {t("population")}: {weatherData?.city?.population}
                            </h4>
                          </div>
                          <div className={styles.temperature}>
                            <h1>
                              {(
                                weatherData?.list[0]?.main?.temp - 273.15
                              ).toFixed()}
                              <sup>°C</sup>
                            </h1>
                          </div>
                        </div>
                        <div className={styles.icon}>
                          {weatherData.list[0].weather[0].main === "Clear" ? (
                            <Image
                              src={sunny}
                              width={260}
                              height={260}
                              alt={
                                weatherData?.list[0]?.weather[0]?.description
                              }
                              priority
                            />
                          ) : weatherData.list[0].weather[0].main === "Rain" ? (
                            <Image
                              src={rainy}
                              width={260}
                              height={260}
                              alt={
                                weatherData?.list[0]?.weather[0]?.description
                              }
                              priority
                            />
                          ) : weatherData.list[0].weather[0].main === "Snow" ? (
                            <Image
                              src={snow}
                              width={260}
                              height={260}
                              alt={
                                weatherData?.list[0]?.weather[0]?.description
                              }
                              priority
                            />
                          ) : weatherData.list[0].weather[0].main ===
                            "Clouds" ? (
                            <Image
                              src={cloudy}
                              width={320}
                              height={240}
                              alt={
                                weatherData?.list[0]?.weather[0]?.description
                              }
                              priority
                            />
                          ) : weatherData.list[0].weather[0].main ===
                            "Thunderstorm" ? (
                            <Image
                              src={thunderstorm}
                              width={260}
                              height={260}
                              alt={
                                weatherData?.list[0]?.weather[0]?.description
                              }
                              priority
                            />
                          ) : weatherData.list[0].weather[0].main ===
                            "Drizzle" ? (
                            <Image
                              src={drizzle}
                              width={200}
                              height={200}
                              alt={
                                weatherData?.list[0]?.weather[0]?.description
                              }
                              priority
                            />
                          ) : weatherData.list[0].weather[0].main === "Mist" ? (
                            <Image
                              src={mist}
                              width={260}
                              height={260}
                              alt={
                                weatherData?.list[0]?.weather[0]?.description
                              }
                              priority
                            />
                          ) : weatherData.list[0].weather[0].main ===
                            "Tornado" ? (
                            <Image
                              src={tornado}
                              width={260}
                              height={260}
                              alt={
                                weatherData?.list[0]?.weather[0]?.description
                              }
                              priority
                            />
                          ) : (
                            <p>
                              {weatherData?.list[0]?.weather[0]?.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className={styles.hourlyWeatherDetails}>
                        <h3>{t("to day's forecast")}</h3>
                        <div className={styles.hourlyData}>
                          <hr />
                          {hourlyData?.map((e, i) => {
                            return (
                              <>
                                <div key={i}>
                                  <p>
                                    {e?.dt_txt?.slice(5, 10)} /{" "}
                                    {e?.dt_txt?.slice(11, 16)}
                                  </p>
                                  <img
                                    src={`https://openweathermap.org/img/wn/${e?.weather[0]?.icon}.png`}
                                  />
                                  <p>
                                    {(e?.main?.temp - 273.15).toFixed()}{" "}
                                    <sup>°C</sup>
                                  </p>
                                </div>
                                <hr key={i + 1} />
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className={styles.airConditions}>
                        <h3>{t("air conditions")}</h3>
                        <div className={styles.airConditionsData}>
                          <div>
                            <p>
                              {t("sunrise")}:{" "}
                              <span> {sunrise.toLocaleTimeString()}</span>
                            </p>
                            <p>
                              {t("feels like")}:{" "}
                              <span>
                                {" "}
                                {(
                                  weatherData?.list[0]?.main?.feels_like -
                                  273.15
                                ).toFixed()}
                                <sup>°C</sup>
                              </span>
                            </p>

                            <p>
                              {t("humidity")}:{" "}
                              <span>
                                {weatherData?.list[0]?.main?.humidity} %
                              </span>
                            </p>
                            <p>
                              {t("pressure")}:{" "}
                              <span>
                                {weatherData?.list[0]?.main?.pressure} mbar
                              </span>
                            </p>
                            <p>
                              {t("sea level")}:{" "}
                              <span>
                                {weatherData?.list[0]?.main?.sea_level} mbar
                              </span>
                            </p>
                            <p>
                              {t("ground level")}:{" "}
                              <span>
                                {weatherData?.list[0]?.main?.grnd_level} mbar
                              </span>
                            </p>
                          </div>
                          <div>
                            <p>
                              {t("sunset")}:{" "}
                              <span> {sunset.toLocaleTimeString()}</span>
                            </p>
                            <p>
                              {t("max temp")}.:{" "}
                              <span>
                                {" "}
                                {(
                                  weatherData?.list[0]?.main?.temp_max - 273.15
                                ).toFixed()}
                                <sup>°C</sup>
                              </span>
                            </p>
                            <p>
                              {t("min temp")}.:{" "}
                              <span>
                                {(
                                  weatherData?.list[0]?.main?.temp_min - 273.15
                                ).toFixed()}
                                <sup>°C</sup>
                              </span>
                            </p>
                            <p>
                              {t("temp. change")}:{" "}
                              <span>
                                {weatherData?.list[0]?.main?.temp_kf}
                                <sup>°K</sup>
                              </span>
                            </p>
                            <p>
                              {t("wind speed")}:{" "}
                              <span>
                                {weatherData?.list[0]?.wind?.speed} m/s
                              </span>
                            </p>
                            <p>
                              {t("wind direction")}:{" "}
                              <span>
                                {weatherData?.list[0]?.wind?.deg} {t("degrees")}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.dailyWeatherDetails}>
                      <div className={styles.forecastDetail}>
                        <h3>{t("5 day weather forecast")}</h3>
                        {dailyDataArray?.map((data, index) => {
                          return (
                            <>
                              <div key={index} className={styles.forecastData}>
                                <div>{data?.date?.slice(5, 11)}</div>
                                <div>
                                  {dailyDataArray != [] && (
                                    <img
                                      src={`https://openweathermap.org/img/wn/${data?.data[0]?.weather[0]?.icon}.png`}
                                    />
                                  )}
                                </div>
                                <div>
                                  {(
                                    data?.data[0]?.main?.temp_max - 273.15
                                  ).toFixed()}{" "}
                                  <sup>°C</sup>/{" "}
                                  {(
                                    data?.data[0]?.main?.temp_min - 273.15
                                  ).toFixed()}
                                  <sup>°C</sup>
                                </div>
                              </div>
                              <hr key={index + 1} />
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </section>
      </main>
    </>
  );
}
