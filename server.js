const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/dist/'));

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));
}

app.listen(PORT, ()=>{
    console.log("App is running on port" + PORT);
});