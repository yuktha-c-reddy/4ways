const express = require('express')
const fb = require('../db/firebase');
const { set,ref } = require('firebase/database');

const uploadNode=express.Router()

uploadNode.post('/', (req,res)=>{
    //upload with a unique id and return it
    console.log(req.body);
    const id=Date.now().toString();
    set(ref(fb.db, 'nodeGraphs/' + id), req.body);
    setTimeout(()=>{
        res.send(id)},
    1000)
})

module.exports=uploadNode