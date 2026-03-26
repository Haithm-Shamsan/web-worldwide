import styles from "./CountryItem.module.css";
/* eslint-disable react/prop-types */
function CountryItem({ city }) {
  const { emoji, country } = city;
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
