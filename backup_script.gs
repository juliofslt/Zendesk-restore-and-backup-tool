/* 
This function retrieves the data of triggers, automations and macros from Zendesk.

To get the data properly, please call the function "WRITEDATA()".
*/

// Initial values to build the HTTP Request
function GETBACKUP(token){

// Function to convert JSON objects to strings
  function jsonToString(response, token){
    const data = []

    // Transform from JSON to strings
  for (let i of response[token]){
    data.push([JSON.stringify(i)])
  }

  // The returned value is a 2D Array
  return data
  }

  // PropertiesService.getDocumentProperties().setProperty('encodedInfo', 'Here_your_Base64_encoded_login_info')
  const encodedAuthInfo = PropertiesService.getDocumentProperties().getProperty('encodedInfo')
  const subDomain = "Your_subdomain_here"
  const url = `https://${subDomain}.zendesk.com/api/v2/${token}.json`
  const options = {
    headers: { 'Authorization': `Basic ${encodedAuthInfo}` }
  }

  // GET Requests
  if(token === "items"){
    const response = JSON.parse(UrlFetchApp.fetch(`https://${subDomain}.zendesk.com/api/v2/dynamic_content/${token}.json`, options))

    const data = jsonToString(response, token)

    return data
  }
  else{
    const response = JSON.parse(UrlFetchApp.fetch(url, options))

    const data = jsonToString(response, token)

    return data
  }
}

function WRITEDATA(){

  let tokens = ['triggers','automations','macros', 'items']
  let sheetName= SpreadsheetApp.getActiveSpreadsheet().getSheetName()

  // Notes
  // ".getRange()" takes 3 integers as parameter
  // ".setValues()" takes as a parameter a 2D array

  // Fetch information from Zendesk and write data in the sheet
  for(let i of tokens){
    let values = GETBACKUP(i)
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).getRange(3, tokens.indexOf(i)+1, values.length).setValues(values)
  }

}

