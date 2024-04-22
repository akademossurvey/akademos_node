const Setting = require("../models/settings-model");

const createSettings =  async (req, res) => {
    try {
      let ordercheck = await Setting.findOne({where:{ order: 1 }});
      if (!ordercheck) {
        data = await Setting.create(req.body);
      } else {
         await Setting.update(req.body,{where:{_id:req.params.id}});
         data = await Setting.findOne({where:{ _id:req.params.id }})
      }
      res.json({ status: 1, data: data, message: "Settings updated successfully" });
    } catch (error) {
      console.log(error.message)
      res.json({ status: 0, message: error.message });
    }
}

const getSettings = async (req, res) => {
    try {
        let setting = await Setting.findOne({where:{ order: 1 }});
        res.json({ data: setting, status: 1 });    
    } catch (error) {
        res.json({ message: error.message, status: 0 });
    }
  };

module.exports = {createSettings,getSettings};
