import {faker} from '@faker-js/faker';
import {institutions} from './institution.js'

export function generateLogs(){

    const logs = [];
    institutions.forEach(institution => {

        const y = faker.random.numeric(3);
        for (let index = 0; index < y; index++) {
            logs.push({

                institutionId: institution.id,
                institutionName: institution.name,
                date: faker.date.future(1),
                level: faker.helpers.arrayElement(["Debug", "Info", "Warning", "Error"]),
                source: faker.random.words(Math.floor(Math.random() * (10 - 6)) + 6),
                message: faker.random.words(Math.floor(Math.random() * (15 - 4)) + 4)

            })
    }
    });
    return logs;

}