const { Schema, model } = require('mongoose');
//creating user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ]
    },
    {
        toJSON: {
            getters: true,
        }
    }
)
//creating virtual to count friends
userSchema.virtual('friendCount').get(function () {
    if (this.friends) {
        return this.friends.length
    } else {
        return 0
    }
})

const User = model('user', userSchema)

module.exports = User