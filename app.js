const express = require('express');
const connectDB = require('./db/connect');
const bodyParser = require('body-parser')


const app = express();
const cors = require('cors');

app.use(bodyParser.json())
app.use(cors());
app.use(express.json());

const { addTime, getAllTimes} = require('./controller/time');

const {addGenre, getAllGenres} = require('./controller/genre');

const {addCity, getAllCities} = require('./controller/city');

const { cities } = require('./db/cities')

const {addArea, getAllArea} = require('./controller/area');

const {addMovie, getAllMovies} = require('./controller/movies');

//const { addUser, getAllUsers} = require('./controller/user');

const User = require('./model/User');

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


app.get('/users',async (req, res) => {
    try {
        const users = await User.find({});
        res.status(201).json({ users })
        console.log("Successfully got all Genres")
    } catch (error) {
        console.log('error');
        res.send(400).json({
            message: "Unable to get Genres"
        })
    }
});



app.post('/user', async (req,res)=>{
    //console.log(req.body)
    const {mobile,email,noOfSeats,totalPrice} = req.body;
    const user = new User({
        mobile,
        email,
        noOfSeats,
        totalPrice
    })
    const result = await user.save()
    console.log(result)
    res.json({
        message:"welcome"
    }) 

});

// app.get('/cities/:cityName',(req,res)=>{
//     console.log(req.params);
//     console.log(cities)
//     const {cityName} = req.params;

//     const singleCity = cities.find((city)=>{
//         return city.cityName === String(cityName);
//     })
//     if(!singleCity){
//         return res.status(404).send("Product does not exists")
//     }
// })

app.get('/cities/query',(req,res)=>{
    //console.log(cities)
    //console.log(req.query);
    const {search} = req.query;
    console.log(search);
    
    let sortedcity;
    if(search){
        sortedcity = cities.filter((city)=>{
            
            return city.cityName === search
            
        })
        res.status(200).json(sortedcity)
    }else {
        console.log("invalid search")
    }
    
})

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