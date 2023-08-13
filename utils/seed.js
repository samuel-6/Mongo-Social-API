const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {users, thoughts} = require('./data');

connection.on('error', (err) => (err));

connection.once('open', async () => {

    console.log('connected to database');
    let userCheck = await connection.db.listCollections({name: 'users'}).toArray();

    if(userCheck.length) {

        await connection.db.dropCollection('users');

    }

    let thoughtCheck = await connection.db.listCollections({name: 'thoughts'}).toArray();

    if(thoughtCheck.length)  {

        await connection.db.dropCollection('thoughts');

    }

    await User.collection.insertMany(users);

    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete!');
    process.exit(0);

});