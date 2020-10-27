const $ = require('cheerio');
const rp = require('request-promise');

const url = 'https://www.lanacion.com.ar';
// I use Wikipedia for the exmaple but you can use other sites you like

rp(url).then(html => {
    const linkObjects = $('script', html);
    // this is a mass object, not an array

    const total = linkObjects.length;
    // The linkObjects has a property named "lenght"

    const links = [];
    // we only need the "href" and "title" of each link

    // for(let i = 0; i < total; i++){
    //     links.push({
    //         href: linkObjects[i].attribs.href,
    //         title: linkObjects[i].attribs.title,
    //         src: linkObjects[i].attribs.src

    //     });
    // }

    for (let i = 0; i < total; i++) {
        let item = linkObjects[i].attribs.src
        if (item != undefined) {
            // console.log(item)
            if (item.endsWith(".js")) {
                links.push({
                    src: item.substring(
                        item.lastIndexOf('/') + 1,
                        item.lastIndexOf('.js') + 3)
                });
            }
        }

    }

    console.log(links);
    // do something else here with links
})
    .catch(err => {
        console.log(err);
    })