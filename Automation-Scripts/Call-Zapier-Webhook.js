/*
GET containing record id to a Zapier Webhook

Input Variable "record_id" has to be set in Airtable.
*/

// Config
let zapier_url = 'https://hook-url';
// Config End


let record_id = input.config().record_id;
zapier_url = zapier_url + '?record_id=' + record_id;
let response = await fetch(zapier_url);
console.log(await response.json());