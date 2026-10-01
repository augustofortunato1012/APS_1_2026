import type { Request, Response } from 'express';
import type { PostgrestError } from '@supabase/supabase-js';
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

const validBrazilianDdds = new Set([
  '11', '12', '13', '14', '15', '16', '17', '18', '19',
  '21', '22', '24', '27', '28',
  '31', '32', '33', '34', '35', '37', '38',
  '41', '42', '43', '44', '45', '46', '47', '48', '49',
  '51', '53', '54', '55',
  '61', '62', '63', '64', '65', '66', '67', '68', '69',
  '71', '73', '74', '75', '77', '79',
  '81', '82', '83', '84', '85', '86', '87', '88', '89',
  '91', '92', '93', '94', '95', '96', '97', '98', '99',
]);

function isValidClientName(name: string): boolean {
  return name.length <= 120 && /\p{L}/u.test(name) && /^[\p{L}\p{M}\s'’.\-]+$/u.test(name);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@.][^\s@]*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(email);
}

function normalizePhone(value: string): { phone: string; message: string | null } {
  if (!/^[\d()\s-]+$/.test(value)) {
    return { phone: '', message: 'Informe um telefone válido no formato (99) 99999-9999.' };
  }
  const digits = value.replace(/\D/g, '');
  if (!/^\d{11}$/.test(digits)) {
    return { phone: '', message: 'Informe um telefone válido no formato (99) 99999-9999.' };
  }
  if (!validBrazilianDdds.has(digits.slice(0, 2))) {
    return { phone: '', message: 'Informe um DDD brasileiro válido.' };
  }
  if (digits[2] !== '9') {
    return { phone: '', message: 'Informe um telefone válido no formato (99) 99999-9999.' };
  }
  return { phone: `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`, message: null };
}

function handleDatabaseError(res: Response, error: PostgrestError, duplicateMessage = 'E-mail já cadastrado.') {
  if (error.code === '23505') {
    res.status(409).json({ message: duplicateMessage });
    return;
  }

  console.error('Erro do Supabase ao acessar clientes:', error.message);
  res.status(500).json({ message: 'Não foi possível concluir a operação de clientes.' });
}

export const clientController = {
  async listClients(_req: Request, res: Response) {
    try {
      const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
      if (error) {
        handleDatabaseError(res, error);
        return;
      }
      res.json(data);
    } catch (error) {
      console.error('Falha ao listar clientes:', error);
      res.status(500).json({ message: 'Não foi possível listar os clientes.' });
    }
  },

  async getClient(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    if (!isUuid(id)) {
      res.status(400).json({ message: 'ID de cliente inválido.' });
      return;
    }

    try {
      const { data, error } = await supabase.from('clients').select('*').eq('id', id).maybeSingle();
      if (error) {
        handleDatabaseError(res, error);
        return;
      }
      if (!data) {
        res.status(404).json({ message: 'Cliente não encontrado.' });
        return;
      }
      res.json(data);
    } catch (error) {
      console.error('Falha ao consultar cliente:', error);
      res.status(500).json({ message: 'Não foi possível consultar o cliente.' });
    }
  },

  async createClient(req: Request, res: Response) {
    const payload = getPayload(req.body);
    const name = typeof payload.name === 'string' ? payload.name.trim() : '';
    const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
    const rawPhone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
    const phoneValidation = normalizePhone(rawPhone);
    const phone = phoneValidation.phone;

    if (!isValidClientName(name)) {
      res.status(400).json({ message: 'Informe um nome válido.' });
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

    if (!phone) {
      res.status(400).json({ message: rawPhone ? phoneValidation.message : 'Telefone é obrigatório.' });
      return;
    }

    if (email.length > 150 || phone.length > 20) {
      res.status(400).json({ message: 'Um ou mais campos excedem o tamanho permitido.' });
      return;
    }

    if (payload.active !== undefined && typeof payload.active !== 'boolean') {
      res.status(400).json({ message: 'O campo active deve ser booleano.' });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('clients')
        .insert({ name, email, phone, active: payload.active ?? true })
        .select('*')
        .single();
      if (error) {
        handleDatabaseError(res, error);
        return;
      }
      res.status(201).json(data);
    } catch (error) {
      console.error('Falha ao cadastrar cliente:', error);
      res.status(500).json({ message: 'Não foi possível cadastrar o cliente.' });
    }
  },

  async updateClient(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    if (!isUuid(id)) {
      res.status(400).json({ message: 'ID de cliente inválido.' });
      return;
    }

    try {
      const { data: existing, error: lookupError } = await supabase.from('clients').select('*').eq('id', id).maybeSingle();
      if (lookupError) {
        handleDatabaseError(res, lookupError);
        return;
      }
      if (!existing) {
        res.status(404).json({ message: 'Cliente não encontrado.' });
        return;
      }

      const payload = getPayload(req.body);
      const name = payload.name === undefined ? existing.name : typeof payload.name === 'string' ? payload.name.trim() : '';
      const email = payload.email === undefined ? existing.email : typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
      const rawPhone = payload.phone === undefined ? existing.phone : typeof payload.phone === 'string' ? payload.phone.trim() : '';
      const phoneValidation = normalizePhone(rawPhone);
      const phone = phoneValidation.phone;
      const active = payload.active === undefined ? existing.active : payload.active;

      if (!isValidClientName(name)) {
        res.status(400).json({ message: 'Informe um nome válido.' });
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
      if (!phone) {
        res.status(400).json({ message: rawPhone ? phoneValidation.message : 'Telefone é obrigatório.' });
        return;
      }
      if (email.length > 150 || phone.length > 20) {
        res.status(400).json({ message: 'Um ou mais campos excedem o tamanho permitido.' });
        return;
      }
      if (typeof active !== 'boolean') {
        res.status(400).json({ message: 'O campo active deve ser booleano.' });
        return;
      }

      const { data, error } = await supabase
        .from('clients')
        .update({ name, email, phone, active, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select('*')
        .maybeSingle();
      if (error) {
        handleDatabaseError(res, error);
        return;
      }
      if (!data) {
        res.status(404).json({ message: 'Cliente não encontrado.' });
        return;
      }
      res.json(data);
    } catch (error) {
      console.error('Falha ao atualizar cliente:', error);
      res.status(500).json({ message: 'Não foi possível atualizar o cliente.' });
    }
  },

  async deleteClient(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    if (!isUuid(id)) {
      res.status(400).json({ message: 'ID de cliente inválido.' });
      return;
    }

    try {
      const { data, error } = await supabase.from('clients').delete().eq('id', id).select('id').maybeSingle();
      if (error) {
        handleDatabaseError(res, error);
        return;
      }
      if (!data) {
        res.status(404).json({ message: 'Cliente não encontrado.' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Falha ao excluir cliente:', error);
      res.status(500).json({ message: 'Não foi possível excluir o cliente.' });
    }
  },

  async getClientVehicles(req: Request, res: Response) {
    const id = getRouteId(req.params.id);
    if (!isUuid(id)) {
      res.status(400).json({ message: 'ID de cliente inválido.' });
      return;
    }

    try {
      const { data: client, error: clientError } = await supabase.from('clients').select('id').eq('id', id).maybeSingle();
      if (clientError) {
        handleDatabaseError(res, clientError);
        return;
      }
      if (!client) {
        res.status(404).json({ message: 'Cliente não encontrado.' });
        return;
      }

      const { data, error } = await supabase.from('vehicles').select('*').eq('client_id', id).order('created_at', { ascending: false });
      if (error) {
        handleDatabaseError(res, error);
        return;
      }
      res.json(data);
    } catch (error) {
      console.error('Falha ao listar veículos do cliente:', error);
      res.status(500).json({ message: 'Não foi possível listar os veículos do cliente.' });
    }
  }
};
