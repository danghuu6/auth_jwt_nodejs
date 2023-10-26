const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./../model/User');
const { registerValidator } = require('./../validation/auth');

class AuthController {

    async register (req, res) {
        const { error } = registerValidator(req.body);
    
        if (error) return res.status(400).send(error.details[0].message);
    
        const checkEmailExist = await User.findOne({ email: req.body.email });
    
        if (checkEmailExist) return response.status(400).send('Email is exist');
    
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
    
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashPassword,
        });
    
        try {
            const newUser = await user.save();
            return res.send(newUser);
        } catch (err) {
            res.status(400).send(err);
        }
    };

    async login (req, res) {
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(422).send('Email or Password is not correct');

        const checkPassword = await bcrypt.compare(req.body.password, user.password);

        if (!checkPassword) return res.status(400).send('Email or Password is not correct');
        
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
        res.header('auth-token', token).send(token);
    }
}

module.exports = new AuthController;
