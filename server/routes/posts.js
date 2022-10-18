import express from 'express';

import { getPosts, getPost, updatePost, likePost, deletePost, createArtist } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createArtist);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;