# AnxietyFlow Configuration

## Database Configuration
- Database Name: gamified-app
- Host: localhost
- Port: 3306
- User: root
- Password: (empty by default)

## Application Configuration
- Port: 3000
- Session Secret: xianfire-secret-key
- Environment: Development

## Features Enabled
✅ Breathing Exercises (4 techniques)
✅ Relaxation Games (4 games)
✅ Gamification System (Points, Levels, Badges)
✅ Progress Tracking
✅ Challenge System
✅ User Authentication

## Database Tables
- Users (user accounts + gamification data)
- AnxietyLogs (breathing exercise sessions)
- Challenges (daily/weekly challenges)
- Badges (user achievements)

## Important Notes

1. **MySQL Setup**
   - Ensure MySQL is running on localhost:3306
   - Database will be created automatically via migration
   - Default credentials: root / (no password)

2. **First Run**
   - Run: npm run migrate
   - This creates the database and all tables
   - Press 'Y' when prompted to create database

3. **Port 3000**
   - Make sure port 3000 is available
   - If already in use, the app will fail to start
   - Check for other apps using port 3000

4. **Packages Installed**
   - All npm packages already installed
   - No additional installation needed
   - Ready to use immediately after migration

5. **Browser Access**
   - After starting: http://localhost:3000
   - Works on desktop, tablet, mobile
   - No special browser requirements
   - JavaScript must be enabled

## Troubleshooting Checklist

Before contacting support:
- [ ] MySQL is running
- [ ] npm install was completed successfully
- [ ] npm run migrate was executed successfully
- [ ] Port 3000 is not in use
- [ ] Node.js version is 14+
- [ ] Browser cache cleared
- [ ] JavaScript is enabled in browser

## Default Credentials

No default test accounts are created. You must:
1. Go to http://localhost:3000
2. Click "Get Started"
3. Register with a new account
4. Login with your credentials

## File Locations

- Main App: index.js
- Routes: routes/index.js
- Controllers: controllers/
- Models: models/
- Views: views/
- Styles: public/tailwind.css
- Database Config: models/db.js

## Deployment Notes

To deploy to production:
1. Change session secret in index.js
2. Update database credentials in models/db.js
3. Set NODE_ENV=production
4. Use a production database
5. Enable HTTPS
6. Set up proper logging
7. Use process manager (PM2, forever, etc)

## Key Endpoints

### Authentication
- GET /login - Login page
- POST /login - Submit login
- GET /register - Registration page  
- POST /register - Submit registration
- GET /dashboard - Dashboard
- GET /logout - Logout

### Anxiety Management
- GET /breathing-exercise - Breathing exercise page
- GET /games - Games page
- POST /api/anxiety/log - Log exercise
- GET /api/anxiety/history - Session history
- GET /api/anxiety/stats - User statistics

### Gamification
- POST /api/challenges/complete - Complete challenge
- GET /api/challenges - Get challenges
- GET /api/badges - Get badges

## Performance Tips

1. **Database Queries**
   - Keep anxiety logs to last 30 entries
   - Pagination for large datasets
   - Index on userId for faster queries

2. **Frontend**
   - Lazy load game modals
   - Cache static assets
   - Minimize API calls

3. **Scaling**
   - Consider adding Redis for sessions
   - Implement caching layer
   - Use CDN for static files

## Security Reminders

✅ Passwords hashed with bcrypt
✅ Session-based authentication  
✅ No sensitive data in logs
✅ HTTPS recommended for production
✅ CSRF protection recommended
✅ Input validation on all endpoints
✅ SQL injection protection (via Sequelize ORM)

## Monitoring Recommendations

- Monitor MySQL connection pool
- Track API response times
- Log errors to file
- Monitor disk space for logs
- Set up uptime monitoring
- Track user engagement metrics

---

**Configuration Complete!**

Ready to start? Run:
```
npm run migrate
npm start
```

Then visit: http://localhost:3000
