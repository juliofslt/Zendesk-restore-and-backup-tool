## Backup and Restore Tool for Triggers, Automations, Macros & Dynamic Content

### Initial Setup
- To use this tool:
  - Create a new spreadsheet in Google Sheets. Once in the spreadsheet, open "Tools" in the naviagtion menu, and click on "Script Editor".
  - Once you open the script editor, rename the "Code.gs" with "backup_script" and add a new "script" with the name "restore_backup".  Copy the code from GitHub from the respective files to the files of the same name in the editor. 
  - Remember to save!
- In each file:
  - Within the first lines, you'll find a line of code commented out (containing "Here_your_Base64_encoded_login_info") in which you'll have to configure your login info the first time you run the script (uncomment it and replace the "Here_your_Base64_encoded_login_info" with your encoded login credential). There's a functionality in the Spreadsheets of Google in which you can configure an _user property_, _script property_ or _document property_, which will allow you to save your API credentials for the basic authorization without having them exposed all the time.
    - To encode your credentials, you can use something like [Online Base64 Encoder](https://www.base64encode.org/) 
      - Here you need to enter the username followed by a full colon ":" and then your password.
        - Example Input: myemail@yahoo.com:password1
        - Encoded Example: bXllbWFpbEB5YWhvby5jb206cGFzc3dvcmQx
      - In most cases, it is better to use an API token, these are created by Zendesk in the Admin menu.
        - If you plan on using one of these then the syntax is slightly different in that you need to add "/token" after the username.
        - Example Input: myemail@yahoo.com/token:reallylongapitokengoeshere
        - Encoded Example: bXllbWFpbEB5YWhvby5jb20vdG9rZW46cmVhbGx5bG9uZ2FwaXRva2VuZ29lc2hlcmU=
    - > [Google Apps Script Properties Service](https://developers.google.com/apps-script/guides/properties)
  - Replace any instance of "Your_subdomain_here" with your Zendesk subdomain
    - Example: https://Your_subdomain_here.zendesk.com/api/v2/triggers.json 

---

#### Note:

Once you run the script the first time, you can remove the line in which you're saving the credentials as a document property.
- The first time running the code it may error out, if it does simply try it again and it should work.

---

### Backup

To create a backup:

- Create a new tab, rename it with the date of the backup and keep that new tab open.

- In the navigation menu, open "Tools" and open "Macros" and select the "WRITEDATA" function.

  - If you do not see "WRITEDATA", select "import" and add the function.

---

#### Note:

I recommend creating a new tab per backup, and naming it with the current date you're running the backup, to better keep track of when the backup was completed.

---

### Restore

---

#### Disclaimer!

This **will not edit your existing macro/trigger/automation**. Instead, will create a new one in Zendesk. This is intended to create new ones out of your backup in case any of your macros/triggers/automations get deleted from Zendesk.

---

To restore the items previously backed up:

- In the spreadsheet, use the custom "excel" function "=RESTORE()"

- Write the function in a blank cell, once you write the function, pass as a parameter in the function the cell name you want to restore (selecting one cell only).

  - This function must be used once per cell, otherwise it will throw an error.

![Screen Shot 2021-05-03 at 13 35 50](https://user-images.githubusercontent.com/51498514/116881170-36505800-ac23-11eb-84d8-5a63822185da.png)

- Press "Enter"

- If everything goes well, you'll get a "Success!" message

- Once you see the "success" message, you can delete the cell containing the function. The restored data should appear within a couple of minutes in Zendesk.

---

#### Important note!:

This function must be used once per cell, otherwise it will throw an error.

---
