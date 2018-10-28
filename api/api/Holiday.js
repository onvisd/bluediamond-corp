const getHolidayPage = async (client) => {
    const entries = await client.getEntries({
        content_type: 'page',
        limit: 1,
        query: 'Holidays'
    });

    if (!entries.items || entries.items.length !== 1) {
        throw new Error('ContentfulPageNotFound: Whole Natural Almonds');
    }

    const page = entries.items[0];

    return page;
};

const getHeroModuleContent = async (holidayPage) => {
    const heroModule = holidayPage.fields.modules.find(
        (m) => m.sys.contentType.sys.id === 'pageModuleHero'
    );
    const backgroundImageUrl = heroModule.fields.backgroundImage.fields.file.url;
    const content = heroModule.fields.content;

    return {
        backgroundImageUrl,
        content
    };
};

const getGalleryContent = async (holidayPage) => {
    const galleryModule = holidayPage.fields.modules.find(
        (m) => m.sys.contentType.sys.id === 'pageModuleGallery'
    );
    const images = galleryModule.fields.images.map((image) => {
        return {
            url: image.fields.file.url,
            title: image.fields.title
        };
    });

    return {
        images
    };
};

export default (api) => {
    api.get('/holidays/content', async (req, res) => {
        const client = req.client;
        const holidayPage = await getHolidayPage(client);

        const hero = await getHeroModuleContent(holidayPage);
        const gallery = await getGalleryContent(holidayPage);

        res.send({
            hero,
            gallery
        });
    });
};
