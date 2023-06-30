const express = require('express')
const router = express.Router()
const multer = require('multer');
const cb = require('../callbacks/ruas')
const generic = require('../callbacks/generic')

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

router.get('/', generic.verifyToken, cb.getRuas)
router.get('/get/:id', generic.verifyToken, cb.getRua)
router.get('/add', generic.verifyToken, cb.getAdd)
router.get('/admin', generic.verifyToken, cb.getAdmin)
router.get('/delete/:id', generic.verifyToken, cb.getDelete)
router.get('/update/:id', generic.verifyToken, cb.getUpdate)

// POST

router.post('/add', generic.verifyToken, uploadImagens.array('imagens'), cb.postAdd, cb.storeData, cb.confirmPostAdd)
router.post('/add/xml', generic.verifyToken, uploadTexto.array('files'), cb.postAddXml, cb.storeData, cb.confirmPostAdd)
router.post('/delete/:id', generic.verifyToken, cb.postDelete)
router.post('/update/:id', generic.verifyToken, cb.postUpdate)


module.exports = router;
