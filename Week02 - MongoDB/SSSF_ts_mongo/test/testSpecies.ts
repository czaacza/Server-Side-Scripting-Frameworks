// TODO: Add tests for the following:
// 1. Get all species
// 2. Get species by id
// 3. Post species
// 4. Put species
// 5. Delete species
// 6. Get all species from bounding box
/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import {
  ISpecies,
  ISpeciesObject,
  ISpeciesTest,
} from '../src/interfaces/Species';
import DBMessageResponse from '../src/interfaces/DBMessageResponse';

const getAllSpecies = (url: string | Function): Promise<ISpeciesTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/api/v1/species')
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const categories: ISpeciesTest[] = response.body;
          categories.forEach((specie) => {
            specie = specie as ISpeciesTest;

            expect(specie._id).not.toBe('');
            expect(specie.species_name).not.toBe('');
          });
          resolve(categories);
        }
      });
  });
};

const getSpecies = (url: string | Function, id: number): Promise<ISpecies> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`/api/v1/species/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const species: ISpecies = response.body;
          expect(species._id).toBe(id);
          expect(species.species_name).not.toBe('');
          expect(species.species_name).not.toBe('');

          resolve(species);
        }
      });
  });
};

const postSpecies = (
  url: string | Function,
  species: ISpeciesObject
): Promise<DBMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/api/v1/species')
      .send(species)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: DBMessageResponse = response.body;
          expect(message.message).toBe('Species created');
          expect((message.data as ISpecies).species_name).toBe(
            species.species_name
          );
          expect((message.data as ISpecies).image).toBe(species.image);
          expect((message.data as ISpecies).location).toBe(species.location);

          resolve(message);
        }
      });
  });
};
const deleteSpecies = (
  url: string | Function,
  id: number
): Promise<DBMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(`/api/v1/species/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const message: DBMessageResponse = response.body;
          expect(message.message).toBe('Species deleted');
          expect((message.data as ISpecies)._id).toBe(id);
          resolve(message);
        }
      });
  });
};

export {getAllSpecies, postSpecies, deleteSpecies};
