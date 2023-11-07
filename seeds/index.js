// IMPORTS
const sequelize = require('../config/connection');
const { User, BlogPost, Comment} = require('../models');

// SEED CONNECTIONS
const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json');

// EXECUTE SEEDING DATABASE
const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log(`
    ~~~~~~~~~~~~~~ DATABASE SYNCED ~~~~~~~~~~~~~~
    `);

    const users = await User.bulkCreate(userData
    );
    console.log(`
    ~~~~~~~~~~~~~~ USERS SEEDED ~~~~~~~~~~~~~~
    `);

    const posts = await BlogPost.bulkCreate(blogPostData);
    console.log(`
    ~~~~~~~~~~~~~~ BLOG POSTS SEEDED ~~~~~~~~~~~~~~
    `);

    const comments = await Comment.bulkCreate(commentData);
    console.log(`
    ~~~~~~~~~~~~~~ COMMENTS SEEDED ~~~~~~~~~~~~~~
    `);

    process.exit(0);
}

// INITIATE SEED DATABASE
seedDatabase();