import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import React from "react";
import { useCities} from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItems({ city }) {
  const {cities} = useCities();
  const {currentCity, deleteCity} = useCities()
  const { cityName, emoji, date, id, position } = city;


  function handleClick(e){
    e.preventDefault()
    deleteCity(id)
  }
  return (
    <li>
     <Link className={`${styles.cityItem} ${id === currentCity ? styles['cityItem--active']: ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
     <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}> {formatDate(date)} </time>
      <button onClick={handleClick}  className={styles.deleteBtn}>&times;</button>
     </Link>
    </li>
  );
}
