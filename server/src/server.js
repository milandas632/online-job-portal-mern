import app from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { populateDemoData } from './populateDemoData.js';

async function start() {
  await connectDatabase();

  if (String(process.env.POPULATE_DEMO_DATA || 'false') === 'true') {
    await populateDemoData();
  }

  app.listen(env.port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${env.port}`);
  });
}

start().catch((error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
