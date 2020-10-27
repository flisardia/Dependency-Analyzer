const $ = require('cheerio');
const rp = require('request-promise');
const csv = require('csv-parser');
const fs = require('fs');

fs.readFile('archivo.html', 'utf8', function (err, data) {
    const linkObjects = $('script', data);
    const total = linkObjects.length;
    const links = [];

    for (let i = 0; i < total; i++) {
        let item = linkObjects[i].attribs.src
        if (item != undefined) {
            console.log(item)
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
});