

const $ = require('cheerio');
const rp = require('request-promise');
const csv = require('csv-parser');
const fs = require('fs');
require('dotenv').config()


function readFrommLocalFileSystem(url) {
    console.log(url.split('/')[0].toUpperCase())

    fs.readFile(url, 'utf8', function (err, data) {
        const linkObjects = $('script', data);
        const total = linkObjects.length;
        const links = [];
        var counts = {};

        for (let i = 0; i < total; i++) {
            let item = linkObjects[i].attribs.src
            if (item != undefined) {
                if (item.endsWith(".js")) {
                    links.push(
                        item.substring(
                            item.lastIndexOf('/') + 1,
                            item.lastIndexOf('.js') + 3)
                    );
                }
            }

        }
        console.log("2.1- Dependencies")
        console.log(links.filter((el, index) => links.indexOf(el) === index))

        for (item of links) {
            let num = item
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        console.log("2.2 - Frequency")
        console.log(counts)
    });
};

function readFromWeb(url) {
    rp(url.toString()).then(html => {
        console.log(url.toString());
        const webObject = $('script', html);
        const total = webObject.length;
        const webs = [];
        const links = [];
        var counts = {};

        for (let i = 0; i < total; i++) {
            let item = webObject[i].attribs.src
            if (item != undefined) {
                if (item.endsWith(".js")) {
                    links.push(item.substring(
                        item.lastIndexOf('/') + 1,
                        item.lastIndexOf('.js') + 3)
                    );
                }
            }
        }
        console.log("2.1- Dependencies")
        console.log(links.filter((el, index) => links.indexOf(el) === index))

        for (item of links) {
            let num = item
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        console.log("2.2 - Frequency")
        console.log(counts)
    })
        .catch(err => {
            console.log(err);
        })
}

function main() {

    fs.createReadStream(process.env.WEBSITES)
        .pipe(csv())
        .on('data', (row) => {
            let _row = row.webs.toString()
            if (_row.indexOf('https') != -1 || _row.indexOf('http') != -1) {
                // console.log(_row.split('/')[0].toUpperCase())
                readFromWeb(row.webs.toString())
            } else {
                readFrommLocalFileSystem(_row)
            }
        })
        .on('end', () => {
            // console.log('CSV file successfully processed');
        });
}

main();




