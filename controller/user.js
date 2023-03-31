const User = require('../model/User');

const getAllUsers = async (req, res) => {
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
}

async function addUser(req, res) {
    try {
        const user = await User.create(req.body)
        res.status(201).json({ user })
        console.log("Successfully added genre")
    
    } catch (error) {
        console.log('error');
        res.send(400).json({
            message: "Unable to add genre"
        })
    }

}

module.exports = {
    addUser,
    getAllUsers
}