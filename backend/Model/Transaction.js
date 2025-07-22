const mongoose=require('mongoose');
const  Schema=mongoose.Schema;
const mongooseSequence = require('mongoose-sequence')(mongoose);

const transactionSchema=new Schema({
    transactionID:{
        type: Number, 
        unique: true,
    },

   

    type:{
        type: String,
        enum:['DoctorAppointment','YogaAppointment','Therapy','InventoryPurchase','InventorySale'],
        required: true,
        
    },
    amount:{
        type: Number,
        required: true,
    },
    date:{
        type: String,
        required: true,
        default:()=>{
        const date=new Date();
        date.setHours(0,0,0,0);
        return date.toISOString().split('T')[0]; 
       
        },
    },

})

// Apply auto-increment for the transactionID field (Mongoose Sequence will automatically increment this field)
transactionSchema.plugin(mongooseSequence, {
    inc_field: 'transactionID',  // Use 'transactionID' as the auto-increment field
    start_seq: 1,  // Start auto-increment from 1
});



// a function to ensure that only date is being recorded without time

transactionSchema.pre('save', function (next) {
    if (this.isNew) {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        this.date = date.toISOString().split('T')[0]; // Ensure it's only the date
    }
    
    next();
});




const Transaction=mongoose.model('Transaction',transactionSchema);

module.exports=Transaction;
