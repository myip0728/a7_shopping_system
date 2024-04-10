const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { stringify } = require("querystring");

app.use(express.json());
app.use(cors());

//connect database with MongoDB
mongoose.connect("mongodb+srv://greatstackdev:a7shop@cluster0.mwq7kfw.mongodb.net/A7_SHOPPING_SYSTEM");

//API creation
app.get("/", (req, res) => {
    res.send("Express App is running")
})

//Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//creating upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    option_type: {
        type: String,
        required: false
    },
    option: {
        type: [String],
        required: false
    },
    tag: {
        type: [String],
        required: true
    },
    no_order: {
        type: Number,
        default: 0,
    },
    no_stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 5
    },
    short_description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comment: {
        type: [{ username: String, text: String }],
        default: []
    },
    update_time: {
        type: Date,
        default: Date.now,
    }
})

//add product
app.post('/addproduct', async (req, res) => {
    //id automatically generated in database
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        category: req.body.category,
        images: req.body.images,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        option_type: req.body.option_type,
        option: req.body.option,
        tag: req.body.tag,
        no_stock: req.body.no_stock,
        short_description: req.body.short_description,
        description: req.body.short_description,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

app.post('/updateproduct', async (req, res) => {
    await Product.findOneAndUpdate({ id: req.body.id }, req.body)
        .then((result) => {
            res.json({
                success: true,
                name: req.body.name,
            });
        })
        .catch((error) => {
            // Handle the error if necessary
            console.error(error);
            res.json({
                success: false,
                error: 'An error occurred during product update.',
            });
        });
});

//User data schema
const Users = mongoose.model('Users', {
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: [{ productId: Number, option: String, quantity: Number }],
        default: []
    },
    history: {
        type: [Number],
        default: []
    },
    address: {
        type: { room: String, floor: String, building: String, area: String, district: String, city: String },
        default: { room: "", floor: "", building: "", area: "", district: "", city: "" }
    },
    name: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

//remove product
app.post('/removeproduct', async (req, res) => {
    //Find Delete the product
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed a product.");

    //Removing the product in some user shopping cart
    const users = await Users.find({});
    for (let i = 0; i < users.length; i++) {
        // Loop through user.cartData
        users[i].cartData = users[i].cartData.filter(item => item.productId !== req.body.id);
        // Save the updated user
        await users[i].save();
    }


    res.json({
        success: true,
        name: req.body.name
    })
})

//show all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All products fetched.");
    res.send(products);
})



//signup
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Email already exists" })
    }
    const user = new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    await user.save();
    const data = {
        user: {
            id: user.id,
        }
    }
    const token = jwt.sign(data, 'secret_Tech');
    res.json({ success: true, token })
})

//login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });

    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_Tech');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: 'Wrong password! Please try again.' });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong email! Please try again." })
    }
})

//show all users
app.get('/alluser', async (req, res) => {
    let users = await Users.find({});
    console.log("All users fetched.");
    res.send(users);
})

//remove user
app.post('/removeuser', async (req, res) => {
    await Users.findOneAndDelete({ email: req.body.email });
    console.log("Removed the user.");
    res.json({
        success: true,
        email: req.body.email
    })
})

//create middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_Tech');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using a valid token" })
        }
    }
}

//add product in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });

    if (userData.cartData.length === 0) {
        userData.cartData.push(req.body);
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } else {
        let itemFound = false;

        for (let i = 0; i < userData.cartData.length; i++) {
            if (userData.cartData[i].productId === req.body.productId && userData.cartData[i].option === req.body.option) {
                userData.cartData[i].quantity += req.body.quantity;
                itemFound = true;
                break;
            }
        }

        if (itemFound) {
            await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
            res.send("Added");
        } else {
            userData.cartData.push(req.body);
            await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
            res.send("Added");
        }
    }
});

//edit product in cartdata
app.post('/editcart', fetchUser, async (req, res) => {
    console.log("edit", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });

    if (userData.cartData.length === 0) {
        res.status(400).send("Cart is empty");
    } else {
        let itemFound = false;

        for (let i = 0; i < userData.cartData.length; i++) {
            if (userData.cartData[i].productId === req.body.productId && userData.cartData[i].option === req.body.option) {
                userData.cartData[i].quantity = req.body.quantity;
                itemFound = true;
                break;
            }
        }

        if (itemFound) {
            await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
            res.send("edited");
        } else {
            res.status(400).send("Can't find the element");
        }
    }
});

//remove product in cartdata
app.post('/removecartitem', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });

    if (userData.cartData.length === 0) {
        res.status(400).send("Cart is empty");
    } else {
        const result = userData.cartData.filter(item => !(item.productId === req.body.productId && item.option === req.body.option));
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: result });
        res.send("removed");
    }
});

app.post('/updateHistory', fetchUser, async (req, res) => {
    console.log("updated", req.body.productId);
    let userData = await Users.findOne({ _id: req.user.id });

    const isVisited = userData.history.includes(req.body.productId);
    if (!isVisited) {
        const result = userData.history;
        result.push(req.body.productId);
        if (result.length > 5) {
            result.shift();
        }
        await Users.findOneAndUpdate({ _id: req.user.id }, { history: result });
    } else {
        res.send("visited");
    }

})

//get user data details
app.post('/getuser', fetchUser, async (req, res) => {
    console.log("GetUser");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData);
})

app.post('/updateAddress', fetchUser, async (req, res) => {
    console.log("update address");
    const result = {
        room: req.body.room,
        floor: req.body.floor,
        building: req.body.building,
        area: req.body.area,
        district: req.body.district,
        city: req.body.city
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { address: result });
    res.send("updated");
})

app.post('/updatemobile', fetchUser, async (req, res) => {
    console.log("update mobile");
    const result = req.body.mobile
    await Users.findOneAndUpdate({ _id: req.user.id }, { mobile: result });
    res.send("updated");
})

app.post('/updatename', fetchUser, async (req, res) => {
    console.log("update name");
    const result = req.body.name
    await Users.findOneAndUpdate({ _id: req.user.id }, { name: result });
    res.send("updated");
})

app.post('/postcomment', async (req, res) => {
    console.log("Comment Posted");
    let productData = await Product.findOne({ id: req.body.productId });
    let new_comments = productData.comment;
    new_comments.push({ username: req.body.username, text: req.body.text });
    await Product.findOneAndUpdate({ id: req.body.productId }, { comment: new_comments });
    res.send("updated");
})

app.post('/paymentsuccess', async (req, res) => {
    console.log("payment success");
    let productData = await Product.findOne({ id: req.body.productId });
    let new_stock = productData.no_stock - req.body.quantity;
    await Product.findOneAndUpdate({ id: req.body.productId }, { no_stock: new_stock });
    res.send("updated");
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port " + port)
    }
    else {
        console.log("Error: " + error)
    }
})