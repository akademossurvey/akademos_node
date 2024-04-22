const Reward = require("../models/rewards-model");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");
const { Op } = require("sequelize");

const createReward =async (req, res) => {
    try {
      let body = req.body;
       await Reward.create(body);
      return res.json({ status: 1, message: "Reward Created" });
    } catch (error) {
      return res.json({ status: 0, message: error.message });
    }
  }

const getAllRewards = async (req,res)=>{
    try {
        let data = await Reward.findAll({
          order: [['createdAt', 'DESC'],
          ], where: { status: { [Op.not]: '-1' } }
        })
        return res.json({ status: 1, data: data });
      } catch (error) {
        // console.log(error.message);
        return res.json({ status: 0, message: error.message });
      }
}

const updateReward =  async (req, res) => {
    try {
        var id = req.params.id;
        await Reward.update(req.body, { where: { _id: id } });
        res.json({ status: 1 });
    } catch (error) {
        res.json({ status: 0,message: error.message });        
    }

  }


  
const getAllUserRewards = async (req,res)=>{
  try {
      let data = await Reward.findAll({
        order: [['createdAt', 'DESC'],
        ], where: { status: '1'}
      })
      return res.json({ status: 1, data: data });
    } catch (error) {
      // console.log(error.message);
      return res.json({ status: 0, message: error.message });
    }
}

module.exports = {updateReward,getAllRewards,createReward,getAllUserRewards}