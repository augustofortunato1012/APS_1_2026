import { mockClients, mockVehicles } from './mockData.js';

export const dataStore = {
  clients: structuredClone(mockClients),
  vehicles: structuredClone(mockVehicles),
};
