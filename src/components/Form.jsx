// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components/DatePicker-Style.css";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Message from "../components/Message";
import UseUrlPosition from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = UseUrlPosition();
  const { createCity } = useCities();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [GeocodingError, setGeocodingError] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  useEffect(() => {
    async function fetchCityData() {
      if (!lat || !lng) return; // Ensure lat and lng are valid before fetching

      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);

        const data = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "That's not a country nor a city, try something else "
          );
        }
        console.log(data);

        setEmoji(convertToEmoji(data.countryCode));
        setCityName(data.city || data.locality || "");

        setCountry(data.countryName || "");
      } catch (err) {
        setGeocodingError(err.message);
        // Log the error for debugging
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityData();
  }, [lat, lng]); // Dependency array to trigger the fetch when lat or lng changelat or lng changes
  if (isLoadingGeocoding) {
    return <Spinner />;
  }
  if (GeocodingError) {
    return <Message message={GeocodingError} />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={(e) => handleSubmit(e)}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
