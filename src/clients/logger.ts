import pino from 'pino';
import MongoTransport from '../middlewares/mongoTransport';
import {Db, MongoClient} from "mongodb";
import pinoPretty from 'pino-pretty';

let logger: pino.Logger | undefined;

async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
    const uri = process.env.CONNECTION_MONGO as string;
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('dementiapp_db');
    return {client, db};
}

async function createLogger() {
    const {client, db} = await connectToDatabase();
    const mongoTransport = new MongoTransport({
        client,
        db,
        collection: 'logs',
    });
    logger = pino({
        level: 'info',
        formatters: {
            log: (object) => ({...object, timestamp: new Date().toISOString()}),
        },
    }, pino.multistream([
        {stream: mongoTransport as any},
        {stream: pinoPretty({ colorize: true })},
    ]));
}

export const initializeLogger = async () => {
    await createLogger();
    if (!logger) {
        throw new Error('Logger initialization failed');
    }
};

export const getLogger = () => {
    if (!logger) {
        throw new Error('Logger is not initialized');
    }
    return logger;
};
