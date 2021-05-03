## Triggers, automations and macros backup and restore tool

To use this tool, create a new spreadsheet in Google Docs. In the navigation menu, open "Tools", and click on "Script Editor".

Once you open the script editor, you need to have two files; Paste the code of the "backup_script.gs" and the code from "restore_backup.gs" in the another file and save.

### Initial Setup

In each file, within the first lines, you'll find a line of code commented in which you'll have to configure your login info the first time you run the script (uncomment it and replace the "Here_your_Base64_encoded_login_info" with your encoded login credential). There's a functionality in the Spreadsheets of Google in which you can configure an _user property_, _script property_ or _document property_, which will allow you to save your API credentials for the basic authorization without having them exposed all the time.

> [Google Apps Script Properties Service](https://developers.google.com/apps-script/guides/properties)

Once you run the script the first time, you can remove the line in which you're saving the credentials as a document property.

### Backup

To create a backup:

- Create a new tab, rename it with the date of the backup and keep that new tab open.

- In the navigation menu, open "Tools" and open "Script editor".

- Select the "backup_script.gs", and in the tools menu, select the "WRITEDATA" function.

![](https://drive.google.com/file/d/1fGZOQ1xHu_1F-An32_7sXGM99dGNn5T1/view?usp=sharing)

4- Run the script.

---

#### Note

I recommend creating a new tab per backup, and rename it with the current date you're running the backup, so you can keep track better of when did you do it.

---

### Restore

To restore the items previously backed up:

- In the spreadsheet, use the custom "excel" function "=RESTORE()"

- Once you write the function, pass as a parameter in the function the item that you want to restore (selecting one cell).

![](https://drive.google.com/file/d/1OcntDPmP_7Oa9XVolruJtjvBoctd1JcS/view?usp=sharing)

- If everything goes well, you'll get a "Success!" message

- Once you see the "success" message, you can delete the cell containing the function. The restored data should appear within a couple of minutes in Zendesk.

---

#### Important note!:

This function must be used once per cell, otherwise it will throw an error.

---