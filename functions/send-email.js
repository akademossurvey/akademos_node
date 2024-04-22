// send email

const nodemailer = require("nodemailer");


module.exports = async (mailOptions) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        // auth: {
        // user: testAccount.user, // generated ethereal user
        // pass: testAccount.pass, // generated ethereal password
        // },
        host: 'mail.smartii.io',
        port: 465,
        secure: true,
        auth: {
            user: process.env._email,
            pass: process.env._pass
        }
    });

    // send mail with defined transport object
    // let info = await transporter.sendMail({
    //     // from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //     from: process.env._email, // sender address
    //     to: "ehtishammubashar94@gmail.com, alifaraz933@yahoo.com", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    // });
    let info = await transporter.sendMail(mailOptions);
    console.log(29, info);
    return true
}

// send email