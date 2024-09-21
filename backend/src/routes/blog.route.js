const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Blog = require('../model/blog.model');
const isAdmin = require('../middleware/admin');
const Comment = require('../model/comment.model');

// Create post (protected route)
router.post('/create-post', verifyToken, isAdmin, async (req, res) => {
    try {
        const { title, content, category, coverImg } = req.body;

        const newPost = new Blog({
            ...req.body,
            author: req.userId,
        });
        await newPost.save();
        res.status(201).send({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send({ message: 'Failed to create post' });
    }
});

// Get all posts (public route with filtering)
router.get('/', async (req, res) => {
    try {
        const { search, category, location } = req.query;

        let query = {};

        // Search filter
        if (search) {
            query = {
                ...query,
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { content: { $regex: search, $options: 'i' } }
                ]
            };
        }

        // Category filter (exact match, case-insensitive if stored as lowercase)
        if (category && category !== 'All Categories') {
            query = { ...query, category: category };
        }

        // Location filter (if applicable)
        if (location) {
            query = { ...query, location };
        }

        // Fetch filtered posts
        const posts = await Blog.find(query).populate('author', 'email').sort({ createdAt: -1 });
        res.status(200).send(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send({ message: 'Failed to fetch posts' });
    }
});

// Get a single post (protected route)
router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Blog.findById(postId).populate('author', 'email username');

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        const comments = await Comment.find({ postId: postId }).populate('user', 'username email');
        res.status(200).send({ post, comments });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send({ message: 'Failed to fetch post' });
    }
});

// Update a post (protected route)
router.patch('/update-post/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await Blog.findByIdAndUpdate(postId, { ...req.body }, { new: true });

        if (!updatedPost) {
            return res.status(404).send({ message: 'Post not found' });
        }

        res.status(200).send({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send({ message: 'Failed to update post' });
    }
});

// Delete a post with the related comments
router.delete('/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        // Find and delete the blog post
        const post = await Blog.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        // Delete associated comments
        await Comment.deleteMany({ postId: postId });

        res.status(200).send({ message: 'Post and associated comments deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send({ message: 'Failed to delete post' });
    }
});

// Related blog posts
router.get('/related/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Blog ID is required' });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).send({ message: 'Blog post not found' });
        }

        const titleRegex = new RegExp(blog.title.split(' ').join('|'), 'i');

        const relatedQuery = {
            _id: { $ne: id },
            title: { $regex: titleRegex }
        };

        const relatedPosts = await Blog.find(relatedQuery);
        res.status(200).send(relatedPosts);
    } catch (error) {
        console.error('Error fetching related posts:', error);
        res.status(500).send({ message: 'Failed to fetch related posts' });
    }
});

module.exports = router;
