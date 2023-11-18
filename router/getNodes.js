const fb = require('../db/firebase');
const { set,ref } = require('firebase/database');
const {child, get } = require("firebase/database");

module.exports=getNodes=(req,res)=>{
    console.log(req.header("id"));
    get(child(ref(fb.db), `/nodeGraphs/${req.header("id")}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          res.json(JSON.parse(snapshot.val().data))
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
}