# 🧘 AnxietyFlow - Gamified Anti-Anxiety App

A fun, engaging, and science-backed web application designed to help users manage anxiety through breathing exercises, relaxation games, and gamification. **No medication, no consultation - just pure relaxation!**

## ✨ Features

### 🧘 Breathing Exercises
- **Box Breathing** (4-4-4-4): The classic technique for instant calm
- **4-7-8 Technique**: Extended exhale method for deep relaxation
- **Progressive Relaxation**: Muscle relaxation combined with breathing
- **Alternate Nostril Breathing**: Yogic technique for balance

Each exercise includes:
- Real-time anxiety level tracking (before/after)
- Visual breathing guidance
- Session timer
- Personal notes
- Automatic point rewards

### 🎮 Relaxation Games
Designed to be therapeutic while keeping you engaged:

1. **Memory Match** 🧠 - Improve focus while relaxing
2. **Breathing Sync** 💨 - Follow guided breathing patterns
3. **Zen Garden** 🌿 - Create calming patterns with clicks
4. **Color Calm** 🎨 - Match colors at your own pace

### 📊 Gamification System
Stay motivated with rewards:
- **Points System**: Earn points from every exercise
- **Level Progression**: Reach higher levels as you progress
- **Badges & Achievements**: Unlock achievements
  - 🌱 Breathing Novice (1 session)
  - 🌿 Breathing Adept (5 sessions)
  - 🧘 Breathing Master (10 sessions)
  - ⚡ Mindfulness Warrior (20 sessions)
- **Daily Challenges**: Complete challenges for bonus points
- **Progress Tracking**: Visualize your improvement over time

### 📈 Analytics & Tracking
- Track anxiety levels before and after exercises
- View session history
- Average improvement metrics
- Weekly activity summary
- Personal wellness dashboard

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14+)
- **MySQL** (or any MySQL-compatible database)
- **npm** or **yarn**

### Installation

1. **Clone or navigate to the project:**
```bash
cd c:\Users\ricoa\OneDrive\Desktop\gamified-app
```

2. **Install dependencies:**
```bash
npm install
```

The following packages are included:
- `express` - Web framework
- `sequelize` - ORM for database
- `mysql2` - MySQL driver
- `bcrypt` - Password hashing
- `express-session` - Session management
- `hbs` - Template engine
- `chart.js` - Data visualization
- `phaser` - Game framework (for future enhancements)

3. **Configure Database:**

Create a MySQL database (or use existing):
```sql
CREATE DATABASE `gamified-app`;
```

Update `models/db.js` if your MySQL credentials are different:
```javascript
export const sequelize = new Sequelize("gamified-app", "root", "YOUR_PASSWORD", {
  host: "localhost",
  dialect: "mysql"
});
```

4. **Run Migrations:**
```bash
npm run migrate
```

This will create all necessary tables:
- `Users` - User accounts with gamification data
- `AnxietyLogs` - Breathing exercise records
- `Challenges` - Daily/weekly challenges
- `Badges` - User achievements

5. **Start the Application:**
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run xian
```

The app will be available at `http://localhost:3000`

## 📋 User Flow

1. **Home Page** - Learn about the app
2. **Register/Login** - Create your account
3. **Dashboard** - View stats and choose activities
4. **Breathing Exercises** - Select technique and practice
5. **Games** - Play relaxation games and earn rewards
6. **Progress** - Track improvement and unlock badges

## 🗂️ Project Structure

```
gamified-app/
├── controllers/
│   ├── authController.js       # Authentication logic
│   ├── homeController.js       # Home page logic
│   └── anxietyController.js    # Anxiety management features
├── models/
│   ├── db.js                   # Database connection
│   └── userModel.js            # All data models
├── routes/
│   └── index.js                # All routes
├── views/
│   ├── home.xian              # Landing page
│   ├── login.xian             # Login page
│   ├── register.xian          # Registration page
│   ├── dashboard.xian         # Main dashboard
│   ├── breathing-exercise.xian # Breathing exercises
│   ├── game.xian              # Games page
│   └── partials/
│       ├── head.xian          # HTML head
│       └── footer.xian        # Footer
├── public/
│   └── tailwind.css           # Styling
├── index.js                    # Main app file
├── migrate.js                  # Database setup
└── package.json               # Dependencies
```

## 🎮 How to Use

### Breathing Exercise
1. Go to "Breathing Exercises" from dashboard
2. Rate your anxiety (1-10) before starting
3. Choose a breathing technique
4. Click "Start Exercise"
5. Follow the visual guidance
6. Rate your anxiety after completing
7. Add optional notes
8. Submit to save and earn points

### Playing Games
1. Go to "Games" from dashboard
2. Choose a game from the available options
3. Play at your own pace
4. Complete daily challenges for bonus points
5. Unlock badges as you progress

### Tracking Progress
- Dashboard shows real-time stats
- View recent sessions with improvements
- Check anxiety level trends
- Monitor your weekly activity
- Collect badges as milestones

## 🔐 Account Security

- Passwords are hashed using bcrypt
- Session-based authentication
- Secure cookie management
- No personal data storage beyond account info

## ⚠️ Important Disclaimer

**AnxietyFlow is NOT a medical application.** It provides:
- ✓ Relaxation techniques
- ✓ Breathing exercises
- ✓ Mindfulness activities

**It does NOT provide:**
- ✗ Medical advice
- ✗ Professional diagnosis
- ✗ Medication information
- ✗ Medical consultation

**If you experience severe anxiety, panic attacks, or mental health concerns, please consult with a licensed healthcare professional.**

## 📊 API Endpoints

### Anxiety Management
- `POST /api/anxiety/log` - Log a breathing exercise session
- `GET /api/anxiety/history` - Get past sessions
- `GET /api/anxiety/stats` - Get user statistics

### Challenges & Badges
- `POST /api/challenges/complete` - Complete a challenge
- `GET /api/challenges` - Get active challenges
- `GET /api/badges` - Get earned badges

### Authentication
- `GET /login` - Login page
- `POST /login` - Login user
- `GET /register` - Register page
- `POST /register` - Register user
- `GET /dashboard` - User dashboard
- `GET /logout` - Logout user

## 🎯 Future Enhancements

- [ ] Mobile app version
- [ ] Advanced analytics with charts
- [ ] Social features (leaderboards)
- [ ] Guided meditation audio
- [ ] More game variations
- [ ] Integration with wearables (heart rate)
- [ ] Offline mode
- [ ] Multi-language support

## 🤝 Contributing

This is an educational project. Feel free to fork and enhance!

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 About

Created as a gamified anti-anxiety solution to make anxiety management fun, engaging, and accessible to everyone.

**Remember**: Consistency is key! Try to practice daily for the best results.

---

**Get started now and take control of your anxiety! 🎯**

For support or questions, refer to the in-app help or consult a healthcare professional if needed.
