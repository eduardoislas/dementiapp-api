import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import assistantRoutes from "./routes/assistantRoutes";

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

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
