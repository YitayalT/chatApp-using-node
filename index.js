const express = require('express');
const path = require('path');
const app = express();

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
// app.all('', (req, res) => {
//     res.sendFile('index');
// })
app.listen(5000, () => {
    console.log('server is started at port 5000');
});