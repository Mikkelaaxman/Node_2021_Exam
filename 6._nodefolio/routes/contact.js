"use strict";
const { urlencoded } = require("body-parser");
const nodemailer = require("nodemailer");
const router = require("express").Router();


async function main(emailAdress) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: emailAdress, // sender address
        to: "victorwpetersen@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>email send?</b>", // html body
    });


    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


router.post("/api/contact", (req, res) => {
    console.log(req.body.email)
    main(req.body.email).catch(console.error);
    setTimeout(() => {
        res.redirect("/");
    }, (2 * 1000))
});

module.exports = {
    router
};