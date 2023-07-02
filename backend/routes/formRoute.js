const router = require("express").Router();
const Form = require("../FormModel");

router.post("/submit",async(req,res)=>{
   
    const {
        ComplainantName,
        ComplainantAddress,
        dateTime,
        accussedName,
        accussedAddress,
        descriptionOfCrime
    } = req.body;

    const formdata = new Form({
        ComplainantName,
        ComplainantAddress,
        dateTime,
        accussedName,
        accussedAddress,
        descriptionOfCrime,
    });
    try{
        const savedData = await formdata.save();
        res.status(200).json({message :"Successfully added..."});
    }catch(err){
        res.status(500).json({message : err.message});
    }
});

router.get("/getRequests",async(req,res) => {
    try{
        const request = await Form.find();
        res.status(200).json({message:"Success" , request});
    }catch(err){
        return res.status(500).json({message : err.message});
    }
})

module.exports = router;