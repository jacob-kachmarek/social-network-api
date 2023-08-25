const { User } = require('../models/index');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            console.log(users)
            res.status(200).json(users);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async getOneUser(req, res) {
        try {
            const { UserId } = req.params;
            const user = await User.findOne({ _id: req.params.courseId })
                .select('-__v')
                .populate('friends')
                .populate('thoughts');
            if (!user) {
                return res.status(404);
            }
            console.log(user)
            res.status(200).json(user);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body)
            res.status(200).json(newUser);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
}