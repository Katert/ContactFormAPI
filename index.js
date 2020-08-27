const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

const port = 4444;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT || port, () => {
  console.log("Listening..");
});

app.get("/api/test", (req, res) => {
  res.send("Welcome to my API");
});

app.post("/api/v1", (req, res) => {
  var formData = req.body;

  var smtpTransport = nodemailer.createTransport({

		host: "smtp.sendgrid.net",
		port: 465,
		secure: true,
		auth: {
			user: 'apikey',
			pass: process.env.SENDGRID_API_KEY
		}

	})

	var mailOptions = {
		from: 'wesk0601@gmail.com',
		to: 'wesk0601@gmail.com',
		subject: `${formData.fname} sent you a message!`,
		html: `<p>First name: ${formData.fname}</p>\n
		<p>Last name: ${formData.lname}</p>\n
		<p>Email: ${formData.email}</p>\n
		<p>Subject: ${formData.subject}</p>\n
		<p>Phone: ${formData.phone}</p>\n
		<p>Company: ${formData.company}</p>\n
		<p>Message:<br/><br/> ${formData.message}</p>`
	}

	smtpTransport.sendMail(mailOptions, (error, response) => {
		
		if (error) {
			console.log(error)
			res.send(error)
		} else {
			console.log(response)
			res.send('Success')
		}

		smtpTransport.close();
	})

});
