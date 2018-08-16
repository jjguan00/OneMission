const path = require('path');
const controllers = require('./../controllers/controllers.js');
const mongoose = require('mongoose');
const Busboy = require('busboy');

module.exports = function(app){
	app.post("/create", controllers.addUser),

	app.post("/login", controllers.logUser),

	app.get("/checkLogIn", controllers.checkLogIn),

	app.get("/logOut", controllers.logOut),

	app.get("/getUser/:id", controllers.getUser),

	app.post("/createMission", controllers.createMission),

	app.get("/getMissions", controllers.getMissions),

	app.get("/getMission/:id", controllers.getMission),

	app.get("/createPush/:id", controllers.createPush),

	app.post("/createReply/:id", controllers.createReply),

	app.post("/verifyRequest", controllers.verifyRequest),

	app.get("/getVerifyRequests", controllers.getVerifyRequests),

	app.get("/approveVerify/:id", controllers.approveVerify),

	app.post("/api/upload", controllers.apiUpload),

	app.get("/saveCredit/:id", controllers.saveCredit),

	app.post("/donate", controllers.donate),
		
	app.all("*", (req,res,next) => {
		res.sendFile(path.resolve("./dist/oneMission/index.html"))
	})
}
