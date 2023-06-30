const express = require('express')
const router = express.Router()
const multer = require('multer');
const cb = require('../callbacks/ruas')

// Set up storage for uploaded files
const storageImagens = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/imagens');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const storageTexto = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/texto');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

// Create the multer instance
const uploadImagens = multer({ storage: storageImagens })
const uploadTexto = multer({ storage: storageTexto })

// GET

router.get('/', cb.getRuas)
router.get('/get/:id', cb.getRua)
router.get('/add', cb.getAdd)

// POST

router.post('/add', uploadImagens.array('imagens'), cb.postAdd, cb.storeData, cb.confirmPostAdd)
router.post('/add/xml', uploadTexto.array('files'), uploadImagens.array('imagensXml'), cb.postAddXml, cb.storeData, cb.confirmPostAdd)


module.exports = router;
