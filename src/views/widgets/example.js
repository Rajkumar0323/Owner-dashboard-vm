import "dotenv/config";
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createServer } from "http";
import { Server } from "socket.io";

const { hash, compare } = bcrypt;
const { sign } = jwt;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

// Database Connection
const db = mysql.createConnection({
  uri: "mysql://root:dUEdritgUvgMjyLWCPFiIfOLljrGGZAH@tramway.proxy.rlwy.net:56900/railway",
});
db.connect((err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to MySQL Database.");
});

// connected owner will be stored in thsi 
let ownerSockets = {};

// Signup 
app.post("/signup", async (req, res) => {
  const { name, mobile, address, email, password } = req.body;
  const hashedPassword = await hash(password, 10);

  db.query(
    "INSERT INTO owners (name, mobile, address, email, password) VALUES (?, ?, ?, ?, ?)",
    [name, mobile, address, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Signup successful" });
    }
  );
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM owners WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(400).json({ message: "User not found" });

      const validPassword = await compare(password, results[0].password);
      if (!validPassword)
        return res.status(401).json({ message: "Invalid password" });

      const token = sign({ id: results[0].id }, process.env.JWT_SECRET, {
        expiresIn: "1h", 
      });

      res.json({ token, owner: results[0] });
    }
  );
});

// Visitor Entry
app.post("/visitor-entry", (req, res) => {
  const { ownerId, reason, capturedImage } = req.body;
  const date = new Date().toISOString();
  const date2 = new Date().toISOString().slice(0, 19).replace("T", " ");
  db.query(
    "INSERT INTO visitors (owner_id, reason, image,date) VALUES (?, ?, ?,?)",
    [ownerId, reason, capturedImage, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      // Notify the owner
      if (ownerSockets[ownerId]) {
        io.to(ownerSockets[ownerId]).emit("newVisitor", {
          ownerId,
          reason,
          image:capturedImage,
          date,
          
        });
      }

      res.status(201).json({ message: "Visitor recorded" });
    }
  );
});

// Get Visitors List
app.get("/visitors/:ownerId", (req, res) => {
  const { ownerId } = req.params;

  db.query(
    "SELECT * FROM visitors WHERE owner_id = ? ORDER BY id DESC",
    [ownerId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// Owner Connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("registerOwner", (ownerId) => {
    ownerSockets[ownerId] = socket.id;
    console.log(`Owner ${ownerId} connected with socket ID: ${socket.id}`);
  });

  socket.on("visitorRequest", ({ data, socketId }) => {
    if (ownerSockets[data.ownerId]) {
        console.log("Visitor's socket ID:", socketId);

        io.to(ownerSockets[data.ownerId]).emit("newVisitor", { 
            data, 
            socketId 
        });
    }
    console.log("Socket Id----",socket.id);
    
});


  socket.on("ownerResponse", (data) => {
    io.to(data.socketId).emit("visitorResponse", data);
    console.log("Status---",data.status);
    console.log("Status---",data.socketId);
    
  });

  socket.on("disconnect", () => {
    for (const [ownerId, socketId] of Object.entries(ownerSockets)) {
      if (socketId === socket.id) {
        delete ownerSockets[ownerId];
        break;
      }
    }
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));