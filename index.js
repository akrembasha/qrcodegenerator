/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';


inquirer
  .prompt([{
    message: "Type in your URL", 
    name:"URL"}
  ])
  .then((answers) => {
    // ouput answer in console
    console.log(answers)
    // capture user response
    const url = answers.URL
    // pass response to image generator function
    var qr_png = qr.image(url);
    //create png file with qr code
    qr_png.pipe(fs.createWriteStream('qr_image.png'));
    console.log("Your QR code has been generated and saved!")
    //create a txt file to save the user input using the native fs node module.
    fs.writeFile('URL.txt', url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
        console.log("Please enter a proper URL.")
    } else {
        console.log(error)
    }
  });