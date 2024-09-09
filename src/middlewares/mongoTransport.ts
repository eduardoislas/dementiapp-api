import { Writable } from 'stream';
import { MongoClient, Db } from 'mongodb';

interface MongoDBTransportOptions {
  client: MongoClient;
  db: Db;
  collection: string;
}

class MongoTransport extends Writable {
  private collection: string;
  private client: MongoClient;
  private db: Db;

  constructor(opts: MongoDBTransportOptions) {
    super({ objectMode: true });
    this.collection = opts.collection;
    this.client = opts.client;
    this.db = opts.db;
  }

  async _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): Promise<void> {
    try {
      const msg = chunk.toString(); // Convert chunk to string
      const logEntry = JSON.parse(msg);
      await this.db.collection(this.collection).insertOne(logEntry);
      callback(); // Signal that writing is complete
    } catch (error: any) {
      console.error('Error writing log to MongoDB:', error);
      callback(error); // Pass error to callback
    }
  }
}
export default MongoTransport;
