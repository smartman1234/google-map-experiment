export async function getGeoLocation(input: string) {
  const locateUrl = `${process.env.POSITION_STACK_BASE_URL}${process.env.POSITION_STACK_ACCESS_KEY}&query=${input}`;
  const response = await fetch(locateUrl);
  const locate = await response.json();
  return locate.data[0];
}

export async function getTimeZone(lat: number, lng: number) {
  const tzURl = `${process.env.TIME_ZONE_API}${process.env.TIME_ZONE_ACCESS_KEY}&lat=${lat}&long=${lng}`;

  const response = await fetch(tzURl);

  const timeZone = await response.json();

  return timeZone;
}
