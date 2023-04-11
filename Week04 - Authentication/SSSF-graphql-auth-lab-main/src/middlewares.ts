import {NextFunction, Request, Response} from 'express';
import imageFromWikipedia from './functions/imageFromWikipedia';
import ErrorResponse from './interfaces/ErrorResponse';
import CustomError from './classes/CustomError';
import sharp from 'sharp';
import {ExifImage} from 'exif';
import {Point} from 'geojson';

// convert GPS coordinates to decimal format
// for longitude, send exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef
// for latitude, send exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef
const gpsToDecimal = (gpsData: number[], hem: string) => {
  let d = gpsData[0] + gpsData[1] / 60 + gpsData[2] / 3600;
  return hem === 'S' || hem === 'W' ? (d *= -1) : d;
};

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`🔍 - Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // console.log(err);
  const statusCode = err.status !== 200 ? err.status || 500 : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

const getWikiImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {species_name} = req.body;
    const image = await imageFromWikipedia(species_name);
    req.body.image = image;
    next();
  } catch (error) {
    next(error);
  }
};

const getCoordinates = (req: Request, res: Response, next: NextFunction) => {
  const defaultPoint: Point = {
    type: 'Point',
    coordinates: [24, 61],
  };
  try {
    console.log(req.file?.path);
    // TODO: Use node-exif to get longitude and latitude from imgFile
    // coordinates below should be an array of GPS coordinates in decimal format: [longitude, latitude]
    new ExifImage({image: req.file?.path}, (error, exifData) => {
      if (error) {
        console.log('eka', error);
        res.locals.coords = defaultPoint;
        next();
      } else {
        // console.log('exif data', exifData);
        try {
          const lon = gpsToDecimal(
            exifData.gps.GPSLongitude || [0, 0, 0],
            exifData.gps.GPSLongitudeRef || 'N'
          );
          const lat = gpsToDecimal(
            exifData.gps.GPSLatitude || [0, 0, 0],
            exifData.gps.GPSLatitudeRef || 'E'
          );
          const coordinates: Point = {
            type: 'Point',
            coordinates: [lon, lat],
          };
          res.locals.coords = coordinates;
          next();
        } catch (err) {
          console.log('toka', err);
          res.locals.coords = defaultPoint;
          next();
        }
      }
    });
  } catch (error) {
    console.log('kolmas', error);
    res.locals.coords = defaultPoint;
    next();
  }
};

const makeThumbnail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.file?.path);
    await sharp(req.file?.path)
      .resize(160, 160)
      .png()
      .toFile(req.file?.path + '_thumb');
    next();
  } catch (error) {
    next(new CustomError('Thumbnail not created', 500));
  }
};

export {notFound, errorHandler, getWikiImage, getCoordinates, makeThumbnail};
