import path from 'node:path';
import express from 'express';
import clientRoutes from './routes/clientRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';

export const app = express();

app.use(express.json());
app.use('/api/clients', clientRoutes);
app.use('/api/vehicles', vehicleRoutes);

const publicPath = path.resolve(process.cwd(), 'public');
app.use(express.static(publicPath));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'AutoService API' });
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

export default app;
