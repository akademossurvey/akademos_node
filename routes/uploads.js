const express = require('express');
var router = express.Router();
var fs = require("fs");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/', upload.single('image'), (req, res) => {
    console.log('Uploading Image')
    res.json({ status: 1, imageName: req.file.filename });
});


router.post('/imgupload', function (req, res) {
    var name = req.body.name;
    var img = req.body.image;

    var realFile = Buffer.from(img, "base64");
    //this name here come from the flutter side//
    fs.writeFile('./uploads/' + name, realFile, function (err) {
        if (err)
            console.log(err);
    });
    res.json({ message: "success", address: name });


});


router.get('/:imageName', function (req, res) {
    var imageName = req.params.imageName;
    var imagePath = './uploads/' + imageName;

    // Check if the file exists
    fs.exists(imagePath, function (exists) {
        if (exists) {
            // Read the file and send it as a response
            fs.readFile(imagePath, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Error reading the file" });
                } else {
                    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    res.end(data);
                }
            });
        } else {
            res.status(404).json({ message: "Image not found" });
        }
    });
});
module.exports = router;


