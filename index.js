// to import express.js from package.json 
const express=require('express');

// to import path(to set views or tempelates) from node.js
const path=require('path');

// defining port number
const  port=8000;
 
//requiring database connection to mongoose from config
const db=require('./config/mongoose');
const { find } = require('./models/contact');

//requiring collection (Contact) from models
const Contact=require('./models/contact');



// defining express server(app)
const app=express();



// setting view engine as ejs(for controller to views files)
app.set('view engine','ejs');

// setting views path for controller
app.set('views',path.join(__dirname,'views'));

// middleware to encode form data using express
app.use(express.urlencoded());

// middleware to use static files(css,images,js)
app.use(express.static('assets'));



// // Middleware 1
// app.use(function(req,res,next){
//     req.myname='adsfh';
//     next();
// })

// // Middleware 2
// app.use(function(req,res,next){
//     console.log('Middleware 2 is called',req.myname);
//     next();
// })


// Defining contactslist
const contactList=[
    {
        name:'Captain',
        contactno:2345678999
    },
    {
        name:'Prem',
        contactno:78787878787
    },
    {
        name:'Kumar',
        contactno:666666666
    },
    {
        name:'Gentleman',
        contactno:567889999
    }
];

// delete contact controller redirecting to home(same page)
app.get('/delete-contact/',function(req,res){
    // get the id from the query in url
    let id=req.query.id;

    // find the contact in db using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting contact');
            return;
        }
    })
    return res.redirect('back');
})


// rendering home page controller for ('/' or 'localhost' or '127.0.0.1') request
app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
        console.log('Error in fetching contacts from database');
        return;
        }
        return res.render('home',{
            title:'Contact List',
            contact_list: contacts
        });
    });
    
    
});


// rendering practice page controller for '/practice' request
app.get('/practice',function(req,res){
    return res.render('practice',{
        title:'Radheshyam'
    })
})


// controller for form submit redirecting to home page through '/create-contact' in between 
app.post('/create-contact',function(req,res){
//    contactList.push({
//     name:req.body.name,
//     contactno:req.body.contactno
//    });
//    contactList.push(req.body);

      Contact.create({
        name: req.body.name,
        contactno: req.body.contactno
      },function(err,newConatct){
        if(err){
            console.log('Error in creating a contact',err);
            return;
        }

        console.log('**********',newConatct);
        return res.redirect('back');
      })
  
})


// to listen server on defined port and print error or success
app.listen(port,function(err){
    if(err){
        console.log('Error',err);
    }
    console.log('Yup!,My first express app is running on port',port);
})