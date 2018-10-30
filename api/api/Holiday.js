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

const getRecipeCarousels = async (recipesPage, client) => {
    const carouselModules = findModule(recipesPage, 'pageModuleRecipeCarousel');

    const itemIds = carouselModules
        .map((carousel) => {
            return carousel.fields.carouselItems.map((i) => i.sys.id);
        })
        .reduce((accum, items) => accum.concat(items), []);

    const items = (await client.getEntries({
        'sys.id[in]': String(itemIds)
    })).items;
    const carouselItems = items.reduce((accum, item) => {
        accum[item.sys.id] = item;

        return accum;
    }, {});

    return carouselModules.map((carousel) => {
        return {
            title: carousel.fields.title,
            items: carousel.fields.carouselItems.map((ci) => {
                const item = carouselItems[ci.sys.id];
                return {
                    title: item.fields.title,
                    subtitle: item.fields.subtitle,
                    image: {
                        title: item.fields.image.fields.title,
                        description: item.fields.image.fields.description,
                        url: item.fields.image.fields.file.url
                    }
                };
            })
        };
    });
};

const getCarouselsHTML = async(recepies,client) => {
    const carousels = findModule(recepies, 'pageModuleHtml');

    return carousels.map(function(carousel){
        return {
            title : carousel.fields.title,
            html : carousel.fields.html
        }
    });
}

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
        const carousels = await getRecipeCarousels(recipesPage, client);

        res.send({ carousels });
    });

    api.get('/holidays/html',async (req,res) =>{
        const client = req.client;
        const recepies = await getPageWithName(client, 'Recipies');
        const carouselhtml = await getCarouselsHTML(recepies, client);
        res.send({carouselhtml});
    });
};
