import createSpeciesModal from '../domFunctions/createSpeciesModal';
import { Species } from '../interfaces/Species';
import L from 'leaflet';
import { Modal } from 'bootstrap';

// all species to map
const allSpeciesToMap = (
  speciesData: { species: Species[] },
  map: L.Map,
  targetModal: Element,
) => {
  speciesData.species.forEach((species: any) => {
    const geojsonFeature: GeoJSON.Feature = {
      type: 'Feature',
      properties: {
        name: species.species_name,
        species,
      },
      geometry: species.location,
    };

    L.geoJSON(geojsonFeature, {
      onEachFeature: (feature, layer) => {
        const species = feature.properties.species;
        const modalContent = createSpeciesModal(species);

        layer.on('click', () => {
          targetModal.innerHTML = modalContent;
          const myModal = new Modal('#animal-modal');
          myModal.show();
        });
      },
      pointToLayer: (_feature, latlng) => {
        return L.marker(latlng, {
          icon: L.divIcon({ className: 'red-icon', iconSize: [16, 16] }),
        });
      },
    }).addTo(map);
  });
};

export { allSpeciesToMap };
