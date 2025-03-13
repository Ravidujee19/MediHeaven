const User = require("../Model/UserModel");

const getAllUsers = async (req, res, next) => {
    
    let Users;

    //Get all users
    try{
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

    //Not found
    if(!users) {
        return res.status(404).json({message:"User not found"});
    }

    //Display
    return res.status(200).json({users});
};

//Data insert
const addUsers = async (req, res, next) => {
    const {name,
        gmail,
        age,
        address,
        gender} = req.body;

    let users;

    try {
        users = new User({name,
            gmail,
            age,
            address,
            gender});
        await users.save();
    } catch (err) {
        console.log(err);
    }

    //Not insert user
    if (!users) {
        return res.status(404).json({message:"Unable to add users"});
    }

    return res.status(200).json({users});

}

//Get by id
const getById = async (req, res, next) => {
    const id = req.params.id;  // use for route(id)

    let user;

    try {
        user = await User.findById(id);
    } catch {
        console.log(err);
    }
    
    //Not available user
    if (!user) {
        return res.status(404).json({message:"Unable to fetch user"});
    }

    return res.status(200).json({user});
}

//Update user details
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const {name,
        gmail,
        age,
        address,
        gender} = req.body;

    let users;

    try {
        users = await User.findByIdAndUpdate (id,
            {name: name, gmail: gmail, age: age, address: address}
        );
        users = await users.save();
    } catch (err) {
        console.log(err);
    }

    //cannt update users
    if (!users) {
        return res.status(404).json({message:"Unable to update user details"});
    }

    return res.status(200).json({users});
}

//Delete User
const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await User.findByIdAndDelete(id)
    } catch (err) {
        console.log(err);
    }
    //cannt update users
    if (!user) {
        return res.status(404).json({message:"Unable to delete user details"});
    }

    return res.status(200).json({user});
}

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;