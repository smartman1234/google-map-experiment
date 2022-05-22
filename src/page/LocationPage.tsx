import { Layout, Spin } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { getGeoLocation, getTimeZone } from "../api";
import LocationMap from "../components/LocationMap";
import LocationSearchBar from "../components/LocationSearchBar";
import { Coordinate, SearchHistory } from "../types";
import { OpenNotification } from "../utils";
import * as uuid from "uuid";
import LocationTable from "../components/LocationTable";
import useGeoLocation from "../hooks/useGeoLocation";

function LocationPage() {
  const [markers, setMarkers] = useState<Coordinate[]>([
    {
      lat: 43.70011,
      lng: -79.4163,
    },
  ]);

  const [location, setLocation] = useState<Coordinate>({
    lat: 43.70011,
    lng: -79.4163,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  const [showDrawer, setShowDrawer] = useState<boolean>(true);

  const meLocation = useGeoLocation();

  const searchHandler = async (val: string) => {
    setIsLoading(true);

    if (val.length === 0) {
      setIsLoading(false);
      return;
    }

    const geoLocation = await getGeoLocation(val);

    if (!geoLocation) {
      setIsLoading(false);
      return OpenNotification("Search Failed");
    }

    setLocation({ lat: geoLocation.latitude, lng: geoLocation.longitude });

    const timeZone = await getTimeZone(
      geoLocation.latitude,
      geoLocation.longitude
    );

    if (!timeZone) {
      setIsLoading(false);
      return OpenNotification("Time Zone Fetch Failed");
    }

    const generateKey = uuid.v4();

    setSearchHistory([
      ...searchHistory,
      {
        key: generateKey,
        location: geoLocation.label,
        coordinate: location,
        timeZone: timeZone.timezone,
        localTime: timeZone.date_time_txt,
      },
    ]);

    setMarkers([
      ...markers,
      {
        key: generateKey,
        lat: geoLocation.latitude,
        lng: geoLocation.longitude,
      },
    ]);

    setIsLoading(false);
  };

  const deleteHandler = async (key: React.Key[]) => {
    let updateData = searchHistory.filter(
      (history) => !key.includes(history.key)
    );
    let updateMarkers = markers.filter((marker) => !key.includes(marker.key!));

    setSearchHistory(updateData);
    setMarkers(updateMarkers);
  };

  const toggleDrawer = (val?: boolean) => {
    if (val) {
      return setShowDrawer(val);
    }
    setShowDrawer(!showDrawer);
  };

  const getMe = () => {
    if (!meLocation.loaded) {
      return OpenNotification("Me location is not ready");
    }
    setLocation({ lat: meLocation.lat, lng: meLocation.lng });
    setMarkers([...markers, { lat: meLocation.lat, lng: meLocation.lng }]);
  };

  useEffect(() => {}, [location, markers]);

  return (
    <>
      <Layout>
        <LocationSearchBar
          onSearch={searchHandler}
          onLocate={getMe}
          onShow={toggleDrawer}
          visible={showDrawer}
        />
        <LocationTable
          onShow={toggleDrawer}
          onDelete={deleteHandler}
          historyData={searchHistory}
          visible={showDrawer}
        />
        <Content style={{ display: "flex", justifyContent: "center" }}>
          <Spin tip={isLoading ? "Loading..." : ""} spinning={isLoading}>
            <LocationMap markers={markers} location={location} />
          </Spin>
        </Content>
      </Layout>
    </>
  );
}

export default LocationPage;
