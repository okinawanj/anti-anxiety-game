
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
    
import express from "express";
import { homePage } from "../controllers/homeController.js";
const router = express.Router();
router.get("/", homePage);

import { loginPage, registerPage, forgotPasswordPage, dashboardPage, loginUser, registerUser, logoutUser } from "../controllers/authController.js";
import { breathingExercisePage, gamePage, logAnxiety, getAnxietyHistory, getAnxietyStats, completeChallenge, getChallenges, getBadges } from "../controllers/anxietyController.js";
import { getGlobalLeaderboard, getFriendsLeaderboard, sendFriendRequest, acceptFriendRequest, getFriends, getActivityFeed, shareActivity, getUserProfile, updateUserProfile, searchUsers } from "../controllers/socialController.js";
import { verifyEmail, resendVerificationEmail, getEmailStatus } from "../controllers/notificationController.js";

router.get("/login", loginPage);
router.post("/login", loginUser);
router.get("/register", registerPage);
router.post("/register", registerUser);
router.get("/forgot-password", forgotPasswordPage);
router.get("/dashboard", dashboardPage);
router.get("/logout", logoutUser);

// Anxiety Management Routes
router.get("/breathing-exercise", breathingExercisePage);
router.get("/games", gamePage);
router.post("/api/anxiety/log", logAnxiety);
router.get("/api/anxiety/history", getAnxietyHistory);
router.get("/api/anxiety/stats", getAnxietyStats);
router.post("/api/challenges/complete", completeChallenge);
router.get("/api/challenges", getChallenges);
router.get("/api/badges", getBadges);

// Leaderboard Routes
router.get("/api/leaderboard/global", getGlobalLeaderboard);
router.get("/api/leaderboard/friends", getFriendsLeaderboard);

// Friend Routes
router.post("/api/friends/request", sendFriendRequest);
router.post("/api/friends/accept", acceptFriendRequest);
router.get("/api/friends", getFriends);

// Activity Feed Routes
router.get("/api/activity/feed", getActivityFeed);
router.post("/api/activity/share", shareActivity);

// User Profile Routes
router.get("/api/users/:userId", getUserProfile);
router.post("/api/users/profile/update", updateUserProfile);
router.get("/api/users/search", searchUsers);

// Email & Notification Routes
router.get("/verify-email", verifyEmail);
router.post("/api/email/resend-verification", resendVerificationEmail);
router.get("/api/email/status", getEmailStatus);

export default router;