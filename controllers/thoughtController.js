const { Thought, User } = require('../models/index')
//creating functions for crud operations 
module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()

            res.status(200).json(thoughts)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async getOneThought(req, res) {
        try {
            const { thoughtId } = req.params
            const thought = await Thought.findById(thoughtId)

            if (!thought) {
                return res.status(404)
            }

            res.status(200).json(thought)

        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {
            const checkUser = await User.findById(req.body.userId)
            if (!checkUser) {
                return res.status(404)
            }
            req.body.thought.username = checkUser.username
            const thought = await Thought.create(req.body.thought)
            console.log(thought._id)
            const user = await User.findOneAndUpdate(
                {
                    _id: req.body.userId
                },
                {
                    $addToSet: {
                        thoughts: thought._id
                    }
                },
                {
                    new: true
                }
            )
            res.status(200).json({ thought, user })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async updateThought(req, res) {
        try {
            const { thoughtId } = req.params
            const thought = await Thought.findOneAndUpdate(
                {
                    _id: thoughtId
                },
                req.body,
                {
                    new: true
                }
            )
            if (!thought) {
                return res.status(404)
            }
            res.status(200).json({ thought })
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteThought(req, res) {
        try {
            const { thoughtId, userId } = req.params
            const thought = await Thought.findOneAndRemove({ _id: thoughtId })
            if (!thought) {
                return res.status(404)
            }
            const user = await User.findOneAndUpdate(
                {
                    _id: userId
                },
                {
                    $pull: {
                        thoughts: thought._id
                    }
                },
                {
                    new: true
                }
            )
            if (!user) {
                return res.status(404)
            }
            res.status(200).json({ thought, user })
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async createReaction(req, res) {
        try {
            const { thoughtId } = req.params
            const thought = await Thought.findOneAndUpdate(
                {
                    _id: thoughtId
                },
                {
                    $push: {
                        reactions: req.body
                    }
                }
            )
            if (!thought) {
                return res.status(404)
            }
            res.status(200).json({ thought })
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params
            const thought = await Thought.findOneAndUpdate(
                {
                    _id: thoughtId
                },
                {
                    $pull: {
                        reactions: {
                            reactionId: reactionId
                        }
                    }
                }
            )
            if (!thought) {
                return res.status(404)
            }
            res.status(200).json({ thought })
        } catch (err) {
            res.status(500).json(err)
        }
    }
}