interface Location {
  lat: number;
  lng: number;
}

interface LocationInput {
  topRight: Location;
  bottomLeft: Location;
}

export {LocationInput};
