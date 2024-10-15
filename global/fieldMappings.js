const fs = require('fs');
const path = require('path');

let customFieldMappings;

//Load json data
const loadClientFieldMappings = () => {
  let jsonFile = "";
  if (!customFieldMappings) {
    jsonFile =  path.join(__dirname, '../data/orgData_D.json');
    const data = fs.readFileSync(jsonFile, 'utf8');
    customFieldMappings = JSON.parse(data);
  }
  return customFieldMappings;
};

const getCustomFieldMappings = () => customFieldMappings;

const loginClient = (username, password) => {
  if (!customFieldMappings) {
    loadClientFieldMappings();
  }
  const clientMapping = customFieldMappings.clients.find(client => client.un === username && client.pwd === password);
    return clientMapping;
}
  
module.exports = {
  loginClient,
  loadClientFieldMappings,
  getCustomFieldMappings
};
