import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import assistantRoutes from "./routes/assistantRoutes";
import alzaidDataRoutes from "./routes/alzaidDataRoutes";
import {DBclient} from "./clients/mongoDBClient";

const app = express();
const port = 3000;

// Middleware CORS
app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.send('Hello, Dementia App API is working!');
});
app.use('/assistant', assistantRoutes);
app.use('/alzaid', alzaidDataRoutes);

// Iniciar la DB
async function startApp() {
  try {
    await DBclient.connect();
  } catch (err) {
    console.error('Error connecting DB:', err);
  }
}

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
