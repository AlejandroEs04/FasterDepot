import { CorsOptions } from 'cors';

const allowedOrigins = ['https://www.fasterdepot.com']

export const corsOptions: CorsOptions = {
  origin: allowedOrigins, 
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type,Authorization'
};
