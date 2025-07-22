const mongoose=require('mongoose');
const  Schema=mongoose.Schema;
const mongooseSequence = require('mongoose-sequence')(mongoose);

const payrollSchema=new Schema({
    doctorID:{
        type:String,
        required: true
    },
    doctorName: { 
        type: String, 
        required: true 
    },

    basicSalary: {
         type: Number, 
         required: true 
        },

    otHours: {
         type: Number, 
         default: 0 
        },

    otRate: {
         type: Number, 
         default: 0
        },

    month: {             
        type: String, 
        required: true 
    },

    year: { 
        type: Number, 
        required: true 
    }
  
})

const Payroll=mongoose.model('Payroll',payrollSchema);

module.exports=Payroll;