var express = require('express');
var app = module.exports.app = exports.app = express();

app.listen(8080, () => console.log('Example app listening on port 8080!'))

app.use(express.static('docs'))
