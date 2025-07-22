const Transaction=require("../Model/Transaction");

const addTransaction=(req,res)=>{
    
    const type=req.body.type;
    const amount=Number(req.body.amount)
    let date=new Date();

    

    const newTransaction=new Transaction({

        type,
        amount,
        date
    });
    
    newTransaction.save().then(()=>{

        res.json("Transaction recorded");
    }).catch((err)=>{
        console.log(err);
    });
}

const getAllTransactions=(req,res)=>{
    Transaction.find().then((transactions)=>{
        res.json(transactions)
    }).catch((err)=>{
        console.log(err)
    });
};


//to delete a specific Transaction

const deleteTransaction=(async(req,res)=>{

    let transactionId=req.params.id;

    await Transaction.findByIdAndDelete(transactionId)
    .then(()=>{

        res.status(200).send({status:"Transaction Deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data"})
    })
})

//for revenue report generation

const getReports=async(req,res)=>{
    try {
        // Total revenue
        const totalRevenue = await Transaction.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
        ]);

        //to get revenue based on the type eg-: for doctor ppointments
        const revenueByType = await Transaction.aggregate([
            { $group: { _id: "$type", totalRevenue: { $sum: "$amount" } } }
        ]);

        //will do revenue by month later

        res.json({
            totalRevenue:totalRevenue[0]?.totalRevenue||0,//this ensure even if no transactions no error will be recorderd
            revenueByType
        });

    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};



//for profit/loss statement report generation
const getProfitLossReport=async(req,res)=>{

    try{

            const{startDate,endDate}=req.query;
            const revenueTypes=["DoctorAppointment","YogaAppointment","Therapy","InventorySale"];
            const expenseTypes=["InventoryPurchase"];

            //To get the total revenue
            const totalRevenue = await Transaction.aggregate([
                { 
                    $match: { 
                        type: { $in: revenueTypes }, 
                        date: { $gte: startDate, $lte: endDate } 
                    }
                },
                { 
                    $group: { 
                        _id: "$type", 
                        total: { $sum: "$amount" }
                    }
                }
            ]);

            //to get total expenses(Here only for inventory purchases we should also take for doctor,yoga,therapy salry payments)
            const totalExpenses = await Transaction.aggregate([
                { 
                    $match: { 
                        type: { $in: expenseTypes }, 
                        date: { $gte: startDate, $lte: endDate } 
                    }
                },
                { 
                    $group: { 
                        _id: "$type", 
                        total: { $sum: "$amount" }
                    }
                }
            ]);



            let revenueSummary={};
            let revenueTotal = 0;
            let doctorBookingTotal = 0;
            let therapyBookingTotal = 0;
            let yogaBookingTotal = 0;

            totalRevenue.forEach(entry=>{
                revenueSummary[entry._id]=entry.total;       //to display the summary of all revenues

                revenueTotal+=entry.total;                  //to calculate profit/loss statement we need revenue total

                if(entry._id=="DoctorAppointment"){
                    doctorBookingTotal=entry.total;         //to store the total for all doctor appointments

                }else if (entry._id === "YogaAppointment") {
                    yogaBookingTotal = entry.total;          // Store total for YogaAppointments

                } else if (entry._id === "Therapy") {
                    therapyBookingTotal = entry.total;        // Store total for Therapy
                }

            });


           
            //for doctors doctors get 80% of thier booking value
            //for Therapy doctors get 90% of thier booking value
            //for Yoga doctors get 70% of thier booking value

            const doctorPayments = doctorBookingTotal * 0.8;  
            
            const therapyPayments = therapyBookingTotal * 0.9; 

            const yogaPayments = yogaBookingTotal * 0.7;  

            let expenseSummary={

                DoctorPayments:doctorPayments,
                TherapyPayment:therapyPayments,
                YogaPayments:yogaPayments

            };

            let expenseTotal =doctorPayments+yogaPayments + therapyPayments;  //to get the total for all expenses without the invetory purchases
            
            //for each loop to get expenses for inventory purchases and add them to total expenses
            totalExpenses.forEach(entry => {
                expenseSummary[entry._id] = entry.total;
                expenseTotal += entry.total;
            });

            const profitOrLoss=revenueTotal-expenseTotal;

            res.json({
                revenueSummary,
                expenseSummary,
                revenueTotal,
                expenseTotal,
                profitOrLoss
            });

    }

    catch(error){
        console.error("Error generating Profit & Loss Report:", error);
        res.status(500).json({ message: "Error generating the report" });
    }
}









//for balanced sheet report generation

const getBalancedSheetReport=async(req,res)=>{

    try{
      

        const{startDate,endDate}=req.query;
        const revenueTypes=["DoctorAppointment","YogaAppointment","Therapy","InventorySale"];
        const assetTypes = ["InventoryPurchase"]; 
        
        

        //To get the total revenue
        const totalRevenue = await Transaction.aggregate([
            { 
                $match: { 
                    type: { $in: revenueTypes }, 
                    date: { $gte: startDate, $lte: endDate } 
                }
            },
            { 
                $group: { 
                    _id: "$type", 
                    total: { $sum: "$amount" }
                }
            }
        ]);

        //to get total expenses(Here only for inventory purchases we should also take for doctor,yoga,therapy salry payments)
        

        

        let revenueSummary={};
        let revenueTotal = 0;
        let doctorBookingTotal = 0;
        let therapyBookingTotal = 0;
        let yogaBookingTotal = 0;

        totalRevenue.forEach(entry=>{
            revenueSummary[entry._id]=entry.total;       //to display the summary of all revenues

            revenueTotal+=entry.total;                  //to calculate total revenue
            if(entry._id=="DoctorAppointment"){
                doctorBookingTotal=entry.total;         //to store the total for all doctor appointments

            }else if (entry._id === "YogaAppointment") {
                yogaBookingTotal = entry.total;          // Store total for YogaAppointments

            } else if (entry._id === "Therapy") {
                therapyBookingTotal = entry.total;        // Store total for Therapy
            }

        });


       
        //for doctors doctors get 80% of thier booking value
        //for Therapy doctors get 90% of thier booking value
        //for Yoga doctors get 70% of thier booking value

        const doctorSalary = doctorBookingTotal * 0.8;  
        
        const therapySalary = therapyBookingTotal * 0.9; 

        const yogaSalary = yogaBookingTotal * 0.7;  

        let liabilitiesSummary={

            DoctorSalary:doctorSalary,
            TherapySalary:therapySalary,
            YogaSalary:yogaSalary

        };

        let liabilitiesTotal =doctorSalary+yogaSalary + therapySalary; 
        
        const totalAssets = await Transaction.aggregate([
            {
              $match: {
                type: { $in: assetTypes }, 
                date: { $gte: startDate, $lte: endDate }
              }
            },
            {
              $group: {
                _id: "$type",
                total: { $sum: "$amount" }
              }
            }
          ]);

        let assetsSummary = {};
        let assetsTotal = 0;

        totalAssets.forEach(entry => {
        assetsSummary[entry._id] = entry.total; 
        assetsTotal += entry.total;  // Calculate total assets 
        });

        res.json({
            revenueSummary,
            assetsSummary,
            liabilitiesSummary,
            revenueTotal,
            liabilitiesTotal,
            assetsTotal

            
        })


    }
    catch(error){
        console.error("Error generating Profit & Loss Report:", error);
        res.status(500).json({ message: "Error generating the report" });
    }



}

module.exports={addTransaction,getAllTransactions,getReports,getProfitLossReport,getBalancedSheetReport,deleteTransaction};

