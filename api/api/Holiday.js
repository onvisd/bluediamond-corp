const getPageWithName = async (client, name) => {
    const entries = await client.getEntries({
        content_type: 'page',
        limit: 1,
        query: name
    });

    if (!entries.items || entries.items.length !== 1) {
        throw new Error(`ContentfulPageNotFound: ${name}`);
    }

    const page = entries.items[0];

    return page;
};

const findModule = (page, moduleId) => {
    return page.fields.modules.filter((m) => m.sys.contentType.sys.id === moduleId);
};

const getHolidaysHero = async (holidayPage) => {
    const heroModule = findModule(holidayPage, 'pageModuleHero')[0];
    const backgroundImageUrl = heroModule.fields.backgroundImage.fields.file.url;
    const content = heroModule.fields.content;

    return {
        backgroundImageUrl,
        content
    };
};

const getHolidaysGallery = async (holidayPage) => {
    const galleryModule = findModule(holidayPage, 'pageModuleGallery')[0];
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

const getCarouselsHTML = async (recepies, client) => {
    const carousels = findModule(recepies, 'pageModuleHtml');

    return carousels.map(function(carousel) {
        return {
            title: carousel.fields.title,
            html: carousel.fields.html
        };
    });
};

export default (api) => {
    api.get('/holidays/content', async (req, res) => {
        const client = req.client;
        const holidayPage = await getPageWithName(client, 'Holidays');

        const hero = await getHolidaysHero(holidayPage);
        const gallery = await getHolidaysGallery(holidayPage);

        res.send({
            hero,
            gallery
        });
    });

    api.get('/holidays/recipes/content', async (req, res) => {
        const client = req.client;
        const recipesPage = await getPageWithName(client, 'Holiday Recipes');
        const carousels = await getCarouselsHTML(recipesPage, client);

        res.send({ carousels });
    });
};
