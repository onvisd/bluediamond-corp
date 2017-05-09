export default {
    web: {
        port: process.env.WEB_PORT || 3000
    },
    services: {
        rendering: {
            port: process.env.RENDERING_PORT || 3002,
            ajax: {
                host: process.env.AJAX_HOST || 'localhost',
                port: process.env.AJAX_PORT || process.env.WEB_PORT || 3000
            }
        },
        api: {
            port: process.env.API_PORT || 3003,
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
            port: process.env.DEVSERVER_PORT || 3001
        }
    },
    aws: {
        region: process.env.AWS_REGION || 'us-east-1',
        key: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        sesSource: process.env.SES_SOURCE_ADDRESS,
        approvedEmails: process.env.APPROVED_DESTINATION_EMAILS
    }
};
