/*
This snippet takes all Objects from the "linkedFields", checks for duplicates and pastes the unique objects in the target Field.
(For extension scripts)
*/

// Config
let linkedFields = ["Field 1", "Field 2", "Field 3"];
let targetField = "Unique Object Field";
// Config End

let tableId = cursor.activeTableId;
let table = base.getTable(tableId);
let record = await input.recordAsync("Pick a record", table);

var fieldObjects = [];

for (const linkedField of linkedFields) {
  let values = await record.getCellValue(linkedField);
  if(values){
    fieldObjects = fieldObjects.concat(values);
  }
}

fieldObjects = fieldObjects.reduce((uniqueArray, obj) => {
    if(uniqueArray.findIndex(item => item.id === obj.id) === -1){
        uniqueArray.push(obj);
    }
    return uniqueArray;
}, []);

console.log(fieldObjects);

await table.updateRecordAsync(record.id, {
    [targetField]: fieldObjects
})