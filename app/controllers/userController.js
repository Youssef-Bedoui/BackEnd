const userModel = require("../models/user");

exports.createUser = function (req, res) {
  console.log(req.body);
  userModel.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  
    },
    (err, data) => {
      res.json(data);
    }
  );
};

exports.updateUser = async function (req, res) {
  try { 
    console.log(req.body, req.body._id);
    
    const user = await userModel.findOneAndUpdate(
        { _id: req.body._id },
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          "address.line1": req.body.address.line1,
          "address.line2": req.body.address.line2,
          "address.city": req.body.address.city,
          "address.state": req.body.address.state
        },
        {upsert: true, omitUndefined: true, new: true }
      );
      console.log(user);
      res.json(user)
  } catch (error) {
      res.json(error)
  }
}
exports.getAllUsers = async function (req, res) {
   try {
       const users = await userModel.find();
       res.json(users);
   } catch (error) {
       res.json(error);
   }
}

exports.getUser = async function(req,res) {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user);

  } catch (error) {
    res.json(error);
  }
}
exports.deleteUser = async function(req,res) {
  try {
    const user = await userModel.deleteOne(
      {_id:req.params.id}
    )
    res.json(user);
  } catch (error) {
    res.json(error)
  }
}