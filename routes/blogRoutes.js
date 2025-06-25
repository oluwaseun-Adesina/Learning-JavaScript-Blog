const express = require('express');
const blogController = require('../controllers/blogController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit'); // Import rate limiting middleware

const router = express.Router();

//router.get('*', checkUser);

// Configure rate limiter: maximum of 100 requests per 15 minutes
const deleteRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many delete requests from this IP, please try again later.',
});

router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post);

router.get('/create', blogController.blog_create_get);

// Configure rate limiter: maximum of 100 requests per 15 minutes
const detailsRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests for blog details from this IP, please try again later.',
});

router.get('/:id', detailsRateLimiter, blogController.blog_details);

// Apply rate limiter to the delete route
router.delete('/:id', deleteRateLimiter, blogController.blog_delete);

module.exports = router;