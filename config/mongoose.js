// require the library
const mongoose=require('mongoose');

// Connect to the database
mongoose.connect('mongodb://127.0.0.1/contacts_list_db');

// acquire the connection (to check if it is successful) 
const db=mongoose.connection;

// for error
db.on('error',console.error.bind(console,'Error Connecting to db'));

// connected to database then print the message
db.once('open',function(){
    console.log("Successfully connected to database");
});