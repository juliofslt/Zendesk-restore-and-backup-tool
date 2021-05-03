/* 
This function retrieves the data of triggers, automations and macros from Zendesk.

To get the data properly, please call the function "WRITEDATA()".
*/

// Initial values to build the HTTP Request
function GETBACKUP(token){
  // You can run once the script with the line below uncommented to set your loggin info as a document property, and then delete
  // the line for security reasons. For more information, visit the following link
  // https://developer.zendesk.com/rest_api/docs/support/introduction#basic-authentication
  // https://www.base64encode.org/

  // PropertiesService.getDocumentProperties().setProperty('encodedInfo', 'Here_your_Base64_encoded_login_info')
  const encodedAuthInfo = PropertiesService.getDocumentProperties().getProperty('encodedInfo')
  const data = []
  const url = `https://remotasks.zendesk.com/api/v2/${token}.json`
  const options = {
    headers: { 'Authorization': `Basic ${encodedAuthInfo}` }
  }
  
    // GET Requests
    const response = JSON.parse(UrlFetchApp.fetch(url, options))
  
    // Transform to strings the JSONs
    for (let i of response[token]){
      data.push([JSON.stringify(i)])
    }
  
    // The returned value is a 2D Array
    return data
  
  }
  
  function WRITEDATA(){
  
    let tokens = ['triggers','automations','macros']
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
  