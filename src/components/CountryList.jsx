import styles from "./CountryList.module.css";
/* eslint-disable react/prop-types */
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CountryList() {
  const { cities } = useCities();
  if (!cities.length) {
    return <Message message={"Add your first city by clicking on the map"} />;
  }
  const countries = cities.reduce((arr, city) => {
    if (!arr.some((el) => el.country === city.country)) {
      return [
        ...arr,
        {
          country: city.country,
          emoji: city.emoji,
        },
      ];
    } else {
      return arr;
    }
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((city) => (
        <CountryItem city={city} key={Math.random()} />
      ))}
    </ul>
  );
}

export default CountryList;
