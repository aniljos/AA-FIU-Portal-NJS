import {faker} from '@faker-js/faker';

export let settings = {
    jwsRequired: true,
    allowedHosts: faker.internet.url() + ", " + faker.internet.url() + "," + faker.internet.url(),
    subscriberSuffix: faker.random.word(),
    dateFormat: faker.helpers.arrayElement(["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd"]),
    databaseName: faker.random.word(8),
    currentAPIVersion : faker.helpers.arrayElement(["1.0", "1.1", "1.2"]),
    baseApplicationPath : "/" + faker.random.word(6),
    certificateFilePath : faker.system.directoryPath(),
    certificateFileName : faker.random.alphaNumeric(15),
    certificateFileNamePK : faker.random.alphaNumeric(15),
    certificateFileNamePassPhrase : faker.random.alphaNumeric(15),
    licenceKey: faker.random.alphaNumeric(25),
    licenceExpiry: faker.date.future(1),
    licenceTo: faker.random.word(6),
    assessmentType: "",
    sahamatiCantralRegistryKey: faker.random.alphaNumeric(25)
}

export function updateSetting(data){
    settings = data;
}