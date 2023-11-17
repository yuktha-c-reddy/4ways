const express = require('express')
const { getStorage, ref, uploadString } =require("firebase/storage");
const fb = require('../db/firebase');

const uploadRouter=express.Router()

uploadRouter.post('/', (req,res)=>{
    //upload with a unique id and return it
    console.log('uploading started');
    console.log(req);
    const storageRef=ref(fb.storage,req.body.id);
    uploadString(storageRef, req.body.img, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
        // console.log();
    });
    res.send("success");
    
})

module.exports=uploadRouter