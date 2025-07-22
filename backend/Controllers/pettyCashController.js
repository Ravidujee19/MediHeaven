const PettyCash=require("../Model/PettyCash");


//to add a petty cash

const addPettyCash=(req,res)=>{
    const date=req.body.date;
    const description=req.body.description;
    const amount=Number(req.body.amount);
    const category=req.body.category;
    const additionalNotes=req.body.additionalNotes;

    const newPettyCash=new PettyCash({

        date,
        description,
        amount,
        category,
        additionalNotes
    });

    newPettyCash.save().then(()=>{

        res.json("PettyCash record stored");
    }).catch((err)=>{
        console.log(err);
    });
};

//to get all petty cashes

const getAllPettyCash=(req,res)=>{
    PettyCash.find().then((pettycashes)=>{
        res.json(pettycashes)
    }).catch((err)=>{
        console.log(err)
    });
};



//to get a specific petty cash by its id
const getPettyCashById = async (req, res) => {
    const { id } = req.params;
    try {
        const pettyCash = await PettyCash.findById(id);  
        if (!pettyCash) {
            return res.status(404).json({ message: "Petty cash record not found" });
        }
        res.json(pettyCash);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching petty cash record" });
    }
};




//to update a petty cash
const updatePettyCash=(async(req,res)=>{

    
    let pettyCashId=req.params.id;  //to fetch the id sent by url as parameter

    const date=req.body.date;
    const description=req.body.description;
    const amount=req.body.amount;
    const category=req.body.category;
    const additionalNotes=req.body.additionalNotes;

    const updatePettyCash={     //seperate object for the update
        date,
        description,
        amount,
        category,
        additionalNotes
    }

    const update=await PettyCash.findByIdAndUpdate(pettyCashId,updatePettyCash)
    .then(()=>{

        res.status(200).send({status:"Petty Cash updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"})
    })

    
})

//to delete a specific petty cash

const deletePettyCash=(async(req,res)=>{

    let pettyCashId=req.params.id;

    await PettyCash.findByIdAndDelete(pettyCashId)
    .then(()=>{

        res.status(200).send({status:"Petty Cash deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data"})
    })
})

module.exports={addPettyCash,getAllPettyCash,updatePettyCash,deletePettyCash,getPettyCashById};
