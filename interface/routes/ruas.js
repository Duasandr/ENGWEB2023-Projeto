const express = require('express')
const router = express.Router()
const multer = require('multer');
const cb = require('../callbacks/ruas')

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

// Create the multer instance
const upload = multer({ storage: storage })

// GET

router.get('/', cb.getRuas)
router.get('/get/:id', cb.getRua)
router.get('/add', cb.getAdd)

// POST

//router.post('/add', cb.postAdd, cb.handleResponse)
router.post('/add/xml', upload.array('files'), cb.postAddXml, cb.storeData, (req, res, next) => {
    if(req.error) {
        console.log(req.error)
        res.status(500).render('ruas/forms/add', { error: req.error.message })
    } else {
        res.status(200).render('ruas/forms/add', { success: "Foram inseridos " + req.data.length + " documentos." })
    }
})


module.exports = router;
