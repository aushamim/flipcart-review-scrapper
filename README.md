## Flipcart product review scrapper

### How to use

1. Clone this repository.
2. Open terminal in the cloned folder and run `npm install`
3. Change these 3 lines in the code.

```js
const url = "Your_URL_Here";
const pageCount = Total_Review_Page_Count;
const fileName = "Outout_File_Name";
```

- Change these in the above code
  - Give your product's review page url in **url** variable. It must not contain **&page=1**
  - Give your product's total page count in **pageCount** variable
  - Give output file name in **fileName** variable

4. Then run `npm run scrap`
