function RESTORE(arg) {
  // You can run once the script with the line below uncommented to set your loggin info as a document property, and then delete
  // the line for security reasons. For more information, visit the following link
  // https://developer.zendesk.com/rest_api/docs/support/introduction#basic-authentication
  // https://www.base64encode.org/

    // PropertiesService.getDocumentProperties().setProperty('encodedInfo', 'Here_your_Base64_encoded_login_info')
    const login = PropertiesService.getDocumentProperties().getProperty("encodedInfo")
    var cell
  
    try{
      cell = JSON.parse(arg)
    }
    catch(err){
      return "Error parsing cell"
    }
    
    const triggerRegex = /triggers/gi
    const automationRegex = /automations/gi
    const macrosRegex = /macros/gi
  
  
    // Determine if POST request is going to be done to triggers or automations
    if(triggerRegex.test(cell.url)){
      const url = 'https://remotasks.zendesk.com/api/v2/triggers.json'
      
      // Set request's body information
      const bodyInfo = JSON.stringify({
        trigger: {
          title: cell.title,
          actions: cell.actions,
          conditions: cell.conditions
        }
      })
  
      // URL and headers
      const options = {
        'method': "post",
        'headers': { 'Authorization': `Basic ${login}` },
        'contentType': 'application/json',
        'payload': bodyInfo
      }
  
      try{
        UrlFetchApp.fetch(url, options)
      }
      catch(err){
        return `Error -> ${err}`
      }
    }
    else if(automationRegex.test(cell.url)){
      const url = 'https://remotasks.zendesk.com/api/v2/automations.json'
      
      // Set request's body information
      const bodyInfo = JSON.stringify({
        automation: {
          title: cell.title,
          actions: cell.actions,
          conditions: cell.conditions
        }
      })
  
      // URL and headers
      const options = {
        'method': "post",
        'headers': { 'Authorization': `Basic ${login}` },
        'contentType': 'application/json',
        'payload': bodyInfo
      }
  
      try{
        UrlFetchApp.fetch(url, options)
      }
      catch(err){
        return `Error -> ${err}`
      }
    }
    else if(macrosRegex.test(cell.url)){
      const url = 'https://remotasks.zendesk.com/api/v2/macros.json'
      
      // Set request's body information
      const bodyInfo = JSON.stringify({
        macro: {
          title: cell.title,
          actions: cell.actions
        }
      })
  
      // URL and headers
      const options = {
        'method': "post",
        'headers': { 'Authorization': `Basic ${login}` },
        'contentType': 'application/json',
        'payload': bodyInfo
      }
  
      try{
        UrlFetchApp.fetch(url, options)
      }
      catch(err){
        return `Error -> ${err}`
      }
    }
  
    return "Success!"
  }
  