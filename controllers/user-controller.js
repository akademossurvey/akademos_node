const Admin = require("../models/admin-model");
const User = require("../models/user-model");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const Surveys = require("../models/surveys-model");
const Userresponses = require("../models/user-responses-model");
const Library = require("../models/library-model");
const exceljs = require('exceljs');


const createUser = async (req, res) => {
    try {
        let userCheck = await User.findOne(
            {
                where: {
                    phone: req.body.phone,
                    phoneCode: req.body.phoneCode,
                    status: {
                        [Op.not]: '-1'
                    }
                }
            }
        );
        if (userCheck) {
            return res.json({ status: 0, message: "Phone No already exists" });
        } else {
            let data = await User.create(req.body);
            return res.json({ status: 1, data: data });
        }
    } catch (error) {
        console.log(error.message);
        return res.json({ status: 0, message: error.message });
    }
}
const updateUser = async (req, res) => {
    try {
        console.log(req.body)
        await User.update(req.body, { where: { _id: req.params.id } })
        return res.json({ status: 1, message: 'Success' });
    } catch (error) {
        return res.json({ status: 0, message: error.message });
    }
}

const loginSignup = async (req, res) => {
    try {
        let result = await User.findOne({ where: { phoneCode: req.body.phoneCode, phone: req.body.phone } });
        if (result) {
            if (result.status == '0') {
                res.json({ status: 0, message: 'Your account has been deactivated' });
            } else if(result.status == '-1'){

                res.json({ status: 0, message: 'Your account has been deleted '})

            } else {
                if (req.body.fcm[0] && result.fcm.indexOf(req.body.fcm[0]) == -1) {
                    result.fcm.push(req.body.fcm[0])
                    console.log(result.fcm)
                    await User.update({
                        fcm: result.fcm
                    }, {
                        where: {
                            _id: result._id
                        }
                    })
                }
                res.json({ status: 1, data: result, message: 'Logged in Successfully' });
            }
        } else {
            result = await User.create(req.body)
            res.json({ status: 1, data: result, message: 'Logged in Successfully' });
        }
    } catch (error) {
        res.json({ status: 0, message: error.message });

    }
}

const getAllCounts = async (req, res) => {
    try {
        let adminDoc = await Admin.count({
            where: {
                status: {
                    [Op.not]: '-1'
                }
            }
        })
        let userDoc = await User.count({
            where: {
                status: {
                    [Op.not]: '-1'
                }
            }
        });
        let surveyDoc = await Surveys.count({
            where: {
                status: {
                    [Op.not]: '-1'
                }
            }
        });
        let responseDoc = await Userresponses.count({
            where: {
                status: {
                    [Op.not]: '-1'
                }
            }
        });
        let libraryDoc = await Library.count({
            where: {
                status: {
                    [Op.not]: '-1'
                }
            }
        });

        return res.json({
            status: 1,
            admin: adminDoc,
            user: userDoc,
            survey: surveyDoc,
            userResponses: responseDoc,
            library: libraryDoc,
        });
    } catch (error) {
        console.log(error.message);
        return res.json({ status: 0, message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        let data = await User.findAll({
            order: [['createdAt', 'DESC'],
            ],
            where: {
                status: {
                    [Op.not]: '-1'
                }
            }
        })
        return res.json({ status: 1, data: data });
    } catch (error) {
        return res.json({ status: 0, message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        let data = await User.findOne({ where: { _id: req.params.id, status: { [Op.not]: '-1' } } });
        return res.json({ status: 1, data: data });
    } catch (error) {
        return res.json({ status: 0, message: error.message });
    }
}

const userLogout = async (req, res) => {
    try {
        let body = req.body;
        await User.update(
            { fcm: sequelize.fn('array_remove', sequelize.col('fcm'), body.fcm) },
            { where: { _id: body._id } }
        );
        return res.json({ status: 1, message: "success" });
    } catch (error) {
        return res.json({ status: 0, message: error.message });
    }
}
const download = async (req, res) => {
    try {
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        // Add headers
        worksheet.addRow(['ID', 'Name', 'Email','Gender','Phone','Age','Points','Address']);
        const user = await User.findOne({where:{_id:req.params.id}})

        // Add user data
        // users.forEach((user) => {
            worksheet.addRow([user._id, user.name, user.email,user.gender,user.phone,user.age,user.points,user.address]);
        // });

        // Set content type and disposition including desired file name
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'user.xlsx'
        );

        // Send the workbook as a buffer
        const buffer = await workbook.xlsx.writeBuffer();
        res.send(buffer);
    } catch (error) {
        return res.json({ status: 0, message: error.message });
    }
}

module.exports = { createUser, loginSignup, getAllCounts, getAllUsers, getUserById, userLogout, updateUser, download };
