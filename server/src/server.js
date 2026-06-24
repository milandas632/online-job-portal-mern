import app from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import Category from './models/Category.js';

const defaultCategories = [
  'Software Development',
  'Data & Analytics',
  'Design',
  'Marketing',
  'Finance',
  'Human Resources'
];

async function ensureDefaultCategories() {
  for (const name of defaultCategories) {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    await Category.findOneAndUpdate(
      { slug },
      { $setOnInsert: { name, slug } },
      { upsert: true, new: true }
    );
  }
}

async function start() {
  await connectDatabase();
  await ensureDefaultCategories();

  app.listen(env.port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${env.port}`);
  });
}

start().catch((error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
