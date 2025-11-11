

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
import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  points: { type: DataTypes.INTEGER, defaultValue: 0 },
  level: { type: DataTypes.INTEGER, defaultValue: 1 },
  streak: { type: DataTypes.INTEGER, defaultValue: 0 },
  totalSessions: { type: DataTypes.INTEGER, defaultValue: 0 },
  emailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  verificationToken: { type: DataTypes.STRING },
  profilePicture: { type: DataTypes.STRING },
  bio: { type: DataTypes.TEXT },
  isPublic: { type: DataTypes.BOOLEAN, defaultValue: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export const AnxietyLog = sequelize.define("AnxietyLog", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  anxietyLevel: { type: DataTypes.INTEGER, allowNull: false },
  beforeBreathing: { type: DataTypes.INTEGER, allowNull: false },
  afterBreathing: { type: DataTypes.INTEGER, allowNull: false },
  exerciseType: { type: DataTypes.STRING },
  duration: { type: DataTypes.INTEGER },
  note: { type: DataTypes.TEXT },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export const Challenge = sequelize.define("Challenge", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  challengeType: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  pointsReward: { type: DataTypes.INTEGER, defaultValue: 50 },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  completedAt: { type: DataTypes.DATE },
  expiresAt: { type: DataTypes.DATE }
});

export const Badge = sequelize.define("Badge", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  badgeType: { type: DataTypes.STRING },
  earnedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// New models for social features
export const Friend = sequelize.define("Friend", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  friendId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM("pending", "accepted", "blocked"), defaultValue: "pending" },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export const Notification = sequelize.define("Notification", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING }, // "badge", "level_up", "friend_request", "achievement"
  title: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  relatedUserId: { type: DataTypes.INTEGER },
  read: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export const Activity = sequelize.define("Activity", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  activityType: { type: DataTypes.STRING }, // "game_completed", "level_up", "badge_earned", "friend_added"
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  points: { type: DataTypes.INTEGER, defaultValue: 0 },
  isShared: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export const Leaderboard = sequelize.define("Leaderboard", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  rank: { type: DataTypes.INTEGER },
  points: { type: DataTypes.INTEGER },
  level: { type: DataTypes.INTEGER },
  gamesCompleted: { type: DataTypes.INTEGER, defaultValue: 0 },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export { sequelize }; 
