const port=4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");
const { stringify } = require("querystring");

app.use(express.json());
app.use(cors());

//connect database with MongoDB
mongoose.connect("mongodb+srv://greatstackdev:a7shop@cluster0.mwq7kfw.mongodb.net/A7_SHOPPING_SYSTEM");

//API creation
app.get("/",(req,res)=>{
    res.send("Express App is running")
})

//Image storage engine
const storage=multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage})

//creating upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for creating products
const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

//add product
app.post('/addproduct',async (req,res)=>{
    //id automatically generated in database
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//remove product
app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed a product.");
    res.json({
        success: true,
        name:req.body.name
    })
})

//show all products
app.get('/allproducts',async (req,res)=>{
    let products=await Product.find({});
    console.log("All products fetched.");
    res.send(products);
})

//add user 
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//signup
app.post('/signup', async(req,res)=>{
    let check = await Users.findOne({email : req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"Email already exists"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++){
        cart[i] = 0;
    }
    const user = new Users({
        name : req.body.name ,
        email : req.body.email ,
        password : req.body.password,
        cartData : cart,
    })
    await user.save();
    const data = {
        user:{
            id:user.id,
        }
    }
    const token = jwt.sign(data, 'secret_Tech');
    res.json({success:true, token})
}) 

//login
app.post('/login',async(req,res) =>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_Tech');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:'Wrong password! Please try again.'});
        }
    }
    else{
        res.json({success:false,errors:"Wrong email! Please try again."})
    }
})

//show all users
app.get('/alluser',async (req,res)=>{
    let users=await Users.find({});
    console.log("All users fetched.");
    res.send(users);
})

//remove user
app.post('/removeuser', async (req,res)=>{
    await Users.findOneAndDelete({email:req.body.email});
    console.log("Removed the user.");
    res.json({
        success: true,
        enail:req.body.email
    })
})

//create middlware to fetch user
    const fetchUser=async(req,res,next)=>{
        const token=req.header('token');
        if(!token){
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
        else{
            try{
                const data=jwt.verify(token,'secret_ecom');
                req.user=data.user;
                next();
            }catch(error){
                res.status(401).send({errors:"Please authericate using a valid token"})
            }
        }
    }

//add product in cartdata
app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("added",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

//remove product in cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

//get cartdata after login
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+port)
    }
    else{
        console.log("Error: "+error)
    }
})