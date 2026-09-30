import { randomUUID } from 'node:crypto';
import type { Request, Response } from 'express';
import { dataStore } from '../config/store.js';
import type { Vehicle } from '../models/Vehicle.js';

function getRouteId(value: string | string[] | undefined): string {
  const id = Array.isArray(value) ? value[0] : value ?? '';
  return id.trim();
}

function findVehicleById(id: string) {
  return dataStore.vehicles.find((vehicle) => vehicle.id === id);
}

export const vehicleController = {
  async listVehicles(_req: Request, res: Response) {
    res.json(dataStore.vehicles);
  },

  async getVehicle(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    const vehicle = findVehicleById(id);

    if (!vehicle) {
      res.status(404).json({ message: 'Veículo não encontrado.' });
      return;
    }

    res.json(vehicle);
  },

  async createVehicle(req: Request, res: Response) {
    const payload = req.body ?? {};
    const clientId = String(payload.client_id ?? '').trim();
    const brand = String(payload.brand ?? '').trim();
    const model = String(payload.model ?? '').trim();
    const plate = String(payload.license_plate ?? '').trim().toUpperCase();
    const year = payload.year === undefined || payload.year === null || payload.year === '' ? null : Number(payload.year);
    const active = Boolean(payload.active);

    if (!clientId) {
      res.status(400).json({ message: 'Proprietário é obrigatório.' });
      return;
    }

    if (!brand) {
      res.status(400).json({ message: 'Marca é obrigatória.' });
      return;
    }

    if (!model) {
      res.status(400).json({ message: 'Modelo é obrigatório.' });
      return;
    }

    if (!plate) {
      res.status(400).json({ message: 'Placa é obrigatória.' });
      return;
    }

    const clientExists = dataStore.clients.some((client) => client.id === clientId);

    if (!clientExists) {
      res.status(400).json({ message: 'Cliente informado não existe.' });
      return;
    }

    const vehicle: Vehicle = {
      id: randomUUID(),
      client_id: clientId,
      brand,
      model,
      year,
      license_plate: plate,
      active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    dataStore.vehicles = [vehicle, ...dataStore.vehicles];
    res.status(201).json(vehicle);
  },

  async updateVehicle(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    const vehicle = findVehicleById(id);

    if (!vehicle) {
      res.status(404).json({ message: 'Veículo não encontrado.' });
      return;
    }

    const payload = req.body ?? {};
    const clientId = String(payload.client_id ?? vehicle.client_id).trim();
    const brand = String(payload.brand ?? vehicle.brand).trim();
    const model = String(payload.model ?? vehicle.model).trim();
    const plate = String(payload.license_plate ?? vehicle.license_plate).trim().toUpperCase();
    const year = payload.year === undefined || payload.year === null || payload.year === '' ? vehicle.year : Number(payload.year);
    const active = typeof payload.active === 'boolean' ? payload.active : vehicle.active;

    if (!clientId) {
      res.status(400).json({ message: 'Proprietário é obrigatório.' });
      return;
    }

    if (!brand) {
      res.status(400).json({ message: 'Marca é obrigatória.' });
      return;
    }

    if (!model) {
      res.status(400).json({ message: 'Modelo é obrigatório.' });
      return;
    }

    if (!plate) {
      res.status(400).json({ message: 'Placa é obrigatória.' });
      return;
    }

    const clientExists = dataStore.clients.some((client) => client.id === clientId);

    if (!clientExists) {
      res.status(400).json({ message: 'Cliente informado não existe.' });
      return;
    }

    const updatedVehicle: Vehicle = {
      ...vehicle,
      client_id: clientId,
      brand,
      model,
      year,
      license_plate: plate,
      active,
      updated_at: new Date().toISOString(),
    };

    dataStore.vehicles = dataStore.vehicles.map((item) => (item.id === vehicle.id ? updatedVehicle : item));
    res.json(updatedVehicle);
  },

  async deleteVehicle(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    const vehicle = findVehicleById(id);

    if (!vehicle) {
      res.status(404).json({ message: 'Veículo não encontrado.' });
      return;
    }

    dataStore.vehicles = dataStore.vehicles.filter((item) => item.id !== vehicle.id);
    res.status(204).send();
  }
};
