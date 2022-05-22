import { useEffect, useState } from "react";
import { SelfCoordinate } from "../types";

function useGeoLocation() {
  const [location, setLocation] = useState<SelfCoordinate>({
    loaded: false,
    lat: 0,
    lng: 0,
  });

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const onError = (error: any) => {
    throw new Error(error);
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError("Geolocation not supported");
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  return location;
}

export default useGeoLocation;
