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

import { User, Friend, Notification, Activity, Leaderboard } from "../models/userModel.js";
import { sequelize } from "../models/db.js";

// Leaderboard endpoints
export const getGlobalLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.findAll({
      attributes: ["id", "name", "points", "level", "profilePicture"],
      where: { isPublic: true },
      order: [["points", "DESC"]],
      limit: 100
    });

    const ranked = leaderboard.map((user, index) => ({
      rank: index + 1,
      ...user.toJSON()
    }));

    res.json(ranked);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

export const getFriendsLeaderboard = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    // Get user's friends
    const friendsList = await Friend.findAll({
      where: {
        [sequelize.Op.or]: [
          { userId: req.session.userId, status: "accepted" },
          { friendId: req.session.userId, status: "accepted" }
        ]
      }
    });

    const friendIds = friendsList.map(f => 
      f.userId === req.session.userId ? f.friendId : f.userId
    );
    friendIds.push(req.session.userId); // Include self

    const leaderboard = await User.findAll({
      attributes: ["id", "name", "points", "level", "profilePicture"],
      where: { id: friendIds },
      order: [["points", "DESC"]]
    });

    const ranked = leaderboard.map((user, index) => ({
      rank: index + 1,
      isCurrentUser: user.id === req.session.userId,
      ...user.toJSON()
    }));

    res.json(ranked);
  } catch (error) {
    console.error("Error fetching friends leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

// Friend endpoints
export const sendFriendRequest = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const { targetUserId } = req.body;

    if (targetUserId === req.session.userId) {
      return res.status(400).json({ error: "Cannot friend yourself" });
    }

    // Check if already friends
    const existing = await Friend.findOne({
      where: {
        [sequelize.Op.or]: [
          { userId: req.session.userId, friendId: targetUserId },
          { userId: targetUserId, friendId: req.session.userId }
        ]
      }
    });

    if (existing) {
      return res.status(400).json({ error: "Friend request already exists" });
    }

    const friendship = await Friend.create({
      userId: req.session.userId,
      friendId: targetUserId,
      status: "pending"
    });

    // Create notification
    await Notification.create({
      userId: targetUserId,
      type: "friend_request",
      title: "New Friend Request",
      message: `Someone wants to be your friend!`,
      relatedUserId: req.session.userId
    });

    res.json({ success: true, friendship });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ error: "Failed to send friend request" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const { friendshipId } = req.body;

    const friendship = await Friend.findByPk(friendshipId);

    if (!friendship || friendship.friendId !== req.session.userId) {
      return res.status(403).json({ error: "Cannot accept this request" });
    }

    friendship.status = "accepted";
    await friendship.save();

    // Create notification
    await Notification.create({
      userId: friendship.userId,
      type: "friend_request",
      title: "Friend Request Accepted",
      message: `${(await User.findByPk(req.session.userId)).name} accepted your friend request!`,
      relatedUserId: req.session.userId
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ error: "Failed to accept request" });
  }
};

export const getFriends = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const friends = await Friend.findAll({
      where: {
        [sequelize.Op.or]: [
          { userId: req.session.userId, status: "accepted" },
          { friendId: req.session.userId, status: "accepted" }
        ]
      },
      include: [
        {
          association: "user",
          model: User,
          attributes: ["id", "name", "points", "level", "profilePicture"]
        },
        {
          association: "friend",
          model: User,
          attributes: ["id", "name", "points", "level", "profilePicture"]
        }
      ]
    });

    res.json(friends);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ error: "Failed to fetch friends" });
  }
};

// Notifications
export const getNotifications = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const notifications = await Notification.findAll({
      where: { userId: req.session.userId },
      order: [["createdAt", "DESC"]],
      limit: 50
    });

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const { notificationId } = req.body;

    const notification = await Notification.findByPk(notificationId);

    if (!notification || notification.userId !== req.session.userId) {
      return res.status(403).json({ error: "Cannot update this notification" });
    }

    notification.read = true;
    await notification.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Failed to update notification" });
  }
};

// Activity Feed
export const getActivityFeed = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    // Get friends
    const friendsList = await Friend.findAll({
      where: {
        [sequelize.Op.or]: [
          { userId: req.session.userId, status: "accepted" },
          { friendId: req.session.userId, status: "accepted" }
        ]
      }
    });

    const friendIds = friendsList.map(f => 
      f.userId === req.session.userId ? f.friendId : f.userId
    );
    friendIds.push(req.session.userId);

    // Get recent activities
    const activities = await Activity.findAll({
      where: {
        userId: friendIds,
        isShared: true
      },
      include: [
        {
          model: User,
          attributes: ["id", "name", "profilePicture", "level"]
        }
      ],
      order: [["createdAt", "DESC"]],
      limit: 50
    });

    res.json(activities);
  } catch (error) {
    console.error("Error fetching activity feed:", error);
    res.status(500).json({ error: "Failed to fetch activity feed" });
  }
};

export const shareActivity = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const { activityId } = req.body;

    const activity = await Activity.findByPk(activityId);

    if (!activity || activity.userId !== req.session.userId) {
      return res.status(403).json({ error: "Cannot share this activity" });
    }

    activity.isShared = true;
    await activity.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Error sharing activity:", error);
    res.status(500).json({ error: "Failed to share activity" });
  }
};

// User profile
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "points", "level", "bio", "profilePicture", "createdAt", "isPublic"]
    });

    if (!user || !user.isPublic) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get user's badges
    const { Badge } = await import("../models/userModel.js");
    const badges = await Badge.findAll({
      where: { userId }
    });

    // Check if current user is friends with this user
    let isFriend = false;
    if (req.session.userId && req.session.userId !== userId) {
      const friendship = await Friend.findOne({
        where: {
          [sequelize.Op.or]: [
            { userId: req.session.userId, friendId: userId, status: "accepted" },
            { userId, friendId: req.session.userId, status: "accepted" }
          ]
        }
      });
      isFriend = !!friendship;
    }

    res.json({
      ...user.toJSON(),
      badges,
      isFriend,
      isOwnProfile: req.session.userId === parseInt(userId)
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const { bio, isPublic, profilePicture } = req.body;

    const user = await User.findByPk(req.session.userId);

    if (bio !== undefined) user.bio = bio;
    if (isPublic !== undefined) user.isPublic = isPublic;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;

    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// Search users
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return res.json([]);
    }

    const users = await User.findAll({
      attributes: ["id", "name", "level", "profilePicture"],
      where: {
        name: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("name")),
          "LIKE",
          `%${query.toLowerCase()}%`
        ),
        isPublic: true
      },
      limit: 10
    });

    res.json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Failed to search users" });
  }
};
