const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://BaoDang:baodang@cluster0-ek6kq.mongodb.net/test?retryWrites=true&w=majority";

router.get('/customer-management', function(req, res, next) {
  MongoClient.connect(uri, {useNewUrlParser: true}, function(err, dbRef){
    if(err) return console.log(err);
    else{
      const customerCollection = dbRef.db('pttkshoppingdb').collection('Customer');
      let Async_Await = async()=>{
        const all_customer = await customerCollection.find({}).toArray();
        dbRef.close();
        res.render('customer-management', { title: 'Customer Management', 'all_customer': all_customer});
      }
      Async_Await();
    }
  });
});

module.exports = router;
