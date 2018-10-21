const getHolidayPage = async (client) => {
    const entries = await client.getEntries({
        content_type: 'page',
        limit: 1,
        query: 'Whole+Natural+Almonds'
    });

    if (!entries.items || entries.items.length !== 1) {
        throw new Error('ContentfulPageNotFound: Whole Natural Almonds');
    }

    const page = entries.items[0];

    return page;
};

const getHeroImage = async (holidayPage) => {
    const heroModule = holidayPage.fields.modules.find(
        (m) => m.sys.contentType.sys.id === 'pageModuleGenericHero'
    );
    const heroImage = heroModule.fields.backgroundImage.fields.file.url;

    return heroImage;
};

export default (api) => {
    api.get('/holidays/assets', async (req, res) => {
        const client = req.client;
        const holidayPage = await getHolidayPage(client);
        const heroImage = await getHeroImage(holidayPage);

        res.send({
            heroImage
        });
    });
};
