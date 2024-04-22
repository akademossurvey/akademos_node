const router = require("express").Router();
const Userresponse = require("../models/user-responses-model");
const User = require("../models/user-model");
const { Op } = require("sequelize");


const createUserResponse = async (req, res) => {
    try {


        console.log(req.body)

        let surveyFind = await Userresponse.findOne({ where: { userId: req.body.userId, surveyId: req.body.surveyId, status: { [Op.not]: '-1' } } })
        console.log(surveyFind, 'surveyFine')
        if (surveyFind) {
            return res.json({ status: 0, message: 'Survey already submitted' });

        } else {
            let data = await Userresponse.create(req.body);

            let finalPoints = req.body.survey.points


            let user = await User.findOne({ where: { _id: req.body.userId } })


            user.points += finalPoints
            await User.update(user, { where: { _id: req.body.userId } })

            return res.json({ status: 1, message: 'Survey submitted successfully' });
        }

        // }
    } catch (error) {
        console.log(error.message);
        return res.json({ status: 0, message: error.message });
    }
}

const getAllUserResponses = async (req, res) => {
    try {


        let data = await Userresponse.findAll({
            order: [['createdAt', 'DESC']], where: { status: { [Op.not]: "-1" } }, include: [
                {
                    model: User,
                },]
        })


        for (let i = 0; i < data.length; i++) {
            const element = array[i];

        }
        console.log(data);
        return res.json({ status: 1, data: data });
    } catch (error) {
        console.log(error.message);
        return res.json({ status: 0, message: error.message });
    }
}

const getUserResponsesBySurveyUserId = async (req, res) => {
    try {
        let data = await Userresponse.findOne({ order: [['createdAt', 'DESC']], where: { _id: req.params.id, surveyId: req.params.surveyId } })
        console.log(data);
        return res.json({ status: 1, data: data });
    } catch (error) {
        console.log(error.message);
        return res.json({ status: 0, message: error.message });
    }
}
const getUserResponsesBySurveyId = async (req, res) => {
    try {
        let data;
        if (req.params.surveyId == 'id') {
            
            data = await Userresponse.findAll({
                order: [['createdAt', 'DESC']], include: [
                    {
                        model: User,
                    },], where: { status: { [Op.not]: "-1" } },
            })
        } else {

            data = await Userresponse.findAll({
                order: [['createdAt', 'DESC']], where: { surveyId: req.params.surveyId }, include: [
                    {
                        model: User,
                    },]
            })
        }
        return res.json({ status: 1, data: data });
    } catch (error) {
        console.log(error.message);
        return res.json({ status: 0, message: error.message });
    }
}

const updateUserResponse = async (req, res) => {
    try {
        await Userresponse.update(req.body, { where: { _id: req.params.id } })
        return res.json({ status: 1, message: 'Success' });
    } catch (error) {
        return res.json({ status: 0, message: error.message });
    }
}

module.exports = {
    createUserResponse,
    getUserResponsesBySurveyUserId,
    getAllUserResponses,
    getUserResponsesBySurveyId,
    updateUserResponse
};
