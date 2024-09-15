import express, { response } from "express";
const app = express();
const PORT = 8080;
import cors from "cors";
import mongoose from "mongoose";
import {encryptObj, decryptObj} from "./scripts/EncryptedHashGenerator.js"

app.use(express.json());
app.use(cors())

const mongoURI = "mongodb+srv://yashsharma22003:A4ekLdpcK6zirySj@cluster0.hgkrd.mongodb.net/EncryptionText?retryWrites=true&w=majority&appName=Cluster0";

const Db = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("MongoDb Connected at" , mongoURI);
    }
    catch(e){
        console.log("Error Connecting To The MongoDb", e);
        process.exit(1);
    }
};

Db();

const textSchema = new mongoose.Schema({
    text: String,
    key: String,
    randomness: String,
    encryptedText: String,

}
);

const text = mongoose.model('text', textSchema);

app.get("/api/home", (req, res) => {
    res.json({ message: "Like This Videos", people: ['Harrpy, "Jack, "Barry']});
});

app.post("/home/input" , async (req, res) => {
    try{
        const newText = new text(req.body)
        const savedText = await newText.save();
      
        res.json(savedText._id);
    } catch (err) {
        res.status(500).json({ successful: false, message: "Error in saving Text"}); 
    }
});

app.get("/home/input/:id" , async(req, res) => {
    try{ const textId = req.params.id;
        const resText = await text.findById(textId);
    
        if(!resText) {
            return res.status(404).json({success: false, message: "Text not Found"});
        }
        res.json({
            success: true,
            text: resText.text,
            key: resText.key
        }) }
     catch (e) {
        console.log(e);
        res.status(500).json({ success: false, text: "Failed To Retrieve Text"});
    }
})

app.get('/home/alltext', async (req, res) => {
    try {
      const wholeText = await text.find();
      res.json(wholeText); 
    } catch (e) {
      console.error('Error fetching data:', e); // Log error details to console
      res.status(500).json({ success: false, message: 'Failed to retrieve data', error: e.message });
    }
  });

app.post('/home/alltext/:id', async(req, res) => {
   try { const _id = req.params.id;
    const textToEncrypt = await text.findById(_id);
    const textFinal = textToEncrypt.text;
    const encryptedHash = encryptObj(textFinal);
    await text.findOneAndUpdate(
        { _id: _id},
        {$set: { 
            key: encryptedHash.key,
            encryptedText: encryptedHash.encryptedData,
            randomness: encryptedHash.iv
         }}
        
    )
    // console.log( {success: true, encryptedText: encryptedHash.encryptedData, key: encryptedHash.key, orignalText: textFinal, randomness: encryptedHash.iv} )
    res.json({success: true, encryptedText: encryptedHash.encryptedData, key: encryptedHash.key, orignalText: textFinal, randomness: encryptedHash.iv});
   } catch (e) {
    console.log(e)
   }
})

app.get('/home/decrypt/:id', async(req, res) => {
    try{
        const toDecrypt = await text.findById(req.params.id);
       const responseText = decryptObj(toDecrypt.encryptedText, toDecrypt.key, toDecrypt.randomness);
        res.json({decrytedText:responseText});
    }catch (e) {
        console.log(e)
        res.status(500).json({success: false, message: e});
} })

app.delete("/home/alltext/:id", async(req, res) =>{
    try{        
        const toDelete = await text.findById(req.params.id);
       const response = await text.deleteOne({_id: req.params.id});
       
       res.json({res: response, deleted: toDelete.text});
    } catch (e){
        console.log(e);
    }
})

app.get("/home/decrypt/", async (req,res) => {
    const { hash, keyOne, keyTwo } = req.query;

    if(!hash && !keyOne && !keyTwo){
       return res.status(400).json({ response: "failure"});
    }
   
    const verify = await text.findOne({encryptedText: hash})

  


    if(verify.key === keyOne && verify.randomness === keyTwo){
        return res.status(200).json({DecryptedText: verify})
    }
    else{ res.status(400).json({ response: "failure"});}
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});