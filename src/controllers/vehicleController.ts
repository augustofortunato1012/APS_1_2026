import type { Request, Response } from 'express';
import type { PostgrestError } from '@supabase/supabase-js';
import { getVehicleModelMismatch, getVehicleYearMinimum } from '../config/vehicleYearMinimums.js';
import { supabase } from '../config/supabase.js';

function getRouteId(value: string | string[] | undefined): string {
  const id = Array.isArray(value) ? value[0] : value ?? '';
  return id.trim();
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

function getPayload(body: unknown): Record<string, unknown> {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) return {};
  return body as Record<string, unknown>;
}

function getYearValidationMessage(value: unknown, brand: string, model: string): string | null {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return 'Informe um ano inteiro válido.';
  }

  if (value < 1900) {
    return 'O ano deve ser igual ou posterior a 1900.';
  }

  if (value > new Date().getFullYear() + 1) {
    return 'O ano não pode ser posterior ao próximo ano.';
  }

  const minimum = getVehicleYearMinimum(brand, model);
  if (minimum && value < minimum.year) {
    return `O ${minimum.brand} ${minimum.model} deve possuir ano igual ou posterior a ${minimum.year}.`;
  }

  return null;
}

function normalizeLicensePlate(value: string): string {
  return value.trim().toUpperCase();
}

function isValidLicensePlate(value: string): boolean {
  return /^[A-Z]{3}(?:[0-9]{4}|[0-9][A-Z][0-9]{2})$/.test(value);
}

function handleDatabaseError(res: Response, error: PostgrestError) {
  if (error.code === '23505') {
    res.status(409).json({ message: 'Placa já cadastrada.' });
    return;
  }
  if (error.code === '23503') {
    res.status(400).json({ message: 'Cliente informado não existe.' });
    return;
  }

  console.error('Erro do Supabase ao acessar veículos:', error.message);
  res.status(500).json({ message: 'Não foi possível concluir a operação de veículos.' });
}

export const vehicleController = {
  async listVehicles(_req: Request, res: Response) {
    try {
      const { data, error } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });
      if (error) {
        handleDatabaseError(res, error);
        return;
      }
      res.json(data);
    } catch (error) {
      console.error('Falha ao listar veículos:', error);
      res.status(500).json({ message: 'Não foi possível listar os veículos.' });
    }
  },

  async getVehicle(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    if (!isUuid(id)) {
      res.status(400).json({ message: 'ID de veículo inválido.' });
      return;
    }

    try {
      const { data, error } = await supabase.from('vehicles').select('*').eq('id', id).maybeSingle();
      if (error) {
        handleDatabaseError(res, error);
        return;
      }
      if (!data) {
        res.status(404).json({ message: 'Veículo não encontrado.' });
        return;
      }
      res.json(data);
    } catch (error) {
      console.error('Falha ao consultar veículo:', error);
      res.status(500).json({ message: 'Não foi possível consultar o veículo.' });
    }
  },

  async createVehicle(req: Request, res: Response) {
    const payload = getPayload(req.body);
    const clientId = typeof payload.client_id === 'string' ? payload.client_id.trim() : '';
    const brand = typeof payload.brand === 'string' ? payload.brand.trim() : '';
    const model = typeof payload.model === 'string' ? payload.model.trim() : '';
    const plate = typeof payload.license_plate === 'string' ? normalizeLicensePlate(payload.license_plate.trim()) : '';
    const year = payload.year;

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

    if (!/\p{L}/u.test(brand) || brand.length > 80) {
      res.status(400).json({ message: 'Informe uma marca válida.' });
      return;
    }

    if (!/[\p{L}\p{N}]/u.test(model) || model.length > 80) {
      res.status(400).json({ message: 'Informe um modelo válido.' });
      return;
    }

    const modelMismatch = getVehicleModelMismatch(brand, model);
    if (modelMismatch) {
      res.status(400).json({ message: `O modelo ${modelMismatch.model} não pertence à marca ${modelMismatch.requestedBrand}.` });
      return;
    }

    const yearError = getYearValidationMessage(year, brand, model);
    if (yearError) {
      res.status(400).json({ message: yearError });
      return;
    }

    if (!plate) {
      res.status(400).json({ message: 'Placa é obrigatória.' });
      return;
    }

    if (!isValidLicensePlate(plate)) {
      res.status(400).json({ message: 'Informe uma placa brasileira válida.' });
      return;
    }

    if (!isUuid(clientId)) {
      res.status(400).json({ message: 'Cliente informado não existe.' });
      return;
    }
    if (plate.length > 10) {
      res.status(400).json({ message: 'Um ou mais campos excedem o tamanho permitido.' });
      return;
    }
    if (payload.active !== undefined && typeof payload.active !== 'boolean') {
      res.status(400).json({ message: 'O campo active deve ser booleano.' });
      return;
    }

    try {
      const { data: client, error: clientError } = await supabase.from('clients').select('id').eq('id', clientId).maybeSingle();
      if (clientError) {
        handleDatabaseError(res, clientError);
        return;
      }
      if (!client) {
        res.status(400).json({ message: 'Cliente informado não existe.' });
        return;
      }

      const { data, error } = await supabase
        .from('vehicles')
        .insert({ client_id: clientId, brand, model, year, license_plate: plate, active: payload.active ?? true })
        .select('*')
        .single();
      if (error) {
        handleDatabaseError(res, error);
        return;
      }
      res.status(201).json(data);
    } catch (error) {
      console.error('Falha ao cadastrar veículo:', error);
      res.status(500).json({ message: 'Não foi possível cadastrar o veículo.' });
    }
  },

  async updateVehicle(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    if (!isUuid(id)) {
      res.status(400).json({ message: 'ID de veículo inválido.' });
      return;
    }

    try {
      const { data: existing, error: lookupError } = await supabase.from('vehicles').select('*').eq('id', id).maybeSingle();
      if (lookupError) {
        handleDatabaseError(res, lookupError);
        return;
      }
      if (!existing) {
        res.status(404).json({ message: 'Veículo não encontrado.' });
        return;
      }

      const payload = getPayload(req.body);
      const clientId = payload.client_id === undefined ? existing.client_id : typeof payload.client_id === 'string' ? payload.client_id.trim() : '';
      const brand = payload.brand === undefined ? existing.brand : typeof payload.brand === 'string' ? payload.brand.trim() : '';
      const model = payload.model === undefined ? existing.model : typeof payload.model === 'string' ? payload.model.trim() : '';
      const plate = payload.license_plate === undefined ? existing.license_plate : typeof payload.license_plate === 'string' ? normalizeLicensePlate(payload.license_plate.trim()) : '';
      const year = payload.year === undefined ? existing.year : payload.year;
      const active = payload.active === undefined ? existing.active : payload.active;

      if (!isUuid(clientId)) {
        res.status(400).json({ message: 'Cliente informado não existe.' });
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

      if (!/\p{L}/u.test(brand) || brand.length > 80) {
        res.status(400).json({ message: 'Informe uma marca válida.' });
        return;
      }

      if (!/[\p{L}\p{N}]/u.test(model) || model.length > 80) {
        res.status(400).json({ message: 'Informe um modelo válido.' });
        return;
      }

      const modelMismatch = getVehicleModelMismatch(brand, model);
      if (modelMismatch) {
        res.status(400).json({ message: `O modelo ${modelMismatch.model} não pertence à marca ${modelMismatch.requestedBrand}.` });
        return;
      }

      const yearError = getYearValidationMessage(year, brand, model);
      if (yearError) {
        res.status(400).json({ message: yearError });
        return;
      }
      if (!plate) {
        res.status(400).json({ message: 'Placa é obrigatória.' });
        return;
      }
      if (!isValidLicensePlate(plate)) {
        res.status(400).json({ message: 'Informe uma placa brasileira válida.' });
        return;
      }
      if (plate.length > 10) {
        res.status(400).json({ message: 'Um ou mais campos excedem o tamanho permitido.' });
        return;
      }
      if (typeof active !== 'boolean') {
        res.status(400).json({ message: 'O campo active deve ser booleano.' });
        return;
      }

      const { data: client, error: clientError } = await supabase.from('clients').select('id').eq('id', clientId).maybeSingle();
      if (clientError) {
        handleDatabaseError(res, clientError);
        return;
      }
      if (!client) {
        res.status(400).json({ message: 'Cliente informado não existe.' });
        return;
      }

      const { data, error } = await supabase
        .from('vehicles')
        .update({ client_id: clientId, brand, model, year, license_plate: plate, active, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select('*')
        .maybeSingle();
      if (error) {
        handleDatabaseError(res, error);
        return;
      }
      if (!data) {
        res.status(404).json({ message: 'Veículo não encontrado.' });
        return;
      }
      res.json(data);
    } catch (error) {
      console.error('Falha ao atualizar veículo:', error);
      res.status(500).json({ message: 'Não foi possível atualizar o veículo.' });
    }
  },

  async deleteVehicle(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    if (!isUuid(id)) {
      res.status(400).json({ message: 'ID de veículo inválido.' });
      return;
    }

    try {
      const { data, error } = await supabase.from('vehicles').delete().eq('id', id).select('id').maybeSingle();
      if (error) {
        handleDatabaseError(res, error);
        return;
      }
      if (!data) {
        res.status(404).json({ message: 'Veículo não encontrado.' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Falha ao excluir veículo:', error);
      res.status(500).json({ message: 'Não foi possível excluir o veículo.' });
    }
  }
};
