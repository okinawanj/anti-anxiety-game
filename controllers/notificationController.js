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

import crypto from "crypto";
import { User, Notification } from "../models/userModel.js";
import { emailTransporter, config } from "../models/db.js";

// Send verification email
export const sendVerificationEmail = async (user) => {
  try {
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;

    user.verificationToken = verificationToken;
    await user.save();

    const mailOptions = {
      from: config.EMAIL_USER || "noreply@anxietyflow.com",
      to: user.email,
      subject: "Verify Your AnxietyFlow Account",
      html: `
        <h1>Welcome to AnxietyFlow! 🧘</h1>
        <p>Thank you for signing up. Please verify your email address to complete registration.</p>
        <a href="${verificationUrl}" style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #7c3aed;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        ">Verify Email</a>
        <p>Or copy this link: ${verificationUrl}</p>
        <p>This link expires in 24 hours.</p>
        <p>Remember: This app provides exercises for anxiety relief only. If you're experiencing severe anxiety, please consult with a healthcare professional.</p>
      `
    };

    await emailTransporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

// Verify email token
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Missing verification token" });
    }

    const user = await User.findOne({
      where: { verificationToken: token }
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.emailVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ success: true, message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ error: "Failed to verify email" });
  }
};

// Resend verification email
export const resendVerificationEmail = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const user = await User.findByPk(req.session.userId);

    if (user.emailVerified) {
      return res.status(400).json({ error: "Email already verified" });
    }

    const sent = await sendVerificationEmail(user);

    if (sent) {
      res.json({ success: true, message: "Verification email sent" });
    } else {
      res.status(500).json({ error: "Failed to send email" });
    }
  } catch (error) {
    console.error("Error resending verification email:", error);
    res.status(500).json({ error: "Failed to resend email" });
  }
};

// Send achievement notification
export const sendAchievementNotification = async (userId, badgeName) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) return;

    const notification = await Notification.create({
      userId,
      type: "achievement",
      title: "🏆 New Achievement!",
      message: `Congratulations! You've unlocked the ${badgeName} badge!`
    });

    // Also send email if available
    if (user.emailVerified) {
      const mailOptions = {
        from: config.EMAIL_USER || "noreply@anxietyflow.com",
        to: user.email,
        subject: `🏆 New Achievement - ${badgeName}`,
        html: `
          <h1>Congratulations, ${user.name}! 🎉</h1>
          <p>You've unlocked the <strong>${badgeName}</strong> badge!</p>
          <p>Keep up the great work on your anxiety relief journey!</p>
          <a href="http://localhost:3000/dashboard" style="
            display: inline-block;
            padding: 10px 20px;
            background-color: #7c3aed;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          ">View Your Profile</a>
        `
      };

      await emailTransporter.sendMail(mailOptions);
    }

    return notification;
  } catch (error) {
    console.error("Error sending achievement notification:", error);
  }
};

// Send level up notification
export const sendLevelUpNotification = async (userId, newLevel) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) return;

    await Notification.create({
      userId,
      type: "level_up",
      title: "⭐ Level Up!",
      message: `You've reached level ${newLevel}! You're amazing!`
    });

    if (user.emailVerified) {
      const mailOptions = {
        from: config.EMAIL_USER || "noreply@anxietyflow.com",
        to: user.email,
        subject: `⭐ Level ${newLevel} - Keep it up!`,
        html: `
          <h1>Level Up! 🎉</h1>
          <p>Congratulations, ${user.name}!</p>
          <p>You've reached <strong>Level ${newLevel}</strong>!</p>
          <p>Your dedication to anxiety relief is paying off. Keep practicing!</p>
        `
      };

      await emailTransporter.sendMail(mailOptions);
    }
  } catch (error) {
    console.error("Error sending level up notification:", error);
  }
};

// Send daily digest email
export const sendDailyDigestEmail = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (!user || !user.emailVerified) return;

    // Get unread notifications
    const notifications = await Notification.findAll({
      where: {
        userId,
        read: false
      },
      limit: 5
    });

    if (notifications.length === 0) return;

    const mailOptions = {
      from: config.EMAIL_USER || "noreply@anxietyflow.com",
      to: user.email,
      subject: "Your AnxietyFlow Daily Update",
      html: `
        <h1>Hi ${user.name}! 👋</h1>
        <p>Here's what you've missed:</p>
        <ul>
          ${notifications.map(n => `<li><strong>${n.title}</strong>: ${n.message}</li>`).join("")}
        </ul>
        <a href="http://localhost:3000/dashboard" style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #7c3aed;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        ">Check Your Dashboard</a>
        <p>Keep up your anxiety relief practice! 🧘</p>
      `
    };

    await emailTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending daily digest email:", error);
  }
};

// Send friend request notification via email
export const sendFriendRequestEmail = async (fromUserId, toUserId) => {
  try {
    const fromUser = await User.findByPk(fromUserId);
    const toUser = await User.findByPk(toUserId);

    if (!toUser || !toUser.emailVerified) return;

    const mailOptions = {
      from: config.EMAIL_USER || "noreply@anxietyflow.com",
      to: toUser.email,
      subject: `${fromUser.name} wants to be your friend!`,
      html: `
        <h1>New Friend Request 👋</h1>
        <p>${fromUser.name} (Level ${fromUser.level}) wants to be your friend!</p>
        <p>Compare progress with friends on the friends leaderboard and support each other's anxiety relief journey.</p>
        <a href="http://localhost:3000/friends" style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #7c3aed;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        ">View Request</a>
      `
    };

    await emailTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending friend request email:", error);
  }
};

// Configure environment file
export const getEmailStatus = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const user = await User.findByPk(req.session.userId);

    res.json({
      emailVerified: user.emailVerified,
      email: user.email,
      emailConfigured: !!config.EMAIL_USER
    });
  } catch (error) {
    console.error("Error getting email status:", error);
    res.status(500).json({ error: "Failed to get email status" });
  }
};
