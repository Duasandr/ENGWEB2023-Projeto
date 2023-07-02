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

router.get('/',           cb.getRuas)
router.get('/get/:id',    cb.getRua)

router.get('/add',        generic.checkLevel, cb.getAdd)
router.get('/admin',      generic.checkLevel, cb.getAdmin)
router.get('/delete/:id', generic.checkLevel, cb.getDelete)
router.get('/update/:id', generic.checkLevel, cb.getUpdate)

router.get('/lugares',      cb.getLugares)
router.get('/lugares/:lugar',  cb.getRuasByLugar)
router.get('/entidades',    cb.getEntidades)
router.get('/datas',        cb.getDatas)
router.get('/datas/:data',  cb.getRuasByData)


// POST

router.post('/add',         generic.checkLevel, uploadImagens.array('imagens'), cb.postAdd, cb.storeData)
router.post('/add/xml',     generic.checkLevel, uploadTexto.array('files'), cb.postAddXml, cb.storeData)
router.post('/delete/:id',  generic.checkLevel, cb.postDelete)
router.post('/update/:id',  generic.checkLevel, cb.postUpdate)


module.exports = router;
