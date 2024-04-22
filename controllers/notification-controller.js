const Notification = require("../models/notification-model");
const User = require("../models/user-model");
const spn = require("../functions/spn");
const Adminnotification = require("../models/admin-notification-model");
const Userresponse = require("../models/user-responses-model");
const { Op } = require("sequelize");
const Surveys = require("../models/surveys-model");



const getAllNotification = async (req, res) => {
    try {
        let data = await Notification.findAll({ order: [['createdAt', 'DESC']], });
        res.json({ status: 1, data: data });
    } catch (error) {
        res.json({ status: 0, message: error.message });
    }

}

const getNotificationByUserId = async (req, res) => {
    try {        
        let allNotifs = await Notification.findAll({ order: [['createdAt', 'DESC']], where: { userId: req.params.id } });
        for (let i = 0; i < allNotifs.length; i++) {
            const element = allNotifs[i];
            await Notification.update({isViewed:true},{where: { userId: element.userId }})            
        }
        let finalNotif = await Notification.findAll({ order: [['createdAt', 'DESC']], where: { userId: req.params.id } });
        res.json({ status: 1, data: finalNotif });
    } catch (error) {
        res.json({ status: 0, message: error.message });
    }
}

const deleteByUserId = async (req, res) => {
    try {

        console.log(req.params._id,'ihiuiuh')
        let id = parseInt(req.params._id) 

        await Notification.destroy({where:{ userId: id}});
        // await User.updateOne({ _id: req.params._id }, { $set: { readNoti: 0 } });
        res.json({ status: 1, message: "success" });
    } catch (error) {
        // console.log(error.message);
        res.json({ status: 0, message: error.message });
    }

}

const getAllAdminNotification = async (req, res) => {
    try {
        let data = await Adminnotification.findAll({ order: [['createdAt', 'DESC']] });
        res.json({ status: 1, message: "success", data: data });
    } catch (error) {
        // console.log(error.message);
        res.json({ status: 0, message: error.message });
    }
}

const sendAdminNotification = async (req, res) => {
    try {
        console.log(req.body)
        let body = req.body

        finalArray = []
        let Users;
        let tempUsers = await User.findAll({ where: { status: '1' } })
        let surveyFind = await Surveys.findAll({ where: { status: '1' } })
        if (body.filter.usersWithIncompleteSurveys == true && body.user != 'All') {

            // let finalUsers = []
            // let ageUserFind;


            // for (let j = 0; j < surveyFind.length; j++) {
            //   const element = surveyFind[j];

            //   for (let i = 0; i < tempUsers.length; i++) {
            //     const element2 = tempUsers[i];

            //     if (element.filter.exactAge == 0 && element.filter.to != 0 && element.filter.from != 0) {
            //       if (element2.age > element.filter.from && element2.age < element.filter.to) {
            //         ageUserFind = element2
            //       }
            //     } else if (element.filter.exactAge != 0 && element.filter.to == 0 && element.filter.from == 0) {
            //       if (element2.age == element.filter.exactAge) {
            //         ageUserFind = element2;
            //       } else {
            //         ageUserFind = null
            //       }
            //     } else if (body.filter.exactAge == 0 && body.filter.to == 0 && body.filter.from == 0) {
            //       ageUserFind = element2
            //     } else {
            //       ageUserFind = null
            //     }
            //     if (ageUserFind != null) {
            //       if (element.filter.selectedGender == "Male" && ageUserFind.gender == 'Male') {
            //         finalUsers.push(ageUserFind)
            //       } else if (element.filter.selectedGender == "Female" && ageUserFind.gender == 'Female') {
            //         finalUsers.push(ageUserFind)
            //       } else if (element.filter.selectedGender == "Other" && ageUserFind.gender == 'Other') {
            //         finalUsers.push(ageUserFind)
            //       } else if (element.filter.selectedGender == "FemaleOther" && (ageUserFind.gender == 'Female' || ageUserFind.gender == 'Other')) {
            //         finalUsers.push(ageUserFind)
            //       } else if (element.filter.selectedGender == "MaleFemale" && (ageUserFind.gender == 'Male' || ageUserFind.gender == 'Female')) {
            //         finalUsers.push(ageUserFind)
            //       } else if (element.filter.selectedGender == "MaleOther" && (ageUserFind.gender == 'Male' || ageUserFind.gender == 'Other')) {
            //         finalUsers.push(ageUserFind)
            //       }
            //       ageUserFind = null
            //     }

            //   }
            // }


            // Users = finalUsers;
            // console.log(Users,'Users================================>')
            // users = Userresponse
        } else {
            Users = await User.findAll({ where: { status: { [Op.not]: '-1' } } })

        }




        usersArray = []
        if (body.user == 'All') {
            finalArray = Users.slice(0)
            await Adminnotification.create(body)
            for (let i = 0; i < finalArray.length; i++) {
                const element = finalArray[i];
                spn(body.title, body.body, element._id);
            }
        } else {
            await Userresponse.findAll()


            for (let i = 0; i < Users.length; i++) {
                const element = Users[i];
                if (body.filter.exactAge == 0 && body.filter.to != 0 && body.filter.from != 0) {
                    if (element.age > body.filter.from && element.age < body.filter.to) {
                        usersArray.push(element);
                    }
                } else if (body.filter.exactAge != 0 && body.filter.to == 0 && body.filter.from == 0) {
                    if (element.age == body.filter.exactAge) {
                        usersArray.push(element);
                    }
                } else if (body.filter.exactAge == 0 && body.filter.to == 0 && body.filter.from == 0) {
                    usersArray.push(element)
                }
            }

            let tempArray = usersArray.slice(0)
            for (let i = 0; i < tempArray.length; i++) {

                const element = tempArray[i];

                if (body.filter.selectedGender == "Male" && element.gender == 'Male') {

                    finalArray.push(element)

                } else if (body.filter.selectedGender == "Female" && element.gender == 'Female') {

                    finalArray.push(element)

                } else if (body.filter.selectedGender == "Other" && element.gender == 'Other') {

                    finalArray.push(element)

                } else if (body.filter.selectedGender == "FemaleOther" && (element.gender == 'Female' || element.gender == 'Other')) {

                    finalArray.push(element)

                } else if (body.filter.selectedGender == "MaleFemale" && (element.gender == 'Male' || element.gender == 'Female')) {
                    finalArray.push(element)

                } else if (body.filter.selectedGender == "MaleOther" && (element.gender == 'Male' || element.gender == 'Other')) {
                    finalArray.push(element)
                }
            }

            await Adminnotification.create(body)
            for (let i = 0; i < finalArray.length; i++) {
                const element = finalArray[i];
                spn(body.title, body.body, element._id);
            }
        }

        res.json({ status: 1, message: "success" });
    } catch (error) {
        console.log(error.message);
        res.json({ status: 0, message: error.message });
    }

}

const deleteAdminNotification = async (req, res) => {
    try {
        await Adminnotification.destroy({where:{ _id: req.body._id }});
        res.json({ status: 1, message: "success" });
    } catch (error) {
        // console.log(error.message);
        res.json({ status: 0, message: error.message });
    }
}

module.exports = {
    getAllNotification,
    getNotificationByUserId,
    deleteByUserId,
    getAllAdminNotification,
    sendAdminNotification,
    deleteAdminNotification
};
