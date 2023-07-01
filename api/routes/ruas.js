/**
 * Module dependencies
 */
const express = require('express');
const router = express.Router();
const cb = require('../callbacks/ruas')
const generic = require('../callbacks/generic')

// GET routes

router.get('/',         cb.ruas)
router.get('/get/:id',  cb.rua)


router.get('/lugares',      cb.listLugares)
router.get('/entidades',    cb.listEntidades)
router.get('/datas',        cb.listDatas)
router.get('/datas/:data',  cb.listRuasByData)
router.get('/posts',        cb.listPosts)

// POST routes

router.post('/',           cb.createRua)
router.post('/update/:id', cb.updateRua)
router.post('/delete/:id', cb.deleteRua)


router.post('/posts/add',          cb.addPosts)
router.post('/posts/comments/add', cb.addComment)


module.exports = router;
