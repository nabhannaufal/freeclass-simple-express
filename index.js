import express from "express";
import { nanoid } from "nanoid";

const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let items = [];

// Read All (GET)
app.get("/", (req, res) => {
  res.status(200).send({
    message: "success",
    items: items,
  });
});

// Create (POST)
app.post("/", (req, res) => {
  const newItem = { id: nanoid(5), ...req.body };
  items.push(newItem);
  res.status(200).send({
    message: "success",
    item: newItem,
  });
});

// Read One (GET)
app.get("/:id", (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);
  const item = items.find((i) => i.id === itemId);
  console.log(item, items);
  if (item) {
    res.send({
      message: "success",
      item,
    });
  } else {
    res.status(404).send({ message: "Item not found" });
  }
});

// Update (PUT)
app.put("/:id", (req, res) => {
  const itemId = req.params.id;
  const itemIndex = items.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    const updatedItem = { ...items[itemIndex], ...req.body, id: itemId };
    items[itemIndex] = updatedItem;
    res.send({
      message: "success",
      item: updatedItem,
    });
  } else {
    res.status(404).send({ message: "Item not found" });
  }
});

// Delete (DELETE)
app.delete("/:id", (req, res) => {
  const itemId = req.params.id;
  const itemIndex = items.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(200).send({ message: `Deleted id ${itemId} successfully` });
  } else {
    res.status(404).send({ message: "Item not found" });
  }
});

// hanlde not route not found
app.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
