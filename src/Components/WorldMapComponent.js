import React, { useState, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useGoogleMaps } from './GoogleMapsContext';

const WorldMapComponent = () => {
  const markers = [
    { coords: { lat: 31.230391, lng: 121.473701 }, name: "Shanghai" },
    { coords: { lat: 28.704060, lng: 77.102493 }, name: "Delhi" },
  ];

  const initialCenter = { lat: 20, lng: 0 }; // Coordenadas iniciales
  const initialZoom = 2; // Nivel de zoom inicial

  const [zoom, setZoom] = useState(initialZoom); // Estado para manejar el nivel de zoom
  const [center, setCenter] = useState(initialCenter); // Estado para manejar el centro del mapa

  const mapRef = useRef(); // Ref para almacenar la instancia del mapa

  // Usamos el hook del contexto para verificar si la API de Google Maps se ha cargado
  const { isLoaded } = useGoogleMaps();

  const handleMarkerClick = (coords) => {
    setCenter(coords); // Cambia el centro del mapa al marcador clickeado
    setZoom(15); // Aumenta el zoom cuando se hace clic en un marcador
    if (mapRef.current) {
      mapRef.current.setZoom(15); // Ajusta también el zoom del mapa
    }
  };

  const resetView = () => {
    setCenter(initialCenter); // Restaura el centro inicial
    setZoom(initialZoom); // Restaura el zoom inicial
    if (mapRef.current) {
      mapRef.current.setZoom(initialZoom); // Ajusta el zoom inicial
    }
  };

  const enforceZoomLimits = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      if (currentZoom < initialZoom) {
        mapRef.current.setZoom(initialZoom); // Corrige el zoom si está por debajo del nivel inicial
      } else {
        setZoom(currentZoom); // Actualiza el estado del zoom si es válido
      }
    }
  };

  if (!isLoaded) return <div>Loading map...</div>; // Muestra un mensaje mientras la API no esté cargada

  return (
    <div>
      <button onClick={resetView} style={{ marginBottom: '10px' }}>
        Volver a la vista inicial
      </button>
      <GoogleMap
        mapContainerStyle={{ width: '80%', height: '400px' }}
        center={center}
        zoom={zoom}
        onLoad={(map) => {
          mapRef.current = map; // Guardamos la referencia al mapa
          map.addListener('zoom_changed', enforceZoomLimits); // Añadimos el listener para controlar el zoom
        }}
        options={{
          minZoom: initialZoom, // Nivel mínimo de zoom directamente en las opciones del mapa
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.name} // Asegúrate de que la clave del marcador sea única
            position={marker.coords}
            title={marker.name}
            onClick={() => handleMarkerClick(marker.coords)} // Llama a la función handleMarkerClick cuando se hace clic
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default WorldMapComponent;
