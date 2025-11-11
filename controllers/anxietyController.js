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

import { AnxietyLog, User, Challenge, Badge } from "../models/userModel.js";

export const breathingExercisePage = (req, res) => {
  if (!req.session.userId) return res.redirect("/login");
  res.render("breathing-exercise", { title: "Breathing Exercise" });
};

export const gamePage = (req, res) => {
  if (!req.session.userId) return res.redirect("/login");
  res.render("game", { title: "Anxiety Relief Games" });
};

export const logAnxiety = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const { anxietyLevel, beforeBreathing, afterBreathing, exerciseType, duration, note } = req.body;

    const log = await AnxietyLog.create({
      userId: req.session.userId,
      anxietyLevel,
      beforeBreathing,
      afterBreathing,
      exerciseType,
      duration,
      note
    });

    // Award points based on improvement
    const improvement = beforeBreathing - afterBreathing;
    const pointsEarned = Math.max(10, Math.min(100, improvement * 10));

    const user = await User.findByPk(req.session.userId);
    user.points += pointsEarned;
    user.totalSessions += 1;

    // Check for level up (every 500 points)
    const newLevel = Math.floor(user.points / 500) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
      req.session.levelUp = true;
    }

    await user.save();

    // Check for badges
    await checkAndAwardBadges(req.session.userId, user.totalSessions);

    res.json({ 
      success: true, 
      pointsEarned, 
      log,
      newLevel: user.level,
      totalPoints: user.points
    });
  } catch (error) {
    console.error("Error logging anxiety:", error);
    res.status(500).json({ error: "Failed to log anxiety" });
  }
};

export const getAnxietyHistory = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const logs = await AnxietyLog.findAll({
      where: { userId: req.session.userId },
      order: [["timestamp", "DESC"]],
      limit: 30
    });

    res.json(logs);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};

export const getAnxietyStats = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const user = await User.findByPk(req.session.userId);
    const logs = await AnxietyLog.findAll({
      where: { userId: req.session.userId },
      order: [["timestamp", "DESC"]],
      limit: 30
    });

    const avgImprovement = logs.length > 0
      ? (logs.reduce((sum, log) => sum + (log.beforeBreathing - log.afterBreathing), 0) / logs.length).toFixed(2)
      : 0;

    const lastSevenDays = logs.filter(log => {
      const logDate = new Date(log.timestamp);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return logDate >= sevenDaysAgo;
    });

    res.json({
      user: {
        name: user.name,
        level: user.level,
        points: user.points,
        totalSessions: user.totalSessions
      },
      stats: {
        avgImprovement,
        sessionsThisWeek: lastSevenDays.length,
        totalSessions: logs.length
      },
      recentLogs: logs.slice(0, 5)
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

export const completeChallenge = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const { challengeId } = req.body;
    const challenge = await Challenge.findByPk(challengeId);

    if (!challenge || challenge.userId !== req.session.userId) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    challenge.completed = true;
    challenge.completedAt = new Date();
    await challenge.save();

    const user = await User.findByPk(req.session.userId);
    user.points += challenge.pointsReward;
    await user.save();

    res.json({ success: true, pointsEarned: challenge.pointsReward });
  } catch (error) {
    console.error("Error completing challenge:", error);
    res.status(500).json({ error: "Failed to complete challenge" });
  }
};

export const getChallenges = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const challenges = await Challenge.findAll({
      where: { userId: req.session.userId },
      order: [["expiresAt", "ASC"]]
    });

    res.json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "Failed to fetch challenges" });
  }
};

export const getBadges = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const badges = await Badge.findAll({
      where: { userId: req.session.userId },
      order: [["earnedAt", "DESC"]]
    });

    res.json(badges);
  } catch (error) {
    console.error("Error fetching badges:", error);
    res.status(500).json({ error: "Failed to fetch badges" });
  }
};

// Helper function to check and award badges
async function checkAndAwardBadges(userId, totalSessions) {
  const badges = [
    { type: "breathing_novice", condition: totalSessions >= 1 },
    { type: "breathing_adept", condition: totalSessions >= 5 },
    { type: "breathing_master", condition: totalSessions >= 10 },
    { type: "mindfulness_warrior", condition: totalSessions >= 20 }
  ];

  for (const badge of badges) {
    if (badge.condition) {
      const existing = await Badge.findOne({
        where: { userId, badgeType: badge.type }
      });

      if (!existing) {
        await Badge.create({
          userId,
          badgeType: badge.type
        });
      }
    }
  }
}
