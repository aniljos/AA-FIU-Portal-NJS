import {institutions} from './institution.js'
import {faker} from '@faker-js/faker';

 export function generateDataFetch(){

    const data = [];

    institutions.forEach(institution => {
        data.push({
            institution,
            datafetchs: []
        })
    });

    for (let index = 0; index < data.length; index++) {

        const item = data[index];
        const y = faker.random.numeric(2);

        for (let index = 0; index < y; index++) {

            const dataFetch = {

                consentId: faker.random.alphaNumeric(9),
                subscriberName: faker.name.firstName() + " " + faker.name.lastName(),
                startDate:  faker.date.between('2022-01-01T00:00:00.000Z', new Date()),
                endDate: faker.date.future(1),
                requestDate: faker.date.past(1),
                status: faker.helpers.arrayElement(["Success", "Failed"])
            }

            item.datafetchs.push(dataFetch);
        }
    }

    return data;
}

export const dataFetchInfo = generateDataFetch();