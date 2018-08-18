const mongoose = require('mongoose');
const bcrypt = require('bcrypt-as-promised');
const session = require('express-session');
const Busboy = require('busboy');
const stripe = require('stripe')('sk_test_t29RHUvIY0BZjRPTaAryjG2C');
var request = require('request');


const Mission = mongoose.model('Mission');
const User = mongoose.model('User');
const Reply = mongoose.model('Reply');
const Push = mongoose.model('Push');
const Verify = mongoose.model('Verify');

module.exports = {
	addUser: function(req,res){
		bcrypt.hash(req.body.password, 10)
		.then(hashed_password => {
			req.body.password = hashed_password
			console.log("You got here.")
				let user = new User(req.body);
				user.superUser = false;
				user.verified = false;
				user.verifyRequest = false;
				stripe.customers.create({
		  			email: req.body.email
				}).then(function(customer){
				user.customer_id = customer.id
				})
				user.save(function(err){
				if(err){
					console.log(err)
				}
				else{
					res.json("Successfully Sign Up.")
					console.log("Successfully saved user.")
			}
			})
		})
		.catch(error => {
			console.log("Error hasing Password.")
		});
	},

	logUser: function(req,res){
		User.findOne({name: req.body.name}, function(err,user){
			if(err){
				console.log("can't find user")
			}
			else{
				bcrypt.compare( req.body.password , user.password)
				.then( result => {
				 	if(result){
				 		req.session.user = user;
						console.log(req.session.user)
						return res.json({data: user});
				 	}
				})
				.catch( error => {
					console.log(error, "This is the error")
					return res.status(401).json('Wrong Password');
				})
			}
		});
	},

	checkLogIn: function(req,res){
		if(req.session.user){
			res.json( {data: req.session.user})
			console.log("You are logged in.")
		}
		else{
			console.log("You are not log in.")
		}
	},

	logOut: function(req,res){
		req.session.destroy()
		res.json("User is logged out.")
	},

	getUser: function(req,res){
		User.findOne({_id: req.params.id}, function(err,user){
			if(err){
				console.log(err,"You cannot find user.")
			}
			else{
				res.json({user: user})
			}
		})
	},

	createMission: function(req,res){
		let mission = new Mission(req.body)
		mission._user = req.session.user
		mission.creator = req.session.user.name
		mission.received = 0
		mission.save(function(err,mission){
		if(err){
			console.log(err)
		}
		else{
			console.log(mission)
			User.findOneAndUpdate({_id: req.session.user._id}, {$push: {_missions: mission}}, function(err){
				if(err){
					console.log("You have an error updating user")
				}
				else{
					res.json( {mission: mission} )
					console.log("You succesfully log your mission into your user.")
				}

			})
		}
		})
	},

	getMissions: function(req,res){
		Mission.find({}, function(err,missions){
			if(err){
				console.log(err, "Error finding missions.")
			}
			else{
				res.json({missions: missions})
			}
		})
	},

	getMission: function(req,res){
		Mission.findOne({_id: req.params.id}, function(err,mission){
			if(err){
				console.log(err,"You cannot find user.")
			}
			else{
				res.json({mission: mission})
			}
		})
	},

	createPush: function(req,res){
		if(req.session.user){
			let push = new Push({push: true});
			push.creator = req.session.user.name
			push._user = req.session.user._id
			push._mission = req.params.id
			push.save(function(err,res){
				User.findOneAndUpdate({_id: req.session.user._id}, {$push: {_pushs: push}}, function(err){
					if(err){
						console.log("You have an error updating user")
					}
					else{
						console.log("Saved push into user.")
						Mission.findOneAndUpdate({_id: req.params.id}, {$push: {_pushs: push}}, function(err){
							if(err){
								console.log("You have an error updating user")
							}
							else{
								console.log("Saved Push into mission.")
							}
						})
					}
				})
			})
		}
		else{
			res.json("You are not log in.");
			console.log("You are not logged in.")
		}
	},

	createReply: function(req,res){
		console.log(req.body.content)
		if(req.session.user){
			let reply = new Reply({content:req.body.content});
			reply.creator = req.session.user.name
			reply._user = req.session.user._id
			reply._mission = req.params.id
			console.log(req.body)
			console.log(reply)
			reply.save(function(err){
				User.findOneAndUpdate({_id: req.session.user._id}, {$push: {_replys: reply}}, function(err){
					if(err){
						console.log("You have an error updating user")
					}
					else{
						console.log("Saved reply into user.")
						Mission.findOneAndUpdate({_id: req.params.id}, {$push: {_replys: reply}}, function(err,mission){
							if(err){
								console.log("You have an error updating user")
							}
							else{
								console.log("Saved Reply into mission.")
								res.json({data: mission})
							}
						})
					}
				})
			})
		}
		else{
			res.json("You are not log in.");
			console.log("You are not log in.")
		}
	},

	verifyRequest: function(req,res){
		if(req.session.user){
			let verify = new Verify({request: req.body.request})
			verify._user = req.session.user._id
			verify.creator = req.session.user.name
			verify.save(function(err,verify){
				if(err){
					console.log(err,"You have an error.")
				}
				else{
					User.findOneAndUpdate({_id: req.session.user._id}, {verifyRequest: true}, function(err){
						if(err){
							console.log(err, "You made a mistake here.")
						}
						else{
							console.log("It's good.")
						}
					})
				}
			})
		}
		else{
			res.json("You are not log in.")
			console.log("You are not log in.")
		}
	},

	getVerifyRequests: function(req,res){
		if(req.session.user.superUser == true){
			Verify.find({}, function(req, requests){
				res.json({requests: requests})
			})
		}
		else{
			console.log("You are not a super User")
		}
	},

	approveVerify: function(req,res){
		if(req.session.user.superUser == true){
			User.findOneAndUpdate({_id: req.params.id},{verified: true}, function(err){
				if(err){
					console.log(err,"You have an error.")
				}
				else{
					console.log("This is good.")
				}
			})
		}
	},

	saveCredit: function(req,res){
		console.log(req.body)
		if(req.session.user){
			User.findOne({_id: req.session.user._id}, function(err,user){
				if(err){
					console.log(err, "You did not save the token.")
				}
				else{
					console.log(user)
					user.customer_token = req.params.id
					user.save(function(err){
						if(err){
							console.log(err,"You failed to save credit card")
						}
						else{
							console.log(user)
							console.log("You attached the token to the user.")
							res.json({result: "You saved the token"})
						}
					})
				}
			})
		}
	},

	donate: function(req,res){
		user = req.session.user
		if(req.session.user){
			console.log(user)
			console.log(user.customer_id)
			console.log(user.customer_token)
			stripe.charges.create({
				amount: 1000,
                currency: "usd",
                // customer: user.customer_id,
                source: user.customer_token,
                destination: "acct_1CnBesLKiGE48jV0"
			}).then(function(err, charge) {
		       if(err) {
		         console.log('something wrong', err);
		       }
		       if(charge) {
		         console.log('charge done');
		       };
		    });
		}
		else{
			console.log("You did not log in.")
			res.json({error:"You need to log in to donate."})
		}
	},

	stripeConnect: function(req,res){
		var clientServerOptions = {
            uri: 'https://connect.stripe.com/oauth/token',
            body: JSON.stringify({
            	'client_secret':"sk_test_t29RHUvIY0BZjRPTaAryjG2C",
            	'code': req.params.code,
            	'grant_type': "authorization_code"
        	}),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        request(clientServerOptions, function (error, response) {
            console.log(error,response.body);
            return res.json({result: response});
        });
	},

	apiUpload: function (req, res, next) {
   // This grabs the additional parameters so in this case passing     
   // in "element1" with a value.
   var busboy = new Busboy({ headers: req.headers });
   busboy.on('error', function (err) {
    throw err;
  	});

	busboy.on('files', function(fieldname, file, filename, encoding, mimetype) {
      var saveTo = path.join('.', filename);
      console.log('Uploading: ' + saveTo);
      file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('finish', function() {
   		console.log('Upload finished');
    // Your files are stored in req.files. In this case,
    // you only have one and it's req.files.element2:
    // This returns:
    // {
    //    element2: {
    //      data: ...contents of the file...,
    //      name: 'Example.jpg',
    //      encoding: '7bit',
    //      mimetype: 'image/png',
    //      truncated: false,
    //      size: 959480
    //    }
    // }
    // Grabs your file object from the request.
    	console.log(req.files)
    	const file = req.files;
   	});
   	req.pipe(busboy);
  	}
}