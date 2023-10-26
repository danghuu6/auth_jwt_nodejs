const User = require('./../model/User');

class UserController {

    getAllUser (req, res) {
        User.find()
            .then(user => res.send(user))
            .catch(err => res.status(400).send("ERROR!!!"))
    }
}

module.exports = new UserController;