const generateToken = require("../Database/generateToken");
const User = require("../Models/userModel");

//For users signup on POST request      /api/user 
const registerUser = async (req, res) => {
    const { name, email, password, address, phone, pic } = req.body;

    if (!name || !email || !password || !address || !phone) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("User already exists")
    }

    const user = await User.create({
        name, email, password, address, phone, pic
    });

    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Failed to create the user!")
    }
};

//For users Login on POST request      /api/user/login 
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
}

//For all users data on GET request      /api/user 
const allUsers = async (req, res) => {
    const users = await User.find({ _id: { $ne: req.user.id } });
    if (!users) {
        return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(users)
}

//For update users data on POST request      /api/user/update 
const updateUsers = async (req, res) => {
    try {
        const user = await User.updateOne({ _id: req.body.id }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone
            }
        })
        res.send(200);
    } catch (error) {
        res.send(401);
        throw new Error(error);
    }
}

//To Delete user on POST request      /api/user/delete 
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.body.id })
        res.send(200);
    } catch (error) {
        res.send(401);
        throw new Error(error);
    }
}


module.exports = { registerUser, authUser, allUsers, updateUsers, deleteUser };