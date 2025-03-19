import express, { Request, Response } from "express"; import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/imgs", express.static("imgs"));

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Basic API is running 🚀");
});

app.get("/getProducts", async (req: Request, res: Response) => {
  try {
    const allProducts = await pool.query("SELECT * FROM products");
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/getProduct/:id", async (req: Request, res: Response) => {

  const id = req.params.id;
  
  try {
    const data = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    console.log(data.rows);
    res.json(data.rows);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
