const express = require('express')
const router = express.Router()
const multer = require('multer');
const cb = require('../callbacks/posts')
const generic = require('../callbacks/generic')

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

router.get('/', generic.verifyToken, cb.getPosts)
router.get('/add', generic.verifyToken, cb.getPostsAdd)
router.get('/comments/add', generic.verifyToken, cb.getCommentAdd)

// POST
router.post('/add', generic.verifyToken, upload.array('files'), cb.postAdd)
router.post('/comments/add', generic.verifyToken, cb.postComment)

module.exports = router;
