import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "password",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET: Home Page (Retrieve Items from DB)
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: result.rows, // Pass database results to frontend
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

// POST: Add Item to DB
app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  if (!item.trim()) {
    return res.redirect("/");
  }

  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding item");
  }
});

// POST: Edit Item in DB
app.post("/edit", async (req, res) => {
  const itemId = parseInt(req.body.updatedItemId);
  const updatedTitle = req.body.updatedItemTitle;

  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [
      updatedTitle,
      itemId,
    ]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating item");
  }
});

// POST: Delete Item from DB
app.post("/delete", async (req, res) => {
  const itemId = parseInt(req.body.deleteItemId);

  try {
    await db.query("DELETE FROM items WHERE id = $1", [itemId]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting item");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
