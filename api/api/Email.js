import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import htmlToText from 'html-to-text';

import * as emailTemplates from '../email';
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
        const isValidTemplate = typeof emailTemplates[req.body.template] !== 'undefined';
        const isTest = req.body.test === 1 || req.body.test === true;

        if(isApprovedEmail && isValidTemplate) {
            const html = ReactDOMServer.renderToStaticMarkup(
                React.createElement(emailTemplates[req.body.template], req.body)
            );

            const mailOptions = {
                from: config.aws.sesSource,
                to: req.body.toEmail,
                replyTo: {
                    name: req.body.name || `${req.body.firstName} ${req.body.lastName}`,
                    address: req.body.email
                },
                subject: req.body.subject,
                html,
                text: htmlToText.fromString(html)
            };

            if(isTest) {
                res.send(mailOptions);
            } else {
                transporter.sendMail(mailOptions, (error) => {
                    if(error)
                        res.status(500).send(error.message);
                    else
                        res.status(200).send('Message sent successfully');
                });
            }
        } else {
            res.status(500).send('Something went wrong');
        }
    });
};
