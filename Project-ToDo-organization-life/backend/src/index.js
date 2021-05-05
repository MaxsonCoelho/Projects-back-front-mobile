const express = require("express");
const server = express();

server.get('/teste', (req, res) => {
    res.send('Testando!!!');
})

server.listen(3000, () => {
    console.log('API ONLINE');
});