# 🚀 Quick Start Guide - AnxietyFlow

## Setup (One-Time Only)

### Step 1: Open Terminal
```powershell
cd C:\Users\ricoa\OneDrive\Desktop\gamified-app
```

### Step 2: Ensure MySQL is Running
Make sure your MySQL server is running. If not, start it:
```powershell
# For MySQL via XAMPP or similar
# Start MySQL service
```

### Step 3: Run Database Migration
```powershell
npm run migrate
```

When prompted, press **Y** to create the database.

You'll see:
```
✅ Database created (if it did not exist)
✅ Connected to MySQL database!
✅ Tables created:
   - Users (with gamification fields)
   - AnxietyLogs (breathing exercise tracking)
   - Challenges (daily/weekly challenges)
   - Badges (achievements)

🎉 Migration complete!
```

### Step 4: Start the App
```powershell
npm start
```

You'll see:
```
🔥 XianFire running at http://localhost:3000
```

### Step 5: Open in Browser
Go to: **http://localhost:3000**

---

## Using the App

### 👤 Create Account
1. Click "Get Started" on home page
2. Fill in Name, Email, Password
3. Click Register

### 📊 Dashboard
After login, you'll see:
- Your Level and Points
- Total Sessions
- Recent Activity
- Available Badges

### 🧘 Do a Breathing Exercise
1. Click "Breathing Exercises"
2. Select technique:
   - **Box Breathing** - Best for beginners
   - **4-7-8** - Deep relaxation
   - **Progressive** - Full body relaxation
   - **Alternate Nostril** - Balance & focus
3. Rate anxiety (1-10)
4. Click "Start Exercise"
5. Follow the visual guidance
6. Rate anxiety again after
7. Add notes (optional)
8. Click "Save Session" to earn points!

### 🎮 Play Games
1. Click "Relaxation Games"
2. Choose game:
   - **Memory Match** - Improve focus
   - **Breathing Sync** - Follow breathing
   - **Zen Garden** - Creative drawing
   - **Color Calm** - Color matching
3. Earn points for playing!

### 🏆 Track Progress
- **Dashboard** shows overall stats
- **Breathing Exercises** page shows session history
- **Games** page shows badges earned
- Each session automatically logged with improvement metrics

---

## 📈 Earning Points

| Activity | Points |
|----------|--------|
| Breathing Exercise | 10-100 pts (based on improvement) |
| Game Session | 50 pts per game |
| Daily Challenge | 50-100 pts |
| Badge Unlock | Automatic |

---

## 🏅 Badges to Unlock

- 🌱 **Breathing Novice** - Complete 1 session
- 🌿 **Breathing Adept** - Complete 5 sessions
- 🧘 **Breathing Master** - Complete 10 sessions
- ⚡ **Mindfulness Warrior** - Complete 20 sessions

---

## 💡 Tips for Best Results

1. **Be Consistent** - Daily practice gives best results
2. **Track Honestly** - Accurate anxiety levels help you see real improvement
3. **Mix It Up** - Try different breathing techniques and games
4. **Note Changes** - Add notes about how you felt
5. **Challenge Yourself** - Complete daily challenges for extra points

---

## ⚠️ Important Notes

✅ **What This App Does:**
- Provides scientifically-backed breathing techniques
- Offers relaxation through games
- Tracks your progress
- Rewards consistency

❌ **What This App DOES NOT Do:**
- Replace medical professionals
- Diagnose anxiety disorders
- Prescribe medication
- Provide medical advice

**If you have severe anxiety or panic attacks, please see a healthcare professional.**

---

## 🔧 Troubleshooting

### "Connection refused" Error
**Problem:** MySQL not running
**Solution:** Start your MySQL server

### "Database doesn't exist" Error
**Problem:** Database wasn't created
**Solution:** Run `npm run migrate` again

### Can't login after registration
**Problem:** Session issue
**Solution:** Clear browser cookies and try again

### Games not loading
**Problem:** Browser cache issue
**Solution:** Hard refresh (Ctrl+Shift+R)

---

## 📞 Getting Help

1. Check the **README.md** file for detailed documentation
2. Review your browser's **Console** for error messages
3. Make sure MySQL is running properly
4. Check if port 3000 is available

---

## 🎯 Next Steps

1. ✅ Start with Box Breathing (easiest)
2. ✅ Complete 3-4 sessions
3. ✅ Try different breathing techniques
4. ✅ Play games to relax
5. ✅ Watch your progress and badges
6. ✅ Keep practicing daily!

---

**You've got this! Remember: Progress over perfection. Every session counts! 🌟**

Good luck on your anxiety relief journey! 🧘✨
