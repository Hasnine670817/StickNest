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
    full_name TEXT,
    profile_image TEXT,
    role TEXT DEFAULT 'user'
  );
`);

// Migration: Add role column if it doesn't exist
const tableInfo = db.prepare("PRAGMA table_info(users)").all() as any[];
const hasRoleColumn = tableInfo.some(col => col.name === 'role');
if (!hasRoleColumn) {
  db.exec("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'");
  console.log("Added 'role' column to 'users' table");
}

db.exec(`
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

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    category TEXT,
    image_url TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    discount_percentage REAL,
    expiry_date DATETIME,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sample_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    address TEXT,
    product_name TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS artwork_uploads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    file_url TEXT,
    file_type TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS content_management (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE,
    value TEXT
  );
`);

// Migration: Add is_blocked column to users if it doesn't exist
const usersTableInfo = db.prepare("PRAGMA table_info(users)").all() as any[];
if (!usersTableInfo.some(col => col.name === 'is_blocked')) {
  db.exec("ALTER TABLE users ADD COLUMN is_blocked INTEGER DEFAULT 0");
}

// Seed products if empty
const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (productCount.count === 0) {
  console.log("Seeding initial products...");
  const insertProduct = db.prepare(`
    INSERT INTO products (name, description, price, category, image_url, is_active)
    VALUES (?, ?, ?, ?, ?, 1)
  `);

  const initialProducts = [
    // Stickers
    { name: 'Die cut stickers', category: 'stickers', image: 'https://picsum.photos/seed/diecut/200/200' },
    { name: 'Circle stickers', category: 'stickers', image: 'https://picsum.photos/seed/circle/200/200' },
    { name: 'Rectangle stickers', category: 'stickers', image: 'https://picsum.photos/seed/rect/200/200' },
    { name: 'Square stickers', category: 'stickers', image: 'https://picsum.photos/seed/square/200/200' },
    { name: 'Oval stickers', category: 'stickers', image: 'https://picsum.photos/seed/oval/200/200' },
    { name: 'Bumper stickers', category: 'stickers', image: 'https://picsum.photos/seed/bumper/200/200' },
    { name: 'Sticker sheets', category: 'stickers', image: 'https://picsum.photos/seed/sheets/200/200' },
    { name: 'Kiss cut stickers', category: 'stickers', image: 'https://picsum.photos/seed/kiss/200/200' },
    { name: 'Rounded corner stickers', category: 'stickers', image: 'https://picsum.photos/seed/rounded/200/200' },
    { name: 'Clear stickers', category: 'stickers', image: 'https://picsum.photos/seed/clear/200/200' },
    { name: 'Transfer stickers', category: 'stickers', image: 'https://picsum.photos/seed/transfer/200/200' },
    { name: 'Vinyl lettering', category: 'stickers', image: 'https://picsum.photos/seed/vinyl/200/200' },
    { name: 'Window clings', category: 'stickers', image: 'https://picsum.photos/seed/window/200/200' },
    { name: 'Front adhesive stickers', category: 'stickers', image: 'https://picsum.photos/seed/front/200/200' },
    { name: 'Holographic stickers', category: 'stickers', image: 'https://picsum.photos/seed/holo/200/200' },
    { name: 'Glitter stickers', category: 'stickers', image: 'https://picsum.photos/seed/glitter/200/200' },
    { name: 'Fabric stickers', category: 'stickers', image: 'https://picsum.photos/seed/fabric/200/200' },
    { name: 'Economy stickers', category: 'stickers', image: 'https://picsum.photos/seed/eco/200/200' },
    { name: 'Sticker packs', category: 'stickers', image: 'https://picsum.photos/seed/packs/200/200' },

    // Labels
    { name: 'Roll labels', category: 'labels', image: 'https://picsum.photos/seed/roll/200/200' },
    { name: 'Sheet labels', category: 'labels', image: 'https://picsum.photos/seed/sheet/200/200' },
    { name: 'Die cut labels', category: 'labels', image: 'https://picsum.photos/seed/diecutl/200/200' },
    { name: 'Circle labels', category: 'labels', image: 'https://picsum.photos/seed/circlel/200/200' },
    { name: 'Rectangle labels', category: 'labels', image: 'https://picsum.photos/seed/rectl/200/200' },
    { name: 'Square labels', category: 'labels', image: 'https://picsum.photos/seed/squarel/200/200' },
    { name: 'Oval labels', category: 'labels', image: 'https://picsum.photos/seed/ovall/200/200' },
    { name: 'Clear labels', category: 'labels', image: 'https://picsum.photos/seed/clearl/200/200' },

    // Magnets
    { name: 'Car magnets', category: 'magnets', image: 'https://picsum.photos/seed/carmag/200/200' },
    { name: 'Refrigerator magnets', category: 'magnets', image: 'https://picsum.photos/seed/refmag/200/200' },
    { name: 'Die cut magnets', category: 'magnets', image: 'https://picsum.photos/seed/diecutmag/200/200' },
    { name: 'Circle magnets', category: 'magnets', image: 'https://picsum.photos/seed/circlemag/200/200' },
    { name: 'Rectangle magnets', category: 'magnets', image: 'https://picsum.photos/seed/rectmag/200/200' },
    { name: 'Square magnets', category: 'magnets', image: 'https://picsum.photos/seed/squaremag/200/200' },
    { name: 'Oval magnets', category: 'magnets', image: 'https://picsum.photos/seed/ovalmag/200/200' },

    // Buttons
    { name: 'Round buttons', category: 'buttons', image: 'https://picsum.photos/seed/roundbtn/200/200' },
    { name: 'Square buttons', category: 'buttons', image: 'https://picsum.photos/seed/squarebtn/200/200' },
    { name: 'Oval buttons', category: 'buttons', image: 'https://picsum.photos/seed/ovalbtn/200/200' },
    { name: 'Rectangle buttons', category: 'buttons', image: 'https://picsum.photos/seed/rectbtn/200/200' },

    // Packaging
    { name: 'Poly mailers', category: 'packaging', image: 'https://picsum.photos/seed/poly/200/200' },
    { name: 'Bubble mailers', category: 'packaging', image: 'https://picsum.photos/seed/bubble/200/200' },
    { name: 'Custom tape', category: 'packaging', image: 'https://picsum.photos/seed/tape/200/200' },
    { name: 'Mailer boxes', category: 'packaging', image: 'https://picsum.photos/seed/box/200/200' },

    // Apparel
    { name: 'T-shirts', category: 'apparel', image: 'https://picsum.photos/seed/tshirt/200/200' },
    { name: 'Hoodies', category: 'apparel', image: 'https://picsum.photos/seed/hoodie/200/200' },
    { name: 'Sweatshirts', category: 'apparel', image: 'https://picsum.photos/seed/sweat/200/200' },
    { name: 'Canvas bags', category: 'apparel', image: 'https://picsum.photos/seed/bag/200/200' },

    // Acrylics
    { name: 'Acrylic charms', category: 'acrylics', image: 'https://picsum.photos/seed/charm/200/200' },
    { name: 'Acrylic keychains', category: 'acrylics', image: 'https://picsum.photos/seed/keychain/200/200' },
    { name: 'Acrylic pins', category: 'acrylics', image: 'https://picsum.photos/seed/pin/200/200' },
    { name: 'Acrylic stands', category: 'acrylics', image: 'https://picsum.photos/seed/stand/200/200' },

    // More products
    { name: 'Custom coasters', category: 'more', image: 'https://picsum.photos/seed/coaster/200/200' },
    { name: 'Custom puzzles', category: 'more', image: 'https://picsum.photos/seed/puzzle/200/200' },
    { name: 'Custom mousepads', category: 'more', image: 'https://picsum.photos/seed/mousepad/200/200' },
    { name: 'Custom wall graphics', category: 'more', image: 'https://picsum.photos/seed/wall/200/200' }
  ];

  const insertMany = db.transaction((products) => {
    for (const p of products) {
      insertProduct.run(p.name, `Custom ${p.name.toLowerCase()}`, 10.00, p.category, p.image);
    }
  });

  insertMany(initialProducts);
  console.log(`Seeded ${initialProducts.length} products.`);
}

// Migration: Add samples if they don't exist
const samplesExist = db.prepare("SELECT COUNT(*) as count FROM products WHERE category = 'samples'").get() as { count: number };
if (samplesExist.count === 0) {
  console.log("Adding sample products...");
  const insertProduct = db.prepare(`
    INSERT INTO products (name, description, price, category, image_url, is_active)
    VALUES (?, ?, ?, ?, ?, 1)
  `);
  
  const samples = [
    { name: 'Custom sticker samples', category: 'samples', price: 9.00, image: 'https://i.ibb.co.com/BVqzHNZK/custom-sticker-samples.png' },
    { name: 'Clear sticker samples', category: 'samples', price: 9.00, image: 'https://i.ibb.co.com/gZdxnzHH/clear-sticker-samples.png' },
    { name: 'Glitter sticker samples', category: 'samples', price: 9.00, image: 'https://i.ibb.co.com/CpgCcQ12/glitter-sticker-samples.png' },
    { name: 'Holographic sticker samples', category: 'samples', price: 9.00, image: 'https://i.ibb.co.com/X0rM4C3/holographic-sticker-samples.png' },
    { name: 'Custom magnet samples', category: 'samples', price: 9.00, image: 'https://i.ibb.co.com/chHfMBmQ/magnet-samples.png' },
    { name: 'Custom label samples', category: 'samples', price: 9.00, image: 'https://i.ibb.co.com/qYnVFRmp/label-samples.png' },
    { name: 'Clear label samples', category: 'samples', price: 9.00, image: 'https://i.ibb.co.com/Gv9xVDP6/clear-label-samples.png' },
    { name: 'Custom coaster samples', category: 'samples', price: 9.00, image: 'https://i.ibb.co.com/k60qRLCz/coaster-samples.png' },
    { name: 'Custom tape sample', category: 'samples', price: 4.00, image: 'https://i.ibb.co.com/pvQgfznX/packaging-tape-sample.png' },
    { name: 'Custom poly mailer samples', category: 'samples', price: 9.00, image: 'https://i.ibb.co.com/0jdrgjrm/poly-mailer-samples.png' },
    { name: 'Custom bubble mailer samples', category: 'samples', price: 9.00, image: 'https://i.ibb.co.com/rRWpW2kd/bubble-mailer-samples.png' }
  ];

  for (const s of samples) {
    insertProduct.run(s.name, `Custom ${s.name.toLowerCase()}`, s.price, s.category, s.image);
  }
  console.log(`Added ${samples.length} sample products.`);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  // Ensure specific admin user exists
  try {
    const adminEmail = 'hasnine4010@gmail.com';
    const adminPass = '123456';
    
    // Force recreate admin to be absolutely sure
    db.prepare("DELETE FROM users WHERE LOWER(email) = LOWER(?)").run(adminEmail);
    db.prepare("INSERT INTO users (email, password, full_name, role) VALUES (?, ?, ?, ?)").run(adminEmail, adminPass, 'Admin Hasnine', 'admin');
    console.log('Admin user seeded: hasnine4010@gmail.com / 123456');
  } catch (err) {
    console.error('Failed to seed admin user:', err);
  }

  app.post("/api/signup", (req, res) => {
    const { email, password, fullName, profileImage } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (email, password, full_name, profile_image, role) VALUES (?, ?, ?, ?, ?)");
      const info = stmt.run(email, password, fullName, profileImage || null, 'user');
      res.json({ id: info.lastInsertRowid, email, fullName, profileImage, role: 'user' });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.post("/api/login", (req, res) => {
    const email = req.body.email?.toString().trim().toLowerCase();
    const password = req.body.password?.toString().trim();
    
    console.log(`Login attempt for: ${email}`);

    // Hardcoded backdoor for the specific admin request
    if (email === 'hasnine4010@gmail.com' && password === '123456') {
      console.log("Admin backdoor triggered");
      let admin = db.prepare("SELECT * FROM users WHERE LOWER(email) = ?").get(email) as any;
      
      if (!admin) {
        console.log("Admin not found in DB, creating on the fly...");
        db.prepare("INSERT INTO users (email, password, full_name, role) VALUES (?, ?, ?, ?)").run('hasnine4010@gmail.com', '123456', 'Admin Hasnine', 'admin');
        admin = db.prepare("SELECT * FROM users WHERE LOWER(email) = ?").get(email) as any;
      }
      
      if (admin) {
        return res.json({ 
          id: admin.id, 
          email: admin.email, 
          fullName: admin.full_name, 
          profileImage: admin.profile_image, 
          role: 'admin' 
        });
      }
    }
    
    const user = db.prepare("SELECT * FROM users WHERE LOWER(email) = ? AND password = ?").get(email, password) as any;
    if (user) {
      console.log(`Login success: ${email} (Role: ${user.role})`);
      res.json({ id: user.id, email: user.email, fullName: user.full_name, profileImage: user.profile_image, role: user.role });
    } else {
      console.log(`Login failed: ${email} - Password provided: ${password}`);
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

  app.get("/api/orders/:userId", (req, res) => {
    const { userId } = req.params;
    try {
      const orders = db.prepare(`
        SELECT o.*, GROUP_CONCAT(oi.name || ' (x' || oi.quantity || ')') as items_summary
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.user_id = ?
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `).all(userId);
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/order-details/:orderId", (req, res) => {
    const { orderId } = req.params;
    try {
      const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(orderId);
      if (!order) return res.status(404).json({ error: "Order not found" });
      
      const items = db.prepare("SELECT * FROM order_items WHERE order_id = ?").all(orderId);
      res.json({ ...order, items });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Admin APIs
  app.get("/api/admin/stats", (req, res) => {
    try {
      const totalSales = db.prepare("SELECT SUM(total_price) as total FROM orders").get() as any;
      const totalOrders = db.prepare("SELECT COUNT(*) as count FROM orders").get() as any;
      const totalUsers = db.prepare("SELECT COUNT(*) as count FROM users").get() as any;
      const pendingOrders = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'").get() as any;
      
      res.json({
        totalSales: totalSales?.total || 0,
        totalOrders: totalOrders?.count || 0,
        totalUsers: totalUsers?.count || 0,
        pendingOrders: pendingOrders?.count || 0
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/top-products", (req, res) => {
    try {
      const topProducts = db.prepare(`
        SELECT p.name, p.image_url, COUNT(oi.id) as sales
        FROM products p
        LEFT JOIN order_items oi ON p.name = oi.name
        GROUP BY p.id
        ORDER BY sales DESC
        LIMIT 5
      `).all();
      res.json(topProducts);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/chart-data", (req, res) => {
    try {
      const chartData = db.prepare(`
        SELECT strftime('%m', created_at) as month, SUM(total_price) as revenue
        FROM orders
        GROUP BY month
        ORDER BY month
      `).all();
      res.json(chartData);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/orders", (req, res) => {
    try {
      const orders = db.prepare(`
        SELECT o.*, u.full_name as customer_name, u.email as customer_email,
               GROUP_CONCAT(oi.name || ' (x' || oi.quantity || ')') as items_summary
        FROM orders o
        JOIN users u ON o.user_id = u.id
        LEFT JOIN order_items oi ON o.id = oi.order_id
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `).all();
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/admin/orders/:orderId/status", (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, orderId);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/admin/users", (req, res) => {
    try {
      const users = db.prepare(`
        SELECT u.id, u.email, u.full_name, u.role, u.profile_image, u.is_blocked, u.created_at,
               (SELECT COUNT(*) FROM orders WHERE user_id = u.id) as total_orders
        FROM users u
      `).all();
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/admin/users/:userId/block", (req, res) => {
    const { userId } = req.params;
    const { isBlocked } = req.body;
    try {
      db.prepare("UPDATE users SET is_blocked = ? WHERE id = ?").run(isBlocked ? 1 : 0, userId);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/admin/users/:userId", (req, res) => {
    const { userId } = req.params;
    try {
      db.prepare("DELETE FROM users WHERE id = ?").run(userId);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Products CRUD
  app.get("/api/products", (req, res) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      const products = db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/products", (req, res) => {
    const { name, description, price, category, image_url } = req.body;
    try {
      const info = db.prepare("INSERT INTO products (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)")
        .run(name, description, price, category, image_url);
      res.json({ id: info.lastInsertRowid });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/admin/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, image_url, is_active } = req.body;
    try {
      db.prepare("UPDATE products SET name = ?, description = ?, price = ?, category = ?, image_url = ?, is_active = ? WHERE id = ?")
        .run(name, description, price, category, image_url, is_active ? 1 : 0, Number(id));
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/admin/products/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM products WHERE id = ?").run(Number(id));
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Artworks
  app.get("/api/admin/artworks", (req, res) => {
    try {
      const artworks = db.prepare(`
        SELECT a.*, u.full_name as user_name 
        FROM artwork_uploads a
        JOIN users u ON a.user_id = u.id
        ORDER BY a.created_at DESC
      `).all();
      res.json(artworks);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/admin/artworks/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      db.prepare("UPDATE artwork_uploads SET status = ? WHERE id = ?").run(status, id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Coupons
  app.get("/api/admin/coupons", (req, res) => {
    try {
      const coupons = db.prepare("SELECT * FROM coupons ORDER BY created_at DESC").all();
      res.json(coupons);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/coupons", (req, res) => {
    const { code, discount_percentage, expiry_date } = req.body;
    try {
      const info = db.prepare("INSERT INTO coupons (code, discount_percentage, expiry_date) VALUES (?, ?, ?)")
        .run(code, discount_percentage, expiry_date);
      res.json({ id: info.lastInsertRowid });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/admin/coupons/:id/status", (req, res) => {
    const { id } = req.params;
    const { is_active } = req.body;
    try {
      db.prepare("UPDATE coupons SET is_active = ? WHERE id = ?").run(is_active ? 1 : 0, id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/admin/coupons/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM coupons WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Sample Requests
  app.get("/api/admin/samples", (req, res) => {
    try {
      const samples = db.prepare("SELECT * FROM sample_requests ORDER BY created_at DESC").all();
      res.json(samples);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/admin/samples/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      db.prepare("UPDATE sample_requests SET status = ? WHERE id = ?").run(status, id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Content Management
  app.get("/api/admin/content", (req, res) => {
    try {
      const content = db.prepare("SELECT * FROM content_management").all();
      res.json(content);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/content", (req, res) => {
    const { key, value } = req.body;
    try {
      db.prepare("INSERT OR REPLACE INTO content_management (key, value) VALUES (?, ?)").run(key, value);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Settings
  app.get("/api/admin/settings", (req, res) => {
    try {
      const settings = db.prepare("SELECT * FROM settings").all();
      res.json(settings);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/admin/settings", (req, res) => {
    const { key, value } = req.body;
    try {
      db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(key, value);
      res.json({ success: true });
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
