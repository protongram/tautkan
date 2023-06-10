const fileUpload = require('express-fileupload');
const fs = require('fs');
const express = require('express');
const app = express()
const homectrl = require('./api/homectrl.js');
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5000', 'https://tautkan.my.id:5000']
}));


app.set('json spaces', 2)
app.use(fileUpload())
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded




app.get('/l/:lid',homectrl.getLink);
app.get('/u/:id',homectrl.getUser)
app.get('/check/:linkroute',homectrl.linkExist)
app.get('/style',homectrl.getStyle)
app.get('/postpages',(req,res)=>{
res.send(`
<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<h1>SEND FORM</h1>
<form action="/newpages" enctype="application/x-www-form-urlencoded" method="post">
<input type="text" name="linkRoute" placeholder="link route">
<textarea name="pagedatas"></textarea>
<input type="submit" value="Kirim">
</form>
`)
})
app.post('/newpages',bodyParser.json(),homectrl.uploadPages)
app.post('/newstyle',homectrl.uploadStyle)

app.listen(3000, function () {
  console.log(`Server running on http://localhost:3000`);
});

module.exports = app
