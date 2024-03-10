import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 3000; // Use port 3000 as a default if PORT is not defined

app.listen(port, (error) => {
  if (error) {
    return console.error(error);
  }

  console.log(`Server started at ${port}`);
});
