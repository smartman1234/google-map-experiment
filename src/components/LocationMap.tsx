import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { LocationMapProp } from "../types";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

function LocationMap({ location, markers }: LocationMapProp) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.GOOGLE_API_KEY}`,
  });

  const [map, setMap] = useState(null);

  const [zoom, setZoom] = useState<number>(0);

  const onMount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(location);
    map.fitBounds(bounds);
    setMap(map);
    setZoom(16);
  }, []);

  useEffect(() => {});
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      onLoad={onLoad}
      onUnmount={onMount}
      zoom={zoom}
      onCenterChanged={() => setZoom(18)}
    >
      {markers?.length > 0 &&
        markers.map((marker, idx) => (
          <Marker
            key={`marker-${idx}`}
            position={marker}
            draggable={true}
            visible={true}
          />
        ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default LocationMap;
