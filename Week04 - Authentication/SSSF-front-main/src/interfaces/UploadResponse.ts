import { Point } from 'geojson';

interface UploadResponse {
  message: string;
  data: {
    filename: string;
    location: Point;
  };
}

export type { UploadResponse };
