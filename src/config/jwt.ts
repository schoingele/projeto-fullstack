import dotenv from 'dotenv';

dotenv.config();

export default {
  secret: process.env.JWT_SECRET || 'troque_esta_chave',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};
