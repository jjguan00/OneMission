const express = require( "express" );
const app = express();


require('./server/utils/mongoose');
require('./server/utils/middleware')(app)

require('./server/utils/routes')(app);


app.listen(8000, function(){
	console.log("listening to server 8000")
})
