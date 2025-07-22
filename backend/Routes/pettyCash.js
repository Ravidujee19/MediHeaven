const router=require("express").Router();
const{addPettyCash,getAllPettyCash,updatePettyCash,deletePettyCash,getPettyCashById}=require("../Controllers/pettyCashController");

//route to create pettyCash

router.route("/addPettyCash").post(addPettyCash);

//route to get all pettyCash

router.route("/").get(getAllPettyCash);

// route to get a specific petty cash
router.route("/:id").get(getPettyCashById); 

//route to update a petty cash
router.route("/update/:id").put(updatePettyCash);

//route to delete a specific pettycash
router.route("/delete/:id").delete(deletePettyCash);

module.exports= router;
