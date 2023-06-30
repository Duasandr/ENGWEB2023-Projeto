const express = require('express')
const router = express.Router()
const multer = require('multer');
const cb = require('../callbacks/posts')

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/imagens');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

// Create the multer instance
const upload = multer({ storage: storage })

// GET

router.get('/', cb.getPosts)
router.get('/add', cb.getPostsAdd)
router.get('/comments/add', cb.getCommentAdd)

// POST
router.post('/add', upload.array('files'), cb.postAdd)
router.post('/comments/add', cb.postComment)

module.exports = router;
