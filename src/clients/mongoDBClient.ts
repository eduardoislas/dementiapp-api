const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.CONNECTION_MONGO;

export const DBclient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await DBclient.connect();
    await DBclient.db("dementiapp_db").command({ ping: 1 });
    console.log("You successfully connected to Database!");
  } finally {
    await DBclient.close();
  }
}
run().catch(console.dir);
