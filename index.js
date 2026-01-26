const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

// Routes for middleware
const userRoutes = require("./routes/user");
const movieRoutes = require('./routes/movies')

require('dotenv').config()

const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect(process.env.MONGODB_STRING);

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

if(require.main === module){
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
    });
}

module.exports = {app,mongoose};