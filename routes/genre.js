const express= require('express')
const router=express.Router()

const{getAllGenre}= require('../controllers/books')


router.route('/').get(getAllGenre);

module.exports=router;