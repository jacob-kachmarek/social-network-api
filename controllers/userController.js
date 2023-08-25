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
            const { userId } = req.params;
            const user = await User.findOne({ _id: userId })
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
    },

    async updateUser(req, res) {
        try {
            const { userId } = req.params
            const user = await User.findOneAndUpdate(
                {
                    _id: userId
                },
                req.body
            )
            if (!user) {
                return res.status(404);
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const { userId } = req.params;
            const user = await User.findOneAndRemove({ _id: userId })
            if (!user) {
                return res.status(404);
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const { userId, friendId } = req.params;
            const friend = await User.findOne({ _id: friendId })

            if (!friend) {
                return res.status(404);
            }
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { friends: friendId } }
            )
            if (!user) {
                return res.status(404);
            }
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const { userId, friendId } = req.params;
            const friend = await User.findOne({ _id: friendId })
            if (!friend) {
                return res.status(404);
            }
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { friends: friendId } }
            )
            if (!user) {
                return res.status(404).json(user);
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};