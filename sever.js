const { MongoClient, ServerApiVersion } = require("mongodb");
/* DATABASE */
const URL_mongo = process.env.URL_mongo;
const client = new MongoClient(URL_mongo, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let playersCollection;
/* CONNECT DATABASE */
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db();
    playersCollection = db.collection("user");
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
    process.exit(1);
  }
}
