import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Tulo from "./models/Tulo.js";
import Meno from "./models/Meno.js";
dotenv.config();

const app = express();
app.use(express.json());

// Tietokanta yhetys
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToDb();

// Terveystarkasus
app.get("/api/health", (req, res) => {
  res.json({ health: "Ok" });
});

// Tulo reitit
app.get("/api/tulot", async (req, res) => {
  try {
    const tulot = await Tulo.find();
    res.json(tulot);
  } catch (error) {
    console.error("Error fetching tulot:", error);
    res.status(500).json({ error: "Error fetching tulot" });
  }
});

app.get("/api/tulot/:id", async (req, res) => {
  try {
    const tulo = await Tulo.findById(req.params.id);
    if (tulo) {
      res.json(tulo);
    } else {
      res.status(404).json({ error: "Tulo not found" });
    }
  } catch (error) {
    console.error("Error fetching tulo:", error);
    res.status(500).json({ error: "Error fetching tulo" });
  }
});

app.post("/api/tulot", async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const newTulo = new Tulo({ name, amount, category });
    await newTulo.save();
    res.status(201).json(newTulo);
  } catch (error) {
    console.error("Error creating tulo:", error);
    res.status(500).json({ error: "Error creating tulo" });
  }
});

app.delete("/api/tulot/:id", async (req, res) => {
  try {
    const deletedTulo = await Tulo.findByIdAndDelete(req.params.id);
    if (deletedTulo) {
      res.json(deletedTulo);
    } else {
      res.status(404).json({ error: "Tulo not found" });
    }
  } catch (error) {
    console.error("Error deleting tulo:", error);
    res.status(500).json({ error: "Error deleting tulo" });
  }
});

// Meno reitit
app.get("/api/menot", async (req, res) => {
  try {
    const menot = await Meno.find();
    res.json(menot);
  } catch (error) {
    console.error("Error fetching menot:", error);
    res.status(500).json({ error: "Error fetching menot" });
  }
});

app.get("/api/menot/:id", async (req, res) => {
  try {
    const meno = await Meno.findById(req.params.id);
    if (meno) {
      res.json(meno);
    } else {
      res.status(404).json({ error: "Meno not found" });
    }
  } catch (error) {
    console.error("Error fetching meno:", error);
    res.status(500).json({ error: "Error fetching meno" });
  }
});

app.post("/api/menot", async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const newMeno = new Meno({ name, amount, category });
    await newMeno.save();
    res.status(201).json(newMeno);
  } catch (error) {
    console.error("Error creating meno:", error);
    res.status(500).json({ error: "Error creating meno" });
  }
});

app.delete("/api/menot/:id", async (req, res) => {
  try {
    const deletedMeno = await Meno.findByIdAndDelete(req.params.id);
    if (deletedMeno) {
      res.json(deletedMeno);
    } else {
      res.status(404).json({ error: "Meno not found" });
    }
  } catch (error) {
    console.error("Error deleting meno:", error);
    res.status(500).json({ error: "Error deleting meno" });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
