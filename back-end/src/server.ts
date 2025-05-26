import { connectDB } from "./config/db";
import { PORT } from "./config/env";
import app from "./app";

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(Number(PORT), () => {
  console.log(`Server running on port ${PORT}`);
});
