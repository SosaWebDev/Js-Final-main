const { Router } = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const router = Router();

const url = process.env.MONGODB_URI || require("../secrets/mongodb.json").url;
const client = new MongoClient(url);

const getCollection = async (dbName, collectionName) => {
  await client.connect();
  return client.db(dbName).collection(collectionName);
};

// GET all menu items
router.get("/", async (_, res) => {
  const collection = await getCollection("FoodTruckApi", "Menu");
  const menuItems = await collection.find({}).toArray();

  const formattedMenuItems = menuItems.map((menu) => ({
    id: menu._id,
    name: menu.name,
    description: menu.description, // Add description field
    price: menu.price, // Add price field
  }));

  res.json(formattedMenuItems);
});

// POST a new menu item
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;
  const collection = await getCollection("FoodTruckApi", "Menu");

  await collection.insertOne({ name, description, price });
  res.json({ message: "Menu item added" });
});

// PUT update a menu item
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const collection = await getCollection("FoodTruckApi", "Menu");

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, description, price } }
    );

    res.json({ message: "Menu item updated" });
  } catch (error) {
    console.error("Error updating menu item", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE a menu item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const collection = await getCollection("FoodTruckApi", "Menu");

  const deletedItem = await collection.findOne({ _id: new ObjectId(id) });
  if (!deletedItem) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  await collection.deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Menu item deleted" });
});

module.exports = router;
