const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const {createLog} = require('../middleware/auth');

const signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try{
        if(!firstName || !lastName || !email ||!password){
            return res.status (400).json ({message: "All fields are required"});
        }

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser= await User.create({firstName, lastName, email, password});
        return res.status(201).json ({message: "User created successfully", user: newUser});

    } catch(e) {
        console.log(e);
        return res.status(500).json ({message:"Internal server error"});
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        If(!email || !password);{
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            user.failedLoginAttempts += 1;
            if (user.failedLoginAttempts >= 5) {
                user.lockedUntil = Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
            await user.save();
            return res.status(400).json({ message: "Invalid credentials" });
    
        }
        if (user.isLocked()) {
                await createLog(user._id, "Failed login attempt - account locked", { email });
            return res.status(403).json({ message: "Account is locked" });

            user.resetLoginAttempts();
            await user.save();
            res.json({ token: createToken(user), user: user.toJSON() });
        } catch(e) {
            console.log(e);
            next(e);
        }


        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ message: "Sign in successful", token });

        if(user.password !== password) {
        return res.status(400).json ({message: "Invalid e-mail or password"});
        }   

} catch(e) {
    console.log(e);
    return res.status(500).json ({message: "Internal Server error"})
}};
    


module.exports = {signUp, signIn, User};