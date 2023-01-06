import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {
        type: Date,
        default: new Date(),
    },
    id: {type: String}
})

export default  mongoose.model('User', userSchema);

