const express = require('express');
const connectDB = require('./db/connect');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const { addTime, getAllTimes} = require('./controller/time');

const {addGenre, getAllGenres} = require('./controller/genre');

const {addCity, getAllCities} = require('./controller/city');

const {addArea, getAllArea} = require('./controller/area');

const {addMovie, getAllMovies} = require('./controller/movies');

app.post('/time', addTime);
app.get('/times', getAllTimes);

app.post('/genre',addGenre);
app.get('/genres',getAllGenres);

app.post('/city',addCity);
app.get('/cities',getAllCities);

app.post('/area',addArea);
app.get('/areas',getAllArea);

app.post('/movie',addMovie);
app.get('/movies',getAllMovies);

const start = async()=>{
    try{
        await connectDB();
        app.listen(9988,()=>{
            console.log('Server is running on port 9988')
        })
    }catch(error){
        console.log(error);
    }
}

start()