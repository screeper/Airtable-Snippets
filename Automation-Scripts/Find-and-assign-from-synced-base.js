// Check if Person already exists in crew repo.
// Config
let crewRepoTable = base.getTable('Overall Crew Repo');
let crewTable = base.getTable('Crew');
var linkedField = "Crew Repo Record";

// Get record
var record = await crewTable.selectRecordAsync(input.config().recordId);

// Get crew array...
const query = await crewRepoTable.selectRecordsAsync({fields: ["Vorname" ,"Nachname", "Email", "Birthday"]});
const crew = query.records;

// Filter if Record exists with same Vorname, Nachname und Birthday or Vorname, Email, Birthday
if(record){
  var member = crew.filter(obj => {
    let vorname = obj.getCellValue("Vorname").toLowerCase().replace(/\s+/g, '');
    let nachname = obj.getCellValue("Nachname").toLowerCase().replace(/\s+/g, '');

    if(
      (
        record.getCellValue("Vorname").toLowerCase().replace(/\s+/g, '') === vorname &&
        record.getCellValue("Nachname").toLowerCase().replace(/\s+/g, '') === nachname &&
        record.getCellValue("Geburtsdatum") == obj.getCellValue("Birthday")
      ) ||
      (
        record.getCellValue("Vorname").toLowerCase().replace(/\s+/g, '') === vorname &&
        record.getCellValue("Email") == obj['Email'] &&
        record.getCellValue("Geburtsdatum") == obj.getCellValue("Birthday")
      )
    ){
      return true;
    } else {
      return false;
    }
  });
  if(member && member.length === 1) {
    await crewTable.updateRecordAsync(record.id, {
    [linkedField]: member
    })
  }
}