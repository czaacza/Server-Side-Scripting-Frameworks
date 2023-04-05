/* eslint-disable node/no-unpublished-import */
import {resolve} from 'path';
import request from 'supertest';
import {TestAnimal} from '../src/interfaces/Animal';

// add test for graphql query
/*
query Animals {
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
    }
    image
    location {
      type
      coordinates
    }
    birthdate
  }
}
*/
const getAnimals = (url: string | Function): Promise<TestAnimal[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .send({
        query: `
      query Animals {
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
          }
          image
          location {
            type
            coordinates
          }
          birthdate
        }
      }
    `,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const animals = response.body.data.animals as TestAnimal[];
          expect(animals.length).toBeGreaterThan(0);
          resolve(animals);
        }
      });
  });
};

// add test for graphql query
/*
mutation ModifyAnimal($modifyAnimalId: ID!, $birthdate: DateTime, $animalName: String, $species: ID) {
  modifyAnimal(id: $modifyAnimalId, birthdate: $birthdate, animal_name: $animalName, species: $species) {
    id
    animal_name
    species {
      species_name
      location {
        type
        coordinates
      }
      image
      id
      category {
        category_name
      }
    }
    birthdate
    image
    location {
      coordinates
      type
    }
  }
}
*/
const modifyAnimal = (
  url: string | Function,
  animal: TestAnimal
): Promise<TestAnimal> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .send({
        query: `
      mutation ModifyAnimal($modifyAnimalId: ID!, $birthdate: DateTime, $animalName: String, $species: ID) {
        modifyAnimal(id: $modifyAnimalId, birthdate: $birthdate, animal_name: $animalName, species: $species) {
          id
          animal_name
          species {
            species_name
            location {
              type
              coordinates
            }
            image
            id
            category {
              category_name
            }
          }
          birthdate
          image
          location {
            coordinates
            type
          }
        }
      }
    `,
        variables: {
          modifyAnimalId: animal.id,
          birthdate: animal.birthdate,
          animalName: animal.animal_name,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const modifiedAnimal = response.body.data.modifyAnimal as TestAnimal;
          expect(new Date(modifiedAnimal.birthdate!)).toStrictEqual(
            animal.birthdate
          );
          expect(modifiedAnimal.animal_name).toEqual(animal.animal_name);
          resolve(modifiedAnimal);
        }
      });
  });
};

export {getAnimals, modifyAnimal};
