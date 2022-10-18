import mongoose from 'mongoose';

const artistSchema = mongoose.Schema({
    id: String,
    artist: String,
    genre: String,
    group: String,
    popularity: Number,
    followers: Number,
    sfrank: Number,
    sprank: Number,
    cfrank: Number,
    cprank: Number,
    oprank: Number,
    ofrank: Number,
    city: String,
    state: String,
    img: String,
    applemusic: String,
    spotify: String,
    soundcloud: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostArtist = mongoose.model('PostArtist', artistSchema);

export default PostArtist;