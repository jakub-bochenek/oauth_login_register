const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const sequelize = new Sequelize('simple_db', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: '3307'
});

// Model użytkownika
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }}, {
    timestamps: false

});


app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }
        const token = jwt.sign({ userId: user.id }, 'secret_key');
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login.' });
    }
});


sequelize.sync().then(() => {
    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    });
});
