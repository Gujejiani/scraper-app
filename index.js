const express = require('express');
const app = express();
const axios = require('axios');
const puppeteer = require('puppeteer');
app.get('/', async (req, res) => {

    axios.get('https://psp.ge/product/list?page=1&currentPage=1&search=%E1%83%90%E1%83%9C%E1%83%90%E1%83%9A%E1%83%92%E1%83%98%E1%83%9C%E1%83%98&query=%E1%83%90%E1%83%9C%E1%83%90%E1%83%9A%E1%83%92%E1%83%98%E1%83%9C%E1%83%98&filters=%7B%7D').then(res=>{
        console.log(res.data.data.items)
    })
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://2nabiji.ge/ge/category/zethi-da-dzmari');

    await page.waitForSelector('.ProductCard_container__1jtJF');

    const products = await page.evaluate(() => {
        // Select all product elements
        const productElements = document.querySelectorAll('.ProductCard_container__1jtJF');
    
        // Extract the necessary details from each product element
        const productDetails = Array.from(productElements).map(product => {
            const nameElement = product.querySelector('span[title]');
            const priceElement = product.querySelector('.ProductCard_productInfo__price__2Ys9W span'); // Selecting the span inside the price div

          return {
            name: nameElement ? nameElement.getAttribute('title') : "can't get name",  // Extract the title attribute
            price: priceElement ? priceElement.innerText.trim() : null,  // Extract the inner text of the span
            // Add more fields as needed
          };
        });
    
        return productDetails;
      });




   
    //   console.log(products)
    res.send(products);
    
});



module.exports = app;