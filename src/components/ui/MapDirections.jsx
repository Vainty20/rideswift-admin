import { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

export default function MapDirections({ pickupCoords, dropoffCoords }) {
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: 12,
  };

  const center = {
    lat: (pickupCoords.lat + dropoffCoords.lat) / 2,
    lng: (pickupCoords.lng + dropoffCoords.lng) / 2,
  };

  const calculateRoute = async () => {
    if (!pickupCoords || !dropoffCoords) return;

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: pickupCoords,
        destination: dropoffCoords,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirections(result);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && pickupCoords && dropoffCoords) {
      calculateRoute();
    }
  }, [isLoaded, pickupCoords, dropoffCoords]);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(pickupCoords);
    bounds.extend(dropoffCoords);
    map.fitBounds(bounds);
    setMap(map);
  }, [pickupCoords, dropoffCoords]);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return <>Loading...</>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}
