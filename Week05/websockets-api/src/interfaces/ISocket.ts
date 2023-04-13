interface ServerToClientEvents {
  addAnimal: (message: string) => void;
  addSpecies: (message: string) => void;
}

interface ClientToServerEvents {
  update: (message: string) => void;
}

export { ServerToClientEvents, ClientToServerEvents };
