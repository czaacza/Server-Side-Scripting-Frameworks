interface location {
  lat: number;
  lng: number;
}

interface locationInput {
  topRight: location;
  bottomLeft: location;
}

export type { locationInput };
