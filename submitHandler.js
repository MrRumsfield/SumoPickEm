const fs = require('fs');
const path = require('path');

function getTomorrowDateString() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

function savePicks(picksArray) {
  const filePath = path.join(__dirname, 'picks.json');
  const tomorrowDate = getTomorrowDateString();

  let picksData = {};

  // Read existing picks.json
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    try {
      picksData = JSON.parse(rawData);
    } catch (err) {
      console.error('Error parsing picks.json:', err);
      return;
    }
  }

  // Ensure the date array exists
  if (!picksData[tomorrowDate]) {
    picksData[tomorrowDate] = [];
  }

  // Append the new picks set
  picksData[tomorrowDate].push(picksArray.map(p => ({ pick: p })));

  // Write back to picks.json
  try {
    fs.writeFileSync(filePath, JSON.stringify(picksData, null, 2));
    console.log(`Picks appended for ${tomorrowDate}`);
  } catch (err) {
    console.error('Error writing to picks.json:', err);
  }
}

module.exports = { savePicks };
