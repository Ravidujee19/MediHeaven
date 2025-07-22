const mongoose=require('mongoose');

const  Schema=mongoose.Schema;

const pettyCashSchema=new Schema({
    date: { 
        type: Date, 
        required: true 
    }, 
    description: { 
        type: String,
        required: true 
    }, 

    amount: { 
        type: Number, 
        required: true 
    }, 
    category:{
        type: String, 
        required:true
    },
    additionalNotes:{
        type:String,
        required:false
    }
})

const PettyCash=mongoose.model('PettyCashe',pettyCashSchema);

module.exports=PettyCash;