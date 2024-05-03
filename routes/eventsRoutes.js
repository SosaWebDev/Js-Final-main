const { Router } = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const router = Router();

const url = process.env.MONGODB_URI || require("../secrets/mongodb.json").url;
const client = new MongoClient(url);

const getCollection = async (dbName, collectionName) => {
  await client.connect();
  return client.db(dbName).collection(collectionName);
};


// GET all events
router.get("/", async (_, res) => {
  const collection = await getCollection("FoodTruckApi", "Events");
  const events = await collection.find({}).toArray();

  const formattedEvents = events.map((event) => ({
    id: event._id,
    name: event.name,
    location: event.location, 
    hour: event.hour,
    date: event.date 
  }));

  res.json(formattedEvents);
});



// GET a specific event by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await getCollection("FoodTruckApi", "Events");
    const event = await collection.findOne({ _id: new ObjectId(id) });

    res.json(event);
  } catch (error) {
    console.error("Error fetching event", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new event
router.post("/", async (req, res) => {
  try {
    const { name, location, date, hour } = req.body;
    const collection = await getCollection("FoodTruckApi", "Events");

    await collection.insertOne({ name, location, date, hour });
    res.json({ message: "Event added" });
  } catch (error) {
    console.error("Error adding event", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update an event
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, date, hour } = req.body;
    const collection = await getCollection("FoodTruckApi", "Events");

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, location, date, hour } }
    );

    res.json({ message: "Event updated" });
  } catch (error) {
    console.error("Error updating event", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE an event
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await getCollection("FoodTruckApi", "Events");

    await collection.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Event deleted" });
  } catch (error) {
    console.error("Error deleting event", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
