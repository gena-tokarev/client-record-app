const fs = require("fs");
import * as dotenv from "dotenv";

const envFiles = [".env.demo", ".env.local", ".env"];

const envLoading = () =>
  envFiles.forEach((filePath) => {
    if (fs.existsSync(filePath)) {
      dotenv.config({ path: filePath });
      console.log(`Loaded ${filePath}`);
    }
  });

export default envLoading;
