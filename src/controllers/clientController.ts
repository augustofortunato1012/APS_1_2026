import { randomUUID } from 'node:crypto';
import type { Request, Response } from 'express';
import { mockClients, mockVehicles } from '../config/mockData.js';
import type { Client } from '../models/Client.js';

let clients: Client[] = structuredClone(mockClients);

function getRouteId(value: string | string[] | undefined): string {
  const id = Array.isArray(value) ? value[0] : value ?? '';
  return id.trim();
}

function findClientById(id: string) {
  return clients.find((client) => client.id === id);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const clientController = {
  async listClients(_req: Request, res: Response) {
    res.json(clients);
  },

  async getClient(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    const client = findClientById(id);

    if (!client) {
      res.status(404).json({ message: 'Cliente não encontrado.' });
      return;
    }

    res.json(client);
  },

  async createClient(req: Request, res: Response) {
    const payload = req.body ?? {};
    const name = String(payload.name ?? '').trim();
    const email = String(payload.email ?? '').trim();
    const phone = String(payload.phone ?? '').trim();
    const active = Boolean(payload.active);

    if (!name) {
      res.status(400).json({ message: 'Nome é obrigatório.' });
      return;
    }

    if (!email) {
      res.status(400).json({ message: 'E-mail é obrigatório.' });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ message: 'E-mail inválido.' });
      return;
    }

    const client: Client = {
      id: randomUUID(),
      name,
      email,
      phone,
      active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    clients = [client, ...clients];
    res.status(201).json(client);
  },

  async updateClient(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    const client = findClientById(id);

    if (!client) {
      res.status(404).json({ message: 'Cliente não encontrado.' });
      return;
    }

    const payload = req.body ?? {};
    const name = String(payload.name ?? client.name).trim();
    const email = String(payload.email ?? client.email).trim();
    const phone = String(payload.phone ?? client.phone).trim();
    const active = typeof payload.active === 'boolean' ? payload.active : client.active;

    if (!name) {
      res.status(400).json({ message: 'Nome é obrigatório.' });
      return;
    }

    if (!email) {
      res.status(400).json({ message: 'E-mail é obrigatório.' });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ message: 'E-mail inválido.' });
      return;
    }

    const updatedClient: Client = {
      ...client,
      name,
      email,
      phone,
      active,
      updated_at: new Date().toISOString(),
    };

    clients = clients.map((item) => (item.id === client.id ? updatedClient : item));
    res.json(updatedClient);
  },

  async deleteClient(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    const client = findClientById(id);

    if (!client) {
      res.status(404).json({ message: 'Cliente não encontrado.' });
      return;
    }

    const linkedVehicles = structuredClone(mockVehicles).some((vehicle) => vehicle.client_id === client.id);

    if (linkedVehicles) {
      res.status(400).json({ message: 'Este cliente possui veículos vinculados.' });
      return;
    }

    clients = clients.filter((item) => item.id !== client.id);
    res.status(204).send();
  },

  async getClientVehicles(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    const client = findClientById(id);

    if (!client) {
      res.status(404).json({ message: 'Cliente não encontrado.' });
      return;
    }

    const vehicles = structuredClone(mockVehicles).filter((vehicle) => vehicle.client_id === client.id);
    res.json(vehicles);
  }
};
