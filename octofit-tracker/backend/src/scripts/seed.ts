import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Alex Morgan', email: 'alex@example.com', avatar: 'https://i.pravatar.cc/150?img=12' },
      { name: 'Jordan Lee', email: 'jordan@example.com', avatar: 'https://i.pravatar.cc/150?img=32' },
      { name: 'Taylor Smith', email: 'taylor@example.com', avatar: 'https://i.pravatar.cc/150?img=47' },
      { name: 'Casey Patel', email: 'casey@example.com', avatar: 'https://i.pravatar.cc/150?img=5' },
    ]);

    await Team.create([
      {
        name: 'Summit Striders',
        description: 'Climb higher together with consistent training.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Morning Movers',
        description: 'Start the day with an active routine.',
        members: [users[2]._id, users[3]._id],
      },
    ]);

    const activities = await Activity.create([
      { userId: users[0]._id, type: 'Running', duration: 35, points: 70, date: new Date('2026-08-18') },
      { userId: users[0]._id, type: 'Cycling', duration: 45, points: 90, date: new Date('2026-08-20') },
      { userId: users[1]._id, type: 'Strength', duration: 30, points: 60, date: new Date('2026-08-19') },
      { userId: users[2]._id, type: 'Yoga', duration: 25, points: 50, date: new Date('2026-08-18') },
      { userId: users[3]._id, type: 'Walking', duration: 40, points: 40, date: new Date('2026-08-20') },
    ]);

    await Leaderboard.create(
      users.map((user: { _id: mongoose.Types.ObjectId }) => ({
        userId: user._id,
        points: activities
          .filter((activity: { userId: mongoose.Types.ObjectId }) => activity.userId.toString() === user._id.toString())
          .reduce((total: number, activity: { points: number }) => total + activity.points, 0),
      })),
    );

    await Workout.create([
      {
        title: 'Full Body Foundation',
        description: 'Build strength with a balanced full-body circuit.',
        difficulty: 'Beginner',
        duration: 20,
      },
      {
        title: 'Cardio Intervals',
        description: 'Alternate focused bursts with recovery to raise endurance.',
        difficulty: 'Intermediate',
        duration: 30,
      },
      {
        title: 'Athlete Conditioning',
        description: 'Challenge your power, mobility, and cardiovascular capacity.',
        difficulty: 'Advanced',
        duration: 45,
      },
    ]);

    console.log('Database seeding complete: 4 users, 2 teams, 5 activities, 4 leaderboard entries, and 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
