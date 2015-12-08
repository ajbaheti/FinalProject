var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* Get data of single user based on Id */
router.get('/getSingleRecordToView/:id',function(req,res){
	var db = req.db;
	var collection = db.get('terror');
	console.log("collection terror in use......");
	var idToFind = parseInt(req.params.id);
	console.log(idToFind);
	collection.find({"_unit_id":idToFind},function(err, docs){
		if(err){
			console.log(err);
		}else{
			console.log("No of documents retrieved for view: "+docs.length);
			res.json(docs);
		}
	});
});

/* post comment to databse */
router.post('/saveComment',function(req,res){
	var db = req.db;
	var collection = db.get('terror');
	console.log("collection terror in use......");
	var idInInt = parseInt(req.body.uniqueId);
	var query1 = {"_unit_id" : idInInt};
	var query2 = {"$set" : {"comment":req.body.comment}};
	console.log("Comment to be saved:   "+idInInt+ "   "+req.body.comment);

	collection.update(query1,query2,false,false,function(err){
		console.log(err);
		res.send(
			(err === null) ? {msg: ""} : {msg: err}
		);
	});
});

/* google like functionaltiy code */
/*router.post('/livesearch',function(req,res){
	var db = req.db;
	var collection = db.get('review');
	var x = req.body.string;
	console.log(x);
	var query = {text: new RegExp(x)};
	collection.find(query,function(err, docs){
		if (err) throw err;
		var data=[];
		for(i=0;i<docs.length;i++)
		{
			data.push(docs[i].text);
		}
		console.log("returned length"+ docs.length);
		res.end(JSON.stringify(data));
	});
});*/

module.exports = router;