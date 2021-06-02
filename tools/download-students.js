// note: requires the sheet to be published to the web
const googleSheetsId = "1dV3qjc0BRhFZ0JXfsyvBxasx2DhSmqFX4y69bNuVgfc";

const fs = require('fs')


// order alphabetically, by firstname:
const sortByKey = (array, key) => {
  return array.sort((a, b) => {
      let x = a[key]; let y = b[key];
      if (typeof x == "string") x = (""+x).toLowerCase(); 
      if (typeof y == "string") y = (""+y).toLowerCase();
        
      // console.log(x,y, ((x < y) ? -1 : ((x > y) ? 1 : 0)) );
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}


require("stupid-sheets")(googleSheetsId, json => {
  // console.log(json);
  
  // make all themes lower-case and replace spaces
  json = json.map( s => {
    let t = s.theme.toLowerCase().replace(/ /g, '-')
    return {...s, theme:t}
  })
  
  // order alphabetically, by firstname:
  json = sortByKey(json, 'firstname')
  
  console.log(json);

  fs.writeFileSync('students.json', JSON.stringify(json, null, ' ') )
});