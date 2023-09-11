const puppeteer = require("puppeteer");
const j2cp = require("json2csv").Parser;
const fs = require("fs");

const url =
  "https://www.flipkart.com/osjs-soft-toys-lover-teddy-bear-pink-colors-size-3-feet-very-90-2-cm/product-reviews/itm97fb71d38d14c?pid=STFG7G8YN2JFY5ZF&lid=LSTSTFG7G8YN2JFY5ZFJJJWIB&marketplace=FLIPKART";
const pageCount = 10;
const fileName = "file";

(async function () {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 0, height: 0 });

  let data = [];
  let objId = 0;
  for (let i = 1; i <= pageCount; i++) {
    await page.goto(url + "&page=" + i);
    const pageData = await page.evaluate((objId) => {
      const reviewObj = [];
      const reviews = document.getElementsByClassName("col _2wzgFH K0kLPL");

      if (reviews.length > 0) {
        for (let j = 0; j < reviews.length; j++) {
          reviewObj.push({
            id: objId,
            rating:
              reviews[j].getElementsByClassName("_3LWZlK _1BLPMq")[0].innerText,
            review: reviews[j].getElementsByClassName("_2-N8zT")[0].innerText,
            comment: reviews[j].getElementsByClassName("t-ZTKy")[0].innerText,
          });
          objId++;
        }
      }

      return reviewObj;
    }, objId);

    objId += pageData.length;
    data = data.concat(pageData);
  }

  const parser = new j2cp();
  const csv = parser.parse(data);
  fs.writeFileSync("./Scrapped-Files/" + fileName + ".csv", csv);

  browser.close();
})();
