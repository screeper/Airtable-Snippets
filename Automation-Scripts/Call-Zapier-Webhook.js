/*
GET containing record id to a Zapier Webhook

Input Variable "record_id" has to be set in Airtable.
*/

let zapier_url = 'https://hooks.zapier.com/hooks/catch/14607154/3o8lptl/?record_id=';
let record_id = input.config().record_id;
zapier_url = zapier_url + record_id;
let response = await fetch(zapier_url);
console.log(await response.json());