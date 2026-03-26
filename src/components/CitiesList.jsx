import styles from "./CityList.module.css";
/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CitiesList() {
  const { cities } = useCities();
  if (!cities.length) {
    return <Message message={"Add your first city by clicking on the map"} />;
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CitiesList;
