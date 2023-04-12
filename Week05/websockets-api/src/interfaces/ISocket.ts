interface ServerToClientEvents {
  addAnimal: (message: string) => void;
  addSpecies: (message: string) => void;
}

interface ClientToServerEvents {
  update: (message: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

export {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
};
