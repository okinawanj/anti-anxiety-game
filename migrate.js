
    /*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
    
import { Sequelize } from "sequelize";
import { sequelize } from "./models/db.js";
import { User, AnxietyLog, Challenge, Badge, Friend, Notification, Activity, Leaderboard } from "./models/userModel.js";
import inquirer from "inquirer";

// Server-level connection (no database selected)
const rootSequelize = new Sequelize("mysql://root:@localhost:3306/");

const { createDb } = await inquirer.prompt([
  {
    type: "confirm",
    name: "createDb",
    message: "Database 'gamified-app' may not exist. Create it?",
    default: true,
  },
]);

if (createDb) {
  await rootSequelize.query("CREATE DATABASE IF NOT EXISTS `gamified-app`;");
  console.log("✅ Database created (if it did not exist)");
}

try {
  await sequelize.authenticate();
  console.log("✅ Connected to MySQL database!");
  await sequelize.sync({ force: true }); // Drops and recreates tables
  console.log("✅ Tables created:");
  console.log("   - Users (with gamification & profile fields)");
  console.log("   - AnxietyLogs (breathing exercise tracking)");
  console.log("   - Challenges (daily/weekly challenges)");
  console.log("   - Badges (achievements)");
  console.log("   - Friends (friend connections)");
  console.log("   - Notifications (in-app notifications)");
  console.log("   - Activity (activity feed)");
  console.log("   - Leaderboard (ranking data)");
  console.log("\n🎉 Migration complete! All new social features ready.");
} catch (err) {
  console.error("❌ Migration failed:", err);
} finally {
  process.exit();
}

