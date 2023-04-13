import { Animal } from '../interfaces/Animal';
import createAnimalModal from '../domFunctions/createAnimalModal';
import L from 'leaflet';
import { Modal } from 'bootstrap';

const allAnimalsToMap = (
  animalData: { animals: Animal[] },
  map: L.Map,
  targetModal: Element,
) => {
  animalData.animals.forEach((animal: any) => {
    const geojsonFeature: GeoJSON.Feature = {
      type: 'Feature',
      properties: {
        name: animal.animal_name,
        animal,
      },
      geometry: animal.location,
    };

    L.geoJSON(geojsonFeature, {
      onEachFeature: (feature, layer) => {
        const animal = feature.properties.animal;
        const modalContent = createAnimalModal(animal);

        layer.on('click', () => {
          targetModal.innerHTML = modalContent;
          const myModal = new Modal('#animal-modal');
          myModal.show();
        });
      },
      pointToLayer: (_feature, latlng) => {
        return L.marker(latlng, {
          icon: L.divIcon({ className: 'green-icon', iconSize: [16, 16] }),
        });
      },
    }).addTo(map);
  });
};

export { allAnimalsToMap };
