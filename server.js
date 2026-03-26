import User from "./User.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "url";
import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

/* ----------------------------- */
/* Setup __dirname for ES Module */
/* ----------------------------- */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* Load .env */
dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 5001;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentDB";

/* ----------------------------- */
/* Create uploads folder if not exists */
/* ----------------------------- */
const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log("✅ Created uploads folder");
}

/* ----------------------------- */
/* Initialize Express App */
/* ----------------------------- */
const app = express();

/* ----------------------------- */
/* Middleware */
/* ----------------------------- */
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || /^https?:\/\/localhost(:\d+)?$/.test(origin))
        return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
  })
);

app.use(express.json());

/* Serve uploaded files */
app.use("/uploads", express.static(uploadsPath));

/* ----------------------------- */
/* Test Route */
/* ----------------------------- */
app.get("/", (req, res) => {
  res.send(`<h2>✅ Backend running on port ${PORT}</h2><p>API: GET <a href="/api/users">/api/users</a>, GET /users, POST /register, POST /login</p>`);
});

/* ----------------------------- */
/* GET ALL USERS – from studentDB.users (same data as MongoDB Compass) */
/* ----------------------------- */
const getUsersHandler = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -confirmPassword")
      .sort({ createdAt: -1 })
      .lean();
    /* Ensure _id is string for frontend (same as MongoDB document) */
    const list = users.map((u) => ({
      ...u,
      _id: u._id?.toString?.() ?? u._id
    }));
    res.setHeader("Content-Type", "application/json");
    res.json(list);
  } catch (err) {
    console.error("GET users error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

app.get("/users", getUsersHandler);
app.get("/api/users", getUsersHandler);
/* Backup route – fetch MongoDB users (same data) */
app.get("/data/users", getUsersHandler);

/* ----------------------------- */
/* MongoDB Connection */
/* ----------------------------- */
const seedUsersWithRoles = async () => {
  const seedPath = path.join(__dirname, "src", "data", "users-with-roles.json");
  if (!fs.existsSync(seedPath)) return;

  try {
    const raw = fs.readFileSync(seedPath, "utf-8");
    const list = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) return;

    for (const u of list) {
      if (!u?.email || !u?.password) continue;

      const email = String(u.email).trim();
      const role = String(u.role || "user").toLowerCase();

      const existing = await User.findOne({
        email: new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
      }).lean();
      if (existing) continue;

      await User.create({
        ...u,
        email,
        role,
      });
    }

    console.log("✅ Seeded users from users-with-roles.json (if missing)");
  } catch (err) {
    console.error("Seed users error:", err);
  }
};

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await seedUsersWithRoles();
  })
  .catch((err) => console.log("Mongo Error:", err));

/* ----------------------------- */
/* Multer Setup (File Upload) */
/* ----------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsPath),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

/* ----------------------------- */
/* REGISTER API */
/* ----------------------------- */
app.post("/register", upload.single("file"), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      dateOfBirth,
      gender,
      address,
      state,
      city,
      zipCode,
      preferredLanguage,
      agreeToTerms,
    } = req.body;

    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      dateOfBirth,
      gender,
      address,
      state,
      city,
      zipCode,
      preferredLanguage,
      agreeToTerms: agreeToTerms === "true" ? "true" : "",
      file: req.file ? req.file.filename : null,
    });

    await user.save();

    res.json({ message: "✅ Registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ----------------------------- */
/* LOGIN API */
/* ----------------------------- */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({
      email: new RegExp(`^${email.trim()}$`, "i"),
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: "",
      user: {
        id: user._id?.toString?.() ?? user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: (user.role || "user").toLowerCase(),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});

/* ----------------------------- */
/* UPDATE USER */
/* ----------------------------- */
const updateUserHandler = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
app.put("/users/:id", updateUserHandler);
app.put("/api/users/:id", updateUserHandler);

/* ----------------------------- */
/* DELETE USER */
/* ----------------------------- */
const deleteUserHandler = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
app.delete("/users/:id", deleteUserHandler);
app.delete("/api/users/:id", deleteUserHandler);

/* ----------------------------- */
/* SERVE REACT APP (if dist exists) – one server for API + UI */
/* ----------------------------- */
const distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

/* ----------------------------- */
/* START SERVER (MUST BE LAST) */
/* ----------------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`   API: http://localhost:${PORT}/api/users`);
  if (fs.existsSync(distPath)) {
    console.log(`   App: open http://localhost:${PORT} in browser`);
  } else {
    console.log(`   Build React first: npm run build (then restart server)`);
  }
});






// (Removed duplicate /login route below listen)
