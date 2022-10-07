import {faker} from '@faker-js/faker';
import {institutions} from './institution.js'

function generateConsentStatusData(){

   
    const consentStatusData = [];
    institutions.forEach(institution => {
        consentStatusData.push({
            institution: institution,
            consentInformation: {
                active: faker.random.numeric(3),
                rejected: faker.random.numeric(2),
                expired: faker.random.numeric(2),
                revoked: faker.random.numeric(2),
                paused: faker.random.numeric(2),
            }
        })
    });
    return consentStatusData;

}

export const consentStatusData = generateConsentStatusData(); 


function generateConsentInfomation(){

    const data = [];

    institutions.forEach(institution => {
        data.push({
            institution,
            consents: []
        })
    });

    for (let index = 0; index < data.length; index++) {
        
        const item = data[index];
        const y = faker.random.numeric(3);
        for (let index = 0; index < y; index++) {
           
            const consent = {
                consentId: faker.random.alphaNumeric(9),
                subscriberName: faker.name.firstName() + " " + faker.name.lastName(),
                createdDate: faker.date.past(1),
                startDate: faker.date.between('2022-01-01T00:00:00.000Z', new Date()),
                endDate: faker.date.future(1),
                dataFetchCount: faker.helpers.arrayElement([0,1,2,3,4,5]),
                status: faker.helpers.arrayElement(["Active", "Paused", "Revoked", "Expired"]),
                purpose: faker.helpers.arrayElement(["Wealth management service", "Customer spending patterns, budget or other reportings", "Aggregated statement", "Explicit consent for monitoring of the accounts", "Explicit one-time consent for the accounts"]),
                consentUse: {
                    count: faker.helpers.arrayElement([0,1,2,3,4,5]),
            
                },
                fiType: faker.helpers.arrayElements(["DEPOSIT", "TERM_DEPOSIT", "RECURRING_DEPOSIT", "GOVT_SECURITIES", "EQUITIES", "BONDS", "DEBENTURES", "MUTUAL_FUNDS"], 2)
            }

            if(consent.consentUse.count > 0){
                consent.consentUse.lastUseDateTime = faker.date.between('2022-05-01T00:00:00.000Z', '2022-07-01T00:00:00.000Z');
            }

            item.consents.push(consent);
            
        }
        
        
    }
    return data;
}

export const consentInfoData = generateConsentInfomation();