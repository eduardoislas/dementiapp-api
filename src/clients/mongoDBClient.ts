const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.CONNECTION_MONGO;

export const DBclient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let isConnected = false;

export async function connectToDatabase() {
  if (!isConnected) {
    try {
      await DBclient.connect();
      await DBclient.db("dementiapp_db").command({ ping: 1 });
      isConnected = true;
      console.log('You successfully connected to Database!');
    } catch (e) {
      console.error("Failed to connect to Database", e);
      throw e;
    }
  }
  return DBclient.db("dementiapp_db");
}
connectToDatabase().catch(console.dir);
