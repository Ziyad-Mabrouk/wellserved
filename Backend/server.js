const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use(cors({
    origin: '*'
}));


app.get("/api/get_image", async (req, res) => {
    const response = await axios.get('http://192.168.38.248:5000/api/get_image')
    res.send(response.data);
});


app.listen(port, () => {
    console.log("The server is running on port 3001");
  })
