import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Application } from 'express';

import Server from './server';

const app: Application = express()
new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 6969;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});