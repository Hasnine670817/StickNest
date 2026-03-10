import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    full_name TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_price REAL,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    name TEXT,
    quantity INTEGER,
    price REAL,
    artwork TEXT,
    FOREIGN KEY(order_id) REFERENCES orders(id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/signup", (req, res) => {
    const { email, password, fullName } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)");
      const info = stmt.run(email, password, fullName);
      res.json({ id: info.lastInsertRowid, email, fullName });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password) as any;
    if (user) {
      res.json({ id: user.id, email: user.email, fullName: user.full_name });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.post("/api/orders", (req, res) => {
    const { userId, items, totalPrice } = req.body;
    const insertOrder = db.prepare("INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)");
    const insertItem = db.prepare("INSERT INTO order_items (order_id, name, quantity, price, artwork) VALUES (?, ?, ?, ?, ?)");

    const transaction = db.transaction((orderData) => {
      const info = insertOrder.run(orderData.userId, orderData.totalPrice, "pending");
      const orderId = info.lastInsertRowid;
      for (const item of orderData.items) {
        insertItem.run(orderId, item.name, item.quantity, item.totalPrice, item.artwork);
      }
      return orderId;
    });

    try {
      const orderId = transaction({ userId, items, totalPrice });
      res.json({ orderId });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
