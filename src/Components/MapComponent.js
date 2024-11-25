import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const MapComponent = ({ latitude, longitude, setLatitude, setLongitude, fetchAddress }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA-dqS5UsYWq-v-iwMTlqUsqh7sAFjgSs8",
  });

  useEffect(() => {
    // Verificar si geolocalización está disponible
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Current position:", { latitude, longitude });
          setLatitude(latitude);
          setLongitude(longitude);
          fetchAddress(latitude, longitude); // Obtener la dirección con las coordenadas
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, [setLatitude, setLongitude, fetchAddress]);

  // Manejar doble clic en el mapa para actualizar la ubicación y dirección
  const handleMapDblClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    console.log("New coordinates:", { lat: newLat, lng: newLng });
    setLatitude(newLat);
    setLongitude(newLng);
    fetchAddress(newLat, newLng); // Actualizar dirección con las nuevas coordenadas
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      center={{ lat: latitude, lng: longitude }}
      zoom={14}
      mapContainerStyle={{ width: "100%", height: "360px", borderRadius: "8px" }}
      onDblClick={handleMapDblClick}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};

export default MapComponent;
