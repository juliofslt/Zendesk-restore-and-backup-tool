function RESTORE(arg) {

  // POST request function
  function postRequest(login, bodyInfo, url){
    
    // URL and headers
    const options = {
      'method': "post",
      'headers': { 'Authorization': `Basic ${login}` },
      'contentType': 'application/json',
      'payload': bodyInfo
    }

    try{
      UrlFetchApp.fetch(url, options)
      return "Success!"
    }
    catch(err){
      return `Error -> ${err}`
    }
  }

  // PropertiesService.getDocumentProperties().setProperty('encodedInfo', 'Here_your_Base64_encoded_login_info')
  const login = PropertiesService.getDocumentProperties().getProperty("encodedInfo")
  const subDomain = "Your_subdomain_here"
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
  const dynamicContentRegex = /dynamic_content\/items/gi


  // Determine if POST request is going to be done to triggers or automations
  if(triggerRegex.test(cell.url)){
    const url = `https://${subDomain}.zendesk.com/api/v2/triggers.json`
    
    // Set request's body information
    const bodyInfo = JSON.stringify({
      trigger: {
        title: cell.title,
        actions: cell.actions,
        conditions: cell.conditions
      }
    })

    return postRequest(login, bodyInfo, url)
    
  }
  else if(automationRegex.test(cell.url)){
    const url = `https://${subDomain}.zendesk.com/api/v2/automations.json`
    
    // Set request's body information
    const bodyInfo = JSON.stringify({
      automation: {
        title: cell.title,
        actions: cell.actions,
        conditions: cell.conditions
      }
    })

    return postRequest(login, bodyInfo, url)

  }
  else if(macrosRegex.test(cell.url)){
    const url = `https://${subDomain}.zendesk.com/api/v2/macros.json`
    
    // Set request's body information
    const bodyInfo = JSON.stringify({
      macro: {
        title: cell.title,
        actions: cell.actions
      }
    })

    return postRequest(login, bodyInfo, url)
  }
  else if(dynamicContentRegex.test(cell.url)){
    const url = `https://${subDomain}.zendesk.com/api/v2/dynamic_content/items.json`

    const bodyInfo = JSON.stringify({
      item: {
        name: cell.name,
        default_locale_id: cell.default_locale_id,
        variants: [{
          locale_id: cell.variants[0].locale_id,
          default: cell.variants[0].default,
          content: cell.variants[0].content
        },{
          locale_id: cell.variants[1].locale_id,
          default: cell.variants[1].default,
          content: cell.variants[1].content
        }]
      }
    })

    return postRequest(login, bodyInfo, url)
  }
}
