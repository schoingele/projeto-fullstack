import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from '../ormconfig';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
