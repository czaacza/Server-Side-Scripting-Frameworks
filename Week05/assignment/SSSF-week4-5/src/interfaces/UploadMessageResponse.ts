/*
{
  message: 'cat uploaded',
  data: {
    filename: string,
    location: geoJSON point,
  },
}
*/

import {Point} from 'geojson';

export default interface UploadMessageResponse {
  message: string;
  data: {
    filename: string;
    location: Point;
  };
}
