import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import {getLogger, initializeLogger} from './clients/logger';
import assistantRoutes from './routes/assistantRoutes';
import alzaidDataRoutes from './routes/alzaidDataRoutes';
import {connectDB} from './clients/mongoDBClient';
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

(async () => {
    try {
        // Inicializar logger
        await initializeLogger();
        const logger = getLogger();
        logger.info('Logger initialized');

        //Conectar Mongoose
        await connectDB();
        logger.info('Database connected');

        // Rutas
        app.get('/', (req, res) => {
            res.send('Hello, Dementia App API is working!');
        });
        app.use('/assistant', assistantRoutes);
        app.use('/alzaid', alzaidDataRoutes);
        app.use('/users', userRoutes);

        // // Iniciar el servidor
        app.listen(port, () => {
            logger.info(`Server is running at http://localhost:${port}`);
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        const logger = getLogger();
        logger.error('Failed to initialize application:', error);
        process.exit(1);
    }
})();
