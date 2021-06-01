// note: requires the sheet to be published to the web
const googleSheetsId = "1dV3qjc0BRhFZ0JXfsyvBxasx2DhSmqFX4y69bNuVgfc";

const fs = require('fs')

require("stupid-sheets")(googleSheetsId, json => {
  console.log(json);
  fs.writeFileSync('students.json', JSON.stringify(json, null, ' ') )
});