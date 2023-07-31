// requiring mongoose
const mongoose=require('mongoose');

// defining contact-schema
const contactSchema=new mongoose.Schema({
    name: {
        type: String ,
        required: true
    },
    contactno: {
        type: String ,
        required: true
    }
})

// Creating Collection(or model) named Contact with contact-schema(field-definition)
const Contact=mongoose.model('Contact',contactSchema);

// exporting Contact Collection
module.exports=Contact;