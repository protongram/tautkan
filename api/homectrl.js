const db = require('./database.js')
const pages = db.pages
const users = db.users
const themes = db.styles


exports.getLink = (req, res)   => {
  pages.findOne({
    where:{link_route:req.params.lid},
    duplicating:false,
    subQuery:false
  })
    .then((blogs) => {
      res.json({
        message: "tautkan : pages",
        data: blogs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving books.",
        data: null,
      });
    });
};


exports.getUser = (req, res) => {
  users.findOne({
    limit:10,
    offset:0,
    where:{id:req.params.id}, 

    duplicating:false,
    subQuery:false
  })
    .then((users) => {
      res.json({
        message: "tautkan : user",
        data: users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving books.",
        data: null,
      });
    });
};

exports.linkExist=(req,res)=>{
  pages.findOne({
    limit:1,
    where:{link_route:req.params.linkroute}
  })
    .then((users) => {
      res.json({
        message: "tautkan : link exist",
        data: users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving books.",
        data: null,
      });
    })   
}


exports.getStyle=(req,res)=>{
  themes.findAll({})
    .then((users) => {
      res.json({
        message: "tautkan : styles",
        data: users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving books.",
        data: null,
      });
    })   

}

exports.uploadStyle = (req,res) => {
  // Get the file that was set to our field named "image"
  var {files} = req.files;
  files.mv(__dirname+'/../public/css/' + files.name);

  styles.create(
    {
      css:files.name,
      name:req.body.name,
      author:req.body.author

    }).then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      res.json({ error: error });
    });
}


exports.uploadPages = (req,res) => {
  const fs = require('fs')
  console.log(req)
  var filePath = __dirname+'/../public/links/'+req.body.linkRoute+'.json';
  
  var data = JSON.stringify(req.body.pagedata);
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('Error occured while writing data to a file.');    
    } 
    else {
      console.log("Content saved successfully.")    
    }});
  pages.create(
    {
      user_id:2,
      file:req.body.linkRoute+".json",
      link_route:req.body.linkRoute,
      token:btoa(btoa(req.body.token))
    }
  )
 }
