
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
import nodemailer from "nodemailer";

// ============================================
// DATABASE CONFIGURATION
// ============================================
export const sequelize = new Sequelize("gamified-app", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

// ============================================
// APPLICATION CONFIGURATION
// ============================================
export const config = {
  // Application Settings
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  
  // Database Settings
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "gamified-app",
  DB_PORT: process.env.DB_PORT || 3306,
  
  // Session Secret
  SESSION_SECRET: process.env.SESSION_SECRET || "xianfire-secret-key-change-in-production",
  
  // Email Settings
  EMAIL_USER: process.env.EMAIL_USER || "your-email@gmail.com",
  EMAIL_PASS: process.env.EMAIL_PASS || "your-app-password",
  SEND_EMAIL_NOTIFICATIONS: process.env.SEND_EMAIL_NOTIFICATIONS !== "false",
  SEND_DAILY_DIGEST: process.env.SEND_DAILY_DIGEST === "true",
  
  // Social Features
  ENABLE_LEADERBOARDS: process.env.ENABLE_LEADERBOARDS !== "false",
  ENABLE_FRIENDS: process.env.ENABLE_FRIENDS !== "false",
  ENABLE_SOCIAL_SHARING: process.env.ENABLE_SOCIAL_SHARING !== "false"
};

// ============================================
// EMAIL TRANSPORTER CONFIGURATION
// ============================================
export const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  }
});

// Test email connection
export const testEmailConnection = async () => {
  try {
    await emailTransporter.verify();
    console.log("✅ Email service connected successfully");
    return true;
  } catch (error) {
    console.log("⚠️ Email service not configured. Email notifications disabled.");
    return false;
  }
};