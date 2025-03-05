// /* eslint-disable no-undef */
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { neon } from "@neondatabase/serverless";
// import dotenv from "dotenv";

// dotenv.config();
// const sql = neon(process.env.DATABASE_URL);

// const requestHandler = async (req, res) => {
//   const result = await sql`SELECT version()`;
//   const { version } = result[0];
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end(version);
// };

// const app = express();
// const port = process.env.PORT || 8000;

// app.use(
//   cors({
//     origin: true, //['https://shumon-mern-doctor.vercel.app']
//     methods: ["POST", "GET", "PUT", "DELETE"],
//   })
// );

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// app.get("/", (req, res) => {
//   res.send("API is working");
// });

// app.use(express.json());
// app.use(cookieParser());

/* eslint-disable no-undef */
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();
const sql = neon(process.env.DATABASE_URL);

const app = express();
const port = process.env.PORT || 8000;

// Middleware setup (order matters!)
app.use(
  cors({
    origin: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("API is working");
});

// Use requestHandler as an Express route
app.get("/version", async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.type("text/plain").send(version);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Database connection failed");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
