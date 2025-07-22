const router=require("express").Router();
const{addTransaction,getAllTransactions,getReports,getProfitLossReport, getBalancedSheetReport,deleteTransaction}=require("../Controllers/transactionController");


//route to create transactions

router.route("/addTransaction").post(addTransaction);

//route to get all transactions

router.route("/").get(getAllTransactions);

//route to delete a transaction

router.route("/delete/:id").delete(deleteTransaction);


//route to generate revenue report
router.get("/revenue-reports", getReports);


//route to generate profit or loss statements
router.get("/profit-loss-statement",getProfitLossReport);

router.get("/balance-sheet-report",getBalancedSheetReport);
 

module.exports= router;