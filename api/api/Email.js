import nodemailer from 'nodemailer';
import aws from 'aws-sdk';

import config from '../../config';

aws.config.update({
    region: config.aws.region,
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secret
});

const transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01'
    })
});

export default (api) => {
    api.post('/email', (req, res) => {
        const approvedEmails = config.aws.approvedEmails.split(',');
        const isApprovedEmail = approvedEmails.indexOf(req.body.toEmail) !== -1;

        if(isApprovedEmail) {
            const mailOptions = {
                from: config.aws.sesSource,
                to: req.body.toEmail,
                replyTo: {
                    name: req.body.name,
                    address: req.body.fromEmail
                },
                subject: req.body.subject,
                text: req.body.message
            };

            transporter.sendMail(mailOptions, (error) => {
                if(error)
                    res.status(500).send(error.message);
                else
                    res.status(200).send('Message sent successfully');
            });
        } else {
            res.status(500).send('Something went wrong');
        }
    });
};
