var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'CRUD Operations With Mongo!!' });
});

router.get('/home',function(req,res)
{
	res.render('home',{title:'CRUD Operations With Mongo!!'});
	
});


//code added by me
router.get('/userlist', function(req, res) {
    var db = req.db;
	//console.log(db);
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
		//console.log(docs);
        res.render('userlist', {
           "userlist" : docs
        });
    });
	
});

//to add new user
router.get('/newuser',function(req,res) {
	res.render('newuser' , {title:'Add new user'});
});

router.post('/adduser',function(req,res){
	
	var db= req.db;
	var userName=req.body.username;
	var userEmail=req.body.useremail;
	var password =req.body.password
	

	//if()
	var collection=db.get('usercollection');
	collection.insert({"name":userName,"password":password,"email":userEmail},function(err,docs){
		if(err)
		{ res.render("there was problme in inserting record to db")}
		else
		{
			res.location('/userlist');
			res.redirect('/userlist');
		}
	});
});

//Change password

router.get('/changepassword',function(req,res) {
	res.render('changepassword' , {title:'Change Password'});
});


router.get('/changepassword_success',function(req,res) {
	res.render('changepassword_success' , {title:'Change Password Successfull'});
});


router.post('/savechanges',function(req,res){
	var db=req.db;
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	var password =req.body.password;
	var newpassword =req.body.newpassword;
	
	var collection= db.get('usercollection');
	collection.update({"password":password},{$set:{"password":newpassword}},{w:1},function(err,doc){
		
		if(err)
		{
			throw error;
		}
		else
		{
			
			res.location('/changepassword_success');
			res.redirect('/changepassword_success');
			console.log("password updated successfull!!");
		}
	
		
	})
		
	
});

//delete user


router.get('/Delete/*',function(req,res){
	console.log("email:"+req.params["0"])
		var db=req.db;
	var emailid=req.params["0"]
	var collection = db.get('usercollection');
	collection.remove ({"email":emailid},function(err,result){
	
	if (err)
	{
	throw error;
	}
	else
	{
	
	res.render('Delete',{title:''});
	console.log("User deleted successfully!");
	}
	}) 
	
});






module.exports = router;
