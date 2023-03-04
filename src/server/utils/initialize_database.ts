import fs from 'node:fs/promises';

import { Database } from 'sqlite3';

import { DATABASE_PATH, DATABASE_SEED_PATH } from './database_paths';

export const initializeDatabase = async () => {
  await fs.copyFile(DATABASE_SEED_PATH, DATABASE_PATH);

  const db = new Database(DATABASE_PATH);

  await new Promise<void>((resolve, reject) => {
    db.run('CREATE INDEX index_product_id ON feature_item (productId)', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
