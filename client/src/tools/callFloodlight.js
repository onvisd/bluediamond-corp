const embedFrame = (tagUrl) => {
    let flDiv = document.getElementById('DCLK_FLDiv');
    if(!flDiv) {
        flDiv = document.body.appendChild(document.createElement('div'));
        flDiv.id = 'DCLK_FLDiv';
        flDiv.style.display = 'none';
    }

    const flIframe = document.createElement('iframe');
    flIframe.id = `DCLK_FLIframe_${Math.floor(Math.random() * 999999)}`;
    flIframe.src = tagUrl;
    flDiv.appendChild(flIframe);
};

const click = (src, type, cat) => {
    if(process.env.NODE_ENV === 'development')
        console.log(`[floodlight] running click tag for ${JSON.stringify({src, type, cat})}`);

    embedFrame(
        `https://fls.doubleclick.net/activityi;src=${src};type=${type};` +
        `cat=${cat};ord=1;num=${Math.floor(Math.random() * 999999)}?`
    );
};

const load = (src, type, cat, other) => {
    if(process.env.NODE_ENV === 'development') {
        console.log(
            `[floodlight] running load tag for ${JSON.stringify({src, type, cat, other})}`
        );
    }

    let vars = '';
    if(other)
        vars = Object.keys(other).map((key) => `${key}=${other[key]}`).join(';');
    else
        other = {};
    vars += ';';

    embedFrame(
        `https://${src}.fls.doubleclick.net/activityi;src=${src};type=${type};` +
        `cat=${cat}${vars}dc_lat=;dc_rdid=;tag_for_child_directed_treatment=` +
        `${(other.ord ? '' : `;ord=${Math.floor(Math.random() * 999999)}`)}?`
    );
};

export default {click, load};
