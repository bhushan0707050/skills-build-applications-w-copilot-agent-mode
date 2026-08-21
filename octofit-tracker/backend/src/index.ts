import express from 'express';
import { connectDatabase, default as database } from './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const app = express();
const port = 8000;

const getApiBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-${port}.app.github.dev` : `http://localhost:${port}`;
};

app.use(express.json());
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: database.readyState === 1 ? 'connected' : 'disconnected' });
});

const resourceRoutes = [
  ['/api/users/', User],
  ['/api/teams/', Team],
  ['/api/activities/', Activity],
  ['/api/leaderboard/', Leaderboard],
  ['/api/workouts/', Workout],
] as const;

for (const [path, model] of resourceRoutes) {
  app.get(path, async (_request, response) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      console.error(`Unable to load ${path}:`, error);
      response.status(503).json({ error: 'The data service is unavailable' });
    }
  });
}

app.post('/api/users/', async (request, response) => {
  try {
    response.status(201).json(await User.create(request.body));
  } catch (error) {
    response.status(400).json({ error: error instanceof Error ? error.message : 'Invalid user' });
  }
});

app.post('/api/teams/', async (request, response) => {
  try {
    response.status(201).json(await Team.create(request.body));
  } catch (error) {
    response.status(400).json({ error: error instanceof Error ? error.message : 'Invalid team' });
  }
});

app.post('/api/activities/', async (request, response) => {
  try {
    response.status(201).json(await Activity.create(request.body));
  } catch (error) {
    response.status(400).json({ error: error instanceof Error ? error.message : 'Invalid activity' });
  }
});

app.get('/api/config/', (_request, response) => {
  response.json({ apiUrl: getApiBaseUrl() });
});

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

const startServer = async (): Promise<void> => {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening at ${getApiBaseUrl()}`);
  });
};

startServer().catch((error) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});