const Admin = require("../models/admin-model");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");
const { Op } = require("sequelize");

const createAdmin =async (req, res) => {
    try {
      console.log(req.body)
      let body = req.body;
      var encryptpass = passwordHash.generate(req.body.password);
      req.body.password = encryptpass;
      let check = await Admin.findOne({ where: { email: body.email } });
      if (check) throw { message: "Email already exist" };
      await Admin.create(req.body);
      return res.json({ status: 1, message: "success" });
    } catch (error) {
      return res.json({ status: 0, message: error.message });
    }
  }

const adminLogin =   async (req, res) => {
    try {
      let body = req.body;
      let check = await Admin.findOne({ where: { email: body.email } });
      if (check && passwordHash.verify(body.password, check.password)) {
        if (check.status == "-1") {
          throw { message: "Your account has been deleted" };
        } else if (check.status == "0") {
          throw { message: "Your account has been inactive" };
        } else if (check.status == "1") {
          let tkn = jwt.sign({ adminId: check._id }, process.env.privateKey);
          return res.json({ status: 1, jwt: tkn, data: check, message: "Logged In Successfully" });
        }
      } else throw { message: "Username and Password does not match" };
    } catch (error) {
      console.log(error);
      return res.json({ status: 0, message: error.message });
    }
  }

const getAllAdmins = async (req,res)=>{
    try {
        let data = await Admin.findAll({
          order: [['createdAt', 'DESC'],
          ], where: { status: { [Op.not]: '-1' } }
        })
        return res.json({ status: 1, data: data });
      } catch (error) {
        // console.log(error.message);
        return res.json({ status: 0, message: error.message });
      }
}

const updateAdmin =  async (req, res) => {
    try {
        var id = req.params.id;
        if (req.body.password) {
          var encryptpass = passwordHash.generate(req.body.password);
          req.body.password = encryptpass;
        }
        await Admin.update(req.body, { where: { _id: id } });
        res.json({ status: 1 });
    } catch (error) {
        res.json({ status: 0,message: error.message });        
    }

  }

module.exports = {updateAdmin,getAllAdmins,adminLogin,createAdmin}