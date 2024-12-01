import React, { createContext, useContext, useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { isLoaded: apiLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA-dqS5UsYWq-v-iwMTlqUsqh7sAFjgSs8",
  });

  useEffect(() => {
    if (apiLoaded) {
      setIsLoaded(true);
    }
  }, [apiLoaded]);

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};
