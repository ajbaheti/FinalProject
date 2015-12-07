var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Search' });
});

/* GET search by name page. */
// router.get('/searchbyname', function(req, res) {
//   res.render('searchbyname', { title: 'Name Search' });
// });

/* GET search by title page. */
router.get('/searchbytext', function(req, res) {
  res.render('searchbytext', { title: 'Text Search' });
});

/* GET search by title submit post page. */
router.post('/searchtext', function(req, res) {
  var db = req.db;
  var collection = db.get('terror');
  console.log("Fetching result based on text search...");
  var text = req.body.text;
  var count = req.body.count;
  var operation = req.body.operation;
  var query, search1;
  console.log("radio button value is "+ req.body.operation);
  console.log(text + "" + count);
  if(text == ""){
    if(count != "" && operation == "Greater Than"){
      console.log("text is blank");
      query = {total_number_of_people: {$gt: parseInt(count)}};
      search1 = "Count "+operation + " "+count;
    }else if(count != "" && operation == "Less Than"){
      console.log("text is blank");
      query = {total_number_of_people: {$lt: parseInt(count)}};
      search1 = "Count "+operation + " "+count;
    }else if(count != "" && operation == "Equal To"){
      console.log("text is blank");
      query = {total_number_of_people: {$eq: parseInt(count)}};
      search1 = "Count "+operation + " "+count;
    }
  }
  if(count == ""){
    console.log("count is blank");
    query = {sentence: new RegExp(text, 'i')};
    search1 = "String "+text;
  }
  if(text == "" && count == ""){
    query = {};
    search1 = "";
  }
  if(text != "" && count != ""){
    if(operation == "Greater Than"){
      query = {sentence: new RegExp(text, 'i'), total_number_of_people: {$gt: parseInt(count)}};
      search1 = "String "+text+" and Count "+operation + " "+count;
    }else if(operation == "Less Than"){
      query = {sentence: new RegExp(text, 'i'), total_number_of_people: {$lt: parseInt(count)}};
      search1 = "String "+text+" and Count "+operation + " "+count;
    }else if(operation == "Equal To"){
      query = {sentence: new RegExp(text, 'i'), total_number_of_people: {$eq: parseInt(count)}};
      search1 = "String "+text+" and Count "+operation + " "+count;
    }
  }
  
  collection.find(query,{},function(err,result){
  	if(err){
      console.log("Error: "+err);
  	}else{
  		console.log("Documents fetched: " + result.length);
  		res.render('search_result',{"result":result, "searchString":search1});
  	}
  });
});

module.exports = router;