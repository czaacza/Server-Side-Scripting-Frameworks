/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import {TestAnimal} from '../src/interfaces/Animal';

// add test for graphql query
const getAnimals = async (url: string | Function): Promise<TestAnimal[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `query Animals {
  animals {
    id
    animal_name
    species {
      id
      species_name
      category {
        id
        category_name
      }
      image
      location {
        type
        coordinates
      }
    }
    birthdate
    image
    location {
      type
      coordinates
    }
  }
}`,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const animals = response.body.data.animals as TestAnimal[];
          resolve(animals);
        }
      });
  });
};

// add test for grapgql modifyAnimal mutation
const modifyAnimal = async (
  url: string | Function,
  animal: TestAnimal
): Promise<TestAnimal> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        mutation: `mutation ModifyAnimal($modifyAnimalId: ID!, $animalName: String, $birthdate: DateTime) {
  modifyAnimal(id: $modifyAnimalId, animal_name: $animalName, birthdate: $birthdate) {
    id
    animal_name
    species {
      id
      species_name
      category {
        id
        category_name
      }
      image
    }
    birthdate
    image
    location {
      type
      coordinates
    }
  }
}`,
        variables: {
          modifyAnimalId: animal.id,
          animalName: animal.animal_name,
          birthdate: animal.birthdate,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const modifiedAnimal = response.body.data.modifyAnimal as TestAnimal;
          expect(modifiedAnimal.id).toBe(animal.id);
          expect(modifiedAnimal.animal_name).toBe(animal.animal_name);
          expect(modifiedAnimal.birthdate).toBe(animal.birthdate);
          resolve(modifiedAnimal);
        }
      });
  });
};

export {getAnimals, modifyAnimal};
