/* eslint-disable react/prop-types */
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;

  const { currentCity, deleteCity } = useCities();

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  function handleOnDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className="emoji">{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={(e) => handleOnDelete(e)}>
          x
        </button>{" "}
      </Link>{" "}
    </li>
  );
}

export default CityItem;
