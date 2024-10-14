const fs = require('fs');
const path = require('path');

let customFieldMappings;

//Load json data
const loadClientFieldMappings = () => {
  let jsonFile = "";
  if (!customFieldMappings) {
    if(process.env.CLIENT_DETAILS === 'D'){
      jsonFile =  path.join(__dirname, '../data/orgData_D.json');
    }else if(process.env.CLIENT_DETAILS === 'P'){
      jsonFile =  path.join(__dirname, '../data/orgData_P.json');
    }
    const data = fs.readFileSync(jsonFile, 'utf8');
    customFieldMappings = JSON.parse(data);
  }
  return customFieldMappings;
};

const getCustomFieldMappings = () => customFieldMappings;

/**
 * Validate if the clientcode exist in the json data
 */
const validateClientCode = (clientCode) => {
    if (!customFieldMappings) {
      loadClientFieldMappings();
    }
    if(process.env.CHANGE_DOMAIN){
      const o = JSON.parse(process.env.CHANGE_DOMAIN);
      if(o && o[clientCode])
        clientCode = o[clientCode];
    }
    const clientMapping = customFieldMappings.clients.find(client => client.code === clientCode);
    return clientMapping;
};
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
  validateClientCode,
  getCustomFieldMappings
};
