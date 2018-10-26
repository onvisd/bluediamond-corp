const getHolidayRecipies = async(client) => {
    const recepies = await client.getEntries({
        // content_type = 'page',
        // limit = 1,
        // query = 'Holidays'
    }).then(entries => {
        entries.items;
        if(entry.fields) {
            console.log(entry.fields)
          }
    })

    console.log(recepies);
    if(!entries.items || entries.items.length !== 1){
        throw new Error('Contentfull Page Not Found: Holidays');
    }

    const page = entries.items[0];

    return page;
}

const getImage = async(recepieImage) => {
    // const image = recepieImage.fields.modules.find(
    //     (m) => m.sys.content_type
    // );

    console.log('recipe image', recepieImage);
    const mainImage = "";
    return mainImage;
}

export default (api) => {
    debugger;
    api.get('/holiday/assets', async(req,res)=>{
    debugger;

        const client = req.client;
        const holidayRecepie = await getHolidayRecipies(client);
        const recepieImage = await getImage(holidayRecepie);

        res.send({
            recepieImage
        });
    });
};