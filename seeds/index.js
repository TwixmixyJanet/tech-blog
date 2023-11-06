// imports
const sequelize = require('../config/connection');
const { User, BlogPost, Comment} = require('../models');

// seed connections
const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json');

// execute seeding database
const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log(`
    ~~~~~~~~~~~~~~ DATABASE SYNCED ~~~~~~~~~~~~~~
    `);

    const users = await User.bulkCreate(userData
    //     , {
    //     individualHooks: true,
    //     returning: true,
    // }
    );
    console.log(`
    ~~~~~~~~~~~~~~ USERS SEEDED ~~~~~~~~~~~~~~
    `);

    const posts = await BlogPost.bulkCreate(blogPostData);
    console.log(`
    ~~~~~~~~~~~~~~ BLOG POSTS SEEDED ~~~~~~~~~~~~~~
    `);

    // for (const blogPost of blogPostData) {
    //     await BlogPost.create({
    //         ...blogPost,
    //         user_id: users[Math.floor(Math.random() * users.length)].id,
    //     });
    // }

    const comments = await Comment.bulkCreate(commentData);
    console.log(`
    ~~~~~~~~~~~~~~ COMMENTS SEEDED ~~~~~~~~~~~~~~
    `);

    process.exit(0);
}

seedDatabase();