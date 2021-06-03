const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const apiUsers = require('./routes/api/users');
const apiAuth = require('./routes/api/auth');
const apiProfile = require('./routes/api/profile');
const apiPosts = require('./routes/api/posts');
const apiFile = require('./routes/api/file');

connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));
app.use('/uploads', express.static('uploads'));
app.use('/api/users', apiUsers);
app.use('/api/auth', apiAuth);
app.use('/api/profile', apiProfile);
app.use('/api/posts', apiPosts);
app.use('/api/file', apiFile);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server initialized on port ${PORT}`));
