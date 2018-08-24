require('dotenv').config();

const fs = require('fs');
const path = require('path');
const moment = require('moment');
const spaceImport = require('contentful-import');
const spaceExport = require('contentful-export');

const exportSpace = process.env.CONTENTFUL_EXPORT_SPACE_ID;
const importSpace = process.env.CONTENTFUL_IMPORT_SPACE_ID;
const prodSpace = process.env.CONTENTFUL_PRODUCTION_SPACE_ID;
const prodImport = process.env.CONTENTFUL_PRODUCTION_IMPORT;

const exportConfig = {
    spaceId: exportSpace,
    managementToken: process.env.CONTENTFUL_CMS_TOKEN,
    includeDrafts: true,
    errorLogFile: './migrate/logs',
    exportDir: './migrate/',
    contentFile: './latest.json'
};

const importConfig = {
    spaceId: importSpace,
    managementToken: process.env.CONTENTFUL_CMS_TOKEN,
    errorLogFile: './migrate/logs',
    contentFile: './migrate/latest.json'
};

const backupConfig = {
    spaceId: importSpace,
    managementToken: process.env.CONTENTFUL_CMS_TOKEN,
    includeDrafts: true,
    errorLogFile: './migrate/logs',
    exportDir: './migrate/archives',
    contentFile: `./${importSpace}-${moment().format('YYYY-MM-DD-HH:mm:ss')}.json`
};

// Import latest data to the dev environment
const runImport = () => spaceImport(importConfig)
    .then(() => {
        console.log(`
            ✅ Data Imported Successfully!
            Development (${importSpace}) is up to date.
        `);
    })
    .catch((err) => {
        console.log('⚠ Import failed: ', err);
    });

// Export current prod data
const runExport = () => spaceExport(exportConfig)
    .then(() => {
        console.log(`
            ✅ Data Exported from (${exportSpace}) Successfully!
            Starting Import...`
        );
        return runImport();
    })
    .catch((err) => {
        console.log('⚠ Export failed: ', err);
    });

// Backup destination data
const runBackup = () => spaceExport(backupConfig)
    .then(() => {
        console.log(`
            ✅ Data Imported Successfully!
            (${importConfig}) is backed-up.
        `);

        return runExport();
    })
    .catch((err) => {
        console.log('⚠ Import failed: ', err);
    });

// Move current 'latest' export to 'archives' and rename
const updateMigration = () => {
    if(fs.existsSync(path.join(__dirname, 'latest.json'))) {
        fs.rename(
            path.join(__dirname, 'latest.json'),
            path.join(
                __dirname,
                `/archives/${exportSpace}-${moment().format('YYYY-MM-DD-HH:mm:ss')}.json`
            ),
            (err) => {
                if(err)
                    console.log(`ERROR: ${err}`);
            });
    }

    return runBackup();
};

// Check for production import
if(importSpace === prodSpace && prodImport === false) {
    return console.log(
        `⚠ It looks like you are attempting to import to production. If this is correct, please
        update the .env property 'CONTENTFUL_PRODUCTION_IMPORT' to true, otherwise change your
        import space id.`
    );
}

updateMigration();
