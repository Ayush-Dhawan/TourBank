import { createContext, useContext, useEffect, useReducer, useState } from "react";

const CitiesContext = createContext();

function reducer(state, action){
  switch(action.type){
    case 'loading':
      return{
        ...state, isLoading: true
      }
    case "cities/loaded":
      return{
        ...state, isLoading: false, cities: action.payload
      }
    case "rejected":
      return{
        ...state, err: action.payload
      }
    case 'city/loaded':
      return{
        ...state, isLoading: false, currentCity: action.payload
      }
    case 'city/created':
      return{
        ...state, currentCity: action.payload, isLoading: false, cities: [...state.cities, action.payload]
      }
    case 'city/deleted':
      return{
        ...state, currentCity: {},  isLoading: false, cities: state.cities.filter((city) => city.id !== action.payload)
      }
  }
}

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  err: "",
}

function CitiesProvider({ children}) {
  // const [cities, setCities] = useState([]);
  // const [currentCity, setCurrentcity] = useState({})
  // const [isLoading, setIsLoading] = useState(false);
  const [{cities, currentCity, isLoading, err}, dispatch] = useReducer(reducer, initialState)
  const URL = "http://localhost:7001";

  useEffect(function () {
    async function fetchCities() {
      dispatch({type: 'loading'})
      try {
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        dispatch({type: "cities/loaded", payload: data})
      } catch {
        // alert("Error loading the data");
        dispatch({type: 'rejected', payload: "Error loading data"})
      } 
    }

    fetchCities(); // Invoke the fetchCities function to fetch the data
  }, [URL]);

  function getCity(id) { // Add the 'id' parameter here
    async function fetchCity() {
      dispatch({type: 'loading'})
      try {
        const res = await fetch(`${URL}/cities/${id}`);
        const data = await res.json();
        dispatch({type: 'city/loaded', payload: data})
      } catch {
        alert("Error loading the city...");
      }
    }

    fetchCity(); // Call the inner fetchCity function to fetch the data
  }

  async function createCity(newCity) {
    dispatch({type: 'loading'})
    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      dispatch({type: 'city/loaded', payload: data})
      dispatch({type: 'city/created', payload: data})
    } catch {
      dispatch({type: 'rejected', payload: "Error loading data"})
    }
  }

  async function deleteCity(id) {
    dispatch({type: 'loading'})
    try {
      await fetch(`${URL}/cities/${id}`, { method: "DELETE" });

      dispatch({type: 'city/deleted', payload: id})
    } catch {
      dispatch({type: 'rejected', payload: "Error deleting city"})
    } 
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity}}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities(){
    const context = useContext(CitiesContext)
    if(context === undefined) throw new Error("used context outside cities provider")
    return context;
}

export { CitiesProvider, useCities };
