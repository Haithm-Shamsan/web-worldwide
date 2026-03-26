import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

/* eslint react/prop-types: "off" */
const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

const initialState = {
  cities: [],
  currentCity: {},
  error: "",
};
function CitiesProvider({ children }) {
  const [{ cities, currentCity }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const Data = await fetch(`${BASE_URL}/cities`);
        const JsonData = await Data.json();
        {
          dispatch({ type: "cities/loaded", payload: JsonData });
        }
      } catch {
        dispatch({ type: "rejected", payload: "Error when loading cities" });
      }
    }

    fetchData();
  }, []);

  const getCity = useCallback(() => {
    return async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      try {
        const Data = await fetch(`${BASE_URL}/cities/${id}`);
        const JsonData = await Data.json();
        dispatch({ type: "city/loaded", payload: JsonData });
      } catch {
        dispatch({ type: "rejected", payload: "Error when loading city" });
      }
    };
  }, [currentCity.id]);

  async function createCity(newCity) {
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error when creating city" });
    }
  }

  async function deleteCity(id) {
    try {
      await fetch(`${BASE_URL}/city/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Error when deleting city" });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        currentCity: currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {" "}
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext Used outside the Porvider");
  return context;
}
export { CitiesProvider, useCities };
