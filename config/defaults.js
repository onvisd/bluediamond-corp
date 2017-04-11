require('dotenv').config();

export default {
    web: {
        port: process.env.PORT || 3000
    },
    services: {
        rendering: {
            port: 3002
        },
        api: {
            port: 3003,
            spaceId: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN
        }
    },
    redis: {
        port: process.env.REDIS_PORT || 6379
    },
    webpack: {
        devserver: {
            port: 3001
        }
    },
    aws: {
        key: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        sesSource: process.env.SES_SOURCE_ADDRESS,
        approvedEmails: process.env.APPROVED_DESTINATION_EMAILS
    }
};
