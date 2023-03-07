// Config
let mainTableName ="Crew";
let stringField = "Einsatzjahre";
let linkedTableName = "Festivals";
let connectingTableName = "Assignments";
let connectingLinkedField = "Festival";
let connectingRecordField = "Crewmember";
// Config End

let table = base.getTable(mainTableName);
let linkedTable = base.getTable(linkedTableName);
let connectingTable = base.getTable(connectingTableName);

// get all the records in the crew table
const query = await table.selectRecordsAsync({fields: ["ID" ,"Einsatzjahre"]});
const records = query.records;

// get all linked Values (Festivals)
const queryLinked = await linkedTable.selectRecordsAsync({fields: ["Name"]});
const festivals = queryLinked.records;

console.log(festivals)

// loop over the records and log their IDs
for (const record of records) {
  let logmsg = "Crew ID: ";
  logmsg = logmsg.concat(record.id, ", ID: ", record.getCellValueAsString("ID"));

  const values = record.getCellValue(stringField);

  if (values) {
    //const array = values.split(', ');
    const array = JSON.parse(values.replace(/'/g, '"'))
    for (const value of array) {
      
      const festival = festivals.filter(obj => obj.name === value);

      if (festival.length > 0) {
        const linkedRecordId = festival[0].id;

        //Add check if already exists

        await connectingTable.createRecordAsync({
          [connectingLinkedField]: [{id: linkedRecordId}],
          [connectingRecordField]: [{id: record.id}],
        });

        logmsg = logmsg.concat(", Link: ", festival[0].getCellValue("Name"));
      }
    }

    console.log(logmsg);
  }
}