const User = require("../../Models/User");
const bcrypt = require("bcrypt");

exports.Signup = async (req, res) => {
    try {
        const { name, username, password, type } = req.body;
        let user = await User.findOne({ username });
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User already exists!",
            });
        }

        user = await User.create({ name, username, password, type });

        res.status(201).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = user.generateAuthToken();

        return res
            .status(200)
            .cookie("token", token)
            .json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.Logout = async (req, res) => {
    res.clearCookie("token");
    res.send({ success: true, message: "Logout Successful" });
};