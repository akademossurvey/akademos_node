const Survey = require("../models/surveys-model");
const Library = require("../models/library-model");
const Userresponse = require("../models/user-responses-model");
const User = require("../models/user-model");
const { Op } = require("sequelize");
const Userresponses = require("../models/user-responses-model");
const liesWithinTheRadius = require("../functions/checkRadius");

const createSurvey = async (req, res) => {
  try {
    let data = await Survey.create(req.body);
    return res.json({ status: 1, data: data });
  } catch (error) {
    console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
}

const updateSurvey = async (req, res) => {
  try {
    var id = req.params.id;
    await Survey.update(req.body, { where: { _id: id } });
    res.json({ status: 1, message: "Survey updated successfully" });

  } catch (error) {
    res.json({ status: 1, data: error.message });

  }
}

const getAllSurveys = async (req, res) => {
  try {
    let data;
    data = await Survey.findAll({ order: [['createdAt', 'DESC']], where: { status: { [Op.not]: "-1" } } })
    data = JSON.parse(JSON.stringify(data))
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let count = 0
      count = await Userresponses.count({ where: { surveyId: element._id } })
      element['surveyCount'] = count

    }
    return res.json({ status: 1, data: data });
  } catch (error) {
    console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
}

const getSurveyById = async (req, res) => {
  try {
    let data = await Survey.findOne({
      where: {
        _id: req.params.id,
        status: { [Op.not]: "-1" },
      }
    });
    return res.json({ status: 1, data: data });
  } catch (error) {
    console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
}

const getPendingSurveysOfUser = async (req, res) => {
  try {
    console.log('{{{{{{{{{{{{{{{{req.params.id}}}}}}}}}}}}}}}}');
    console.log(req.params.id);
    let userFind = await User.findOne({ where: { _id: req.params.id } });
    console.log(userFind)
    let data = await Survey.findAll({ where: { status: { [Op.not]: "-1" } } });
    let newArray = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.filter.exactAge == 0 && element.filter.to != 0 && element.filter.from != 0) {
        console.log(1)
        if (userFind.age > element.filter.from && userFind.age < element.filter.to) {
          newArray.push(element);

        }
      } else if (element.filter.exactAge == 0 && element.filter.to != 0 && element.filter.from == 0) {
        console.log(122)
        if (userFind.age > element.filter.from && userFind.age < element.filter.to) {
          newArray.push(element);

        }
      }

      else if (element.filter.exactAge != 0 && element.filter.to == 0 && element.filter.from == 0) {
        console.log(2)
        if (userFind.age == element.filter.exactAge) {
          newArray.push(element);
        }
      } else if (element.filter.exactAge == 0 && element.filter.to == 0 && element.filter.from == 0) {
        console.log(3, 'ksksk')
        newArray.push(element)

      }
    }
    let tempArray = newArray.slice(0)
    finalArray = []
    for (let i = 0; i < tempArray.length; i++) {
      const element = tempArray[i];

      if (element.filter.selectedGender == "Male" && userFind.gender == 'Male') {

        finalArray.push(element)

      } else if (element.filter.selectedGender == "Female" && userFind.gender == 'Female') {

        finalArray.push(element)

      } else if (element.filter.selectedGender == "Other" && userFind.gender == 'Other') {

        finalArray.push(element)

      } else if (element.filter.selectedGender == "FemaleOther" && (userFind.gender == 'Female' || userFind.gender == 'Other')) {

        finalArray.push(element)

      } else if (element.filter.selectedGender == "MaleFemale" && (userFind.gender == 'Male' || userFind.gender == 'Female')) {

        finalArray.push(element)

      } else if (element.filter.selectedGender == "MaleOther" && (userFind.gender == 'Male' || userFind.gender == 'Other')) {

        finalArray.push(element)


      } else if (element.filter.selectedGender == "All" && (userFind.gender == 'Male' || userFind.gender == 'Other' || userFind.gender == 'Female')) {

        finalArray.push(element)

      }
      // Add Location Filter Logic Here
      console.log('element');
      console.log(element.filter.location);
    }
    let trulyFinalArray = [];

    for (let i = 0; i < finalArray.length; i++) {
      const element = finalArray[i];

      // Check if element has location data
      if (element.filter.location && element.filter.location.length > 0) {
        const location = element.filter.location[0];
        const { latitude, longitude, radius } = location;

        // Check if user's location exists
        if (userFind.address_lat && userFind.address_lng) {
          const userLat = userFind.address_lat;
          const userLng = userFind.address_lng;

          // Check if user's location lies within the specified radius
          if (liesWithinTheRadius(userLat, userLng, latitude, longitude, radius)) {
            trulyFinalArray.push(element);
          }
        }
      }
      else {
        trulyFinalArray.push(element);
      }
    }

    pendingSurveys = []
    for (let i = 0; i < trulyFinalArray.length; i++) {
      const element = trulyFinalArray[i];
      // console.log(element,'ekement of survey')

      let userResponse = await Userresponse.findOne({ where: { surveyId: element._id, userId: req.params.id } })
      if (!userResponse) {
        pendingSurveys.push(element)


      }

    }


    console.log(pendingSurveys, 'pending SUrveys')
    res.json({ status: 1, data: pendingSurveys });
  } catch (error) {
    console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
}


//AH Changes
// const getPendingSurveysOfUser = async (req, res) => {
//   try {
//     console.log('{{{{{{{{{{{{{{{{req.params.id}}}}}}}}}}}}}}}}');
//     console.log(req.params.id);
//     let userFind = await User.findOne({ where: { _id: req.params.id } });
//     console.log(userFind)
//     let data = await Survey.findAll();

//     res.json({ status: 1, data: data });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ status: 0, message: error.message });
//   }
// }






















const getCompletedSurveysOfUser = async (req, res) => {
  try {


    let userResponse = await Userresponse.findAll({ order: [['createdAt', 'DESC']], where: { userId: req.params.id } })
    // let age = req.body.age;
    // let gender = req.body.gender;

    // let data = await Survey.find({ status: { $ne: "-1" } });
    // let newArray = [];


    // for (let i = 0; i < data.length; i++) {
    //   const element = data[i];
    //   if (element.filter.exactAge == 0 && element.filter.to != 0 && element.filter.from != 0) {
    //     if (age > element.filter.from && age < element.filter.to) {
    //       newArray.push(element);
    //     }
    //   } else if (element.filter.exactAge != 0 && element.filter.to == 0 && element.filter.from == 0) {
    //     if (age == element.filter.exactAge) {
    //       newArray.push(element);
    //     }
    //   } else if (body.filter.exactAge == 0 && body.filter.to == 0 && body.filter.from == 0) {
    //     newArray.push(element)
    //   }
    // }


    // let tempArray = newArray.slice(0)


    // finalArray = []

    // for (let i = 0; i < tempArray.length; i++) {
    //   const element = tempArray[i];

    //   if (element.filter.selectedGender == "Male" && gender == 'Male') {

    //     finalArray.push(element)

    //   } else if (element.filter.selectedGender == "Female" && gender == 'Female') {

    //     finalArray.push(element)

    //   } else if (element.filter.selectedGender == "Other" && gender == 'Other') {

    //     finalArray.push(element)

    //   } else if (element.filter.selectedGender == "FemaleOther" && (gender == 'Female' || gender == 'Other')) {

    //     finalArray.push(element)

    //   } else if (element.filter.selectedGender == "MaleFemale" && (gender == 'Male' || gender == 'Female')) {

    //     finalArray.push(element)

    //   } else if (element.filter.selectedGender == "MaleOther" && (gender == 'Male' || gender == 'Other')) {

    //     finalArray.push(element)

    //   }
    // }
    res.json({ status: 1, data: userResponse });
  } catch (error) {
    console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
}

const getAllLibrary = async (req, res) => {
  try {
    let data = await Library.findAll({ order: [['createdAt', 'DESC']], where: { status: { [Op.not]: "-1" } } })
    return res.json({ status: 1, data: data });
  } catch (error) {
    console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
}

const createLibrary = async (req, res) => {
  try {
    delete req.body._id
    delete req.body.createdAt
    delete req.body.updatedAt
    console.log(req.body)
    let data = await Library.create(req.body);

    return res.json({ status: 1, data: data });
    // }
  } catch (error) {
    console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
}

const updateLibrary = async (req, res) => {
  try {
    await Library.update(req.body, { where: { _id: req.body._id } });
    res.json({ status: 1, message: 'Success' });
  } catch (error) {
    res.json({ status: 0, message: error.message });
  }

}

const getLibraryById = async (req, res) => {
  try {
    let data = await Library.findOne({
      where: {
        _id: req.params.id,
        status: { [Op.not]: "-1" },
      }
    });
    return res.json({ status: 1, data: data });
  } catch (error) {
    console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
}

module.exports = {
  createSurvey,
  getAllSurveys,
  updateSurvey,
  getSurveyById,
  getPendingSurveysOfUser,
  getCompletedSurveysOfUser,
  getAllLibrary,
  createLibrary,
  updateLibrary,
  getLibraryById
};
