import app from './app.js';
import { config } from './config/env.js';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`AutoService running on http://localhost:${PORT}`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Porta ${PORT} já está sendo utilizada.`);
    console.error('Encerre o servidor anterior e execute novamente: npm run dev');
    process.exit(1);
  }

  console.error('Erro ao iniciar o servidor:', error.message);
  process.exit(1);
});
