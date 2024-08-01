require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS i.e Cross-origin resource sharing for all routes :)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// MongoDB connection, to make sure your ip hasn't changed and connected to mongodb, else you have to add your current IP in the mongodb website settings to permit access :D
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Route to fetch comments
app.post('/api/fetch_comments', (req, res) => {
    const { id } = req.body;

    const pythonProcess = spawn('python', ['../python/get_store_comments.py', id]);

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).send('Error fetching comments');
        }
        const retrieveProcess = spawn('python', ['../python/retrieve_data.py', 'fetch', '']);
        let dataToSend = '';
        retrieveProcess.stdout.on('data', (data) => {
            dataToSend += data.toString();
        });
        retrieveProcess.stdout.on('end', () => {
            res.json(JSON.parse(dataToSend));
        });
        retrieveProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
            res.status(500).send('Error retrieving comments');
        });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        res.status(500).send('Error fetching comments');
    });
});

// Route to search comments
app.post('/api/search', (req, res) => {
    const { query } = req.body;

    const pythonProcess = spawn('python', ['../python/retrieve_data.py', 'search', query]);

    let dataToSend = '';
    pythonProcess.stdout.on('data', (data) => {
        dataToSend += data.toString();
    });

    pythonProcess.stdout.on('end', () => {
        res.json(JSON.parse(dataToSend));
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        res.status(500).send('Error searching comments');
    });
});

// Route to get comments sorted by likes
app.post('/api/byLikes', (req, res) => {
    const { query } = req.body;

    const pythonProcess = spawn('python', ['../python/retrieve_data.py', 'sort', query]);

    let dataToSend = '';
    pythonProcess.stdout.on('data', (data) => {
        dataToSend += data.toString();
    });

    pythonProcess.stdout.on('end', () => {
        res.json(JSON.parse(dataToSend));
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        res.status(500).send('Error sorting comments by likes');
    });
});

// Route to get comments by sentiment
app.post('/api/bySentiment', (req, res) => {
    const { query, sentiment } = req.body;

    const pythonProcess = spawn('python', ['../python/sentiment_analysis.py', query]);

    let dataToSend = '';
    pythonProcess.stdout.on('data', (data) => {
        dataToSend += data.toString();
    });

    pythonProcess.stdout.on('end', () => {
        const comments = JSON.parse(dataToSend);
        const filteredComments = comments.filter(comment => comment.sentiment === sentiment);
        res.json(filteredComments.sort((a, b) => b.likes - a.likes));
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        res.status(500).send('Error analyzing sentiment');
    });
});

// Starts the server :)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
