const express = require("express");
const path = require('path');
const cors = require("cors"); // required cors to handle cors origin requires on our sever
const db = require("./models"); // required database for initalization
const { authenticateAppUserToken } = require("./middleware/userAuth");

db()
// create express app
const app = express();

// create middleware in app
app.use(cors()) // cors middleware for cros origin requires

// body parser middleware
app.use(express.urlencoded());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'bundle')));



app.get(['/admin', '/admin/*'], (req, res) => {
    return res.sendFile(path.join(__dirname, '/bundle/index.html'));
});


app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/views/login.html'));
});

app.get('/api/user', (req, res, next) => {
    try {
        res.status(200).send({ data: req.userData })
    }
    catch (error) {
        next()
    }
})


require("./routes/auth-route")(app)
require("./routes/product-route")(app)
require("./routes/cart-route")(app)
require("./routes/comment-route")(app)
require("./routes/user-route")(app)





const PORT = 3000;
//Listen PORT
app.listen(PORT, () => {
    console.log(`APP LISTENING ON PORT ${PORT}`);
});
