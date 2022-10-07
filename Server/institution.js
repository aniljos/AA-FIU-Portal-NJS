import {faker} from '@faker-js/faker';


export const institutions= 
[{id: 1, name: "Infovault"}, {id: 2, name: "FinVu"}, {id: 3, name: "CAMSFinServ"}, {id: 4, name: "Onemoney"}, {id: 5, name: "CAMS"} ];


function generateInstitutions(){
    const data = [];

    institutions.forEach(institution => {
        
        data.push({

            institution,
            instituionType : faker.helpers.arrayElement(["FIP", "FIU", "AA"]),
            institutionName : faker.company.companyName(),
            authorizedPerson : faker.name.firstName() + " " + faker.name.lastName() ,
            mobileNo: faker.phone.number(),
            address: faker.address.buildingNumber() + " " + faker.address.cityName(),
            serverURL: faker.internet.url(),
            serverIPAddress: faker.internet.ipv4(),
            authorityDocumentName: faker.helpers.arrayElement(["GST", "Company Registration", "Sales Tax"]),
            authorityDocumentPath: faker.random.word(),
            authorisationValidTill : faker.date.future(),
            identifiers: [
                {
                    category: faker.helpers.arrayElement(["STRONG", "WEAK", "ANCILLARY"]),
                    type: faker.helpers.arrayElement(["MOBILE", "AADHAR", "EMAIL", "PAN", "DOB", "ACCNO", "CRN", "PPAN"]),
                    value: faker.random.alphaNumeric(10).toUpperCase()
                }
            ]

        })     

    });
    
    return data;
}

export const institutionDetails = generateInstitutions();


export function updateInstitution(institution){

    const index = institutions.findIndex(item => item.id === institution.institution.id);
    if(index !== -1){
        institutions[index]  = institution;
        return true;
    }
    else{
        return false;
    }

}

export function addInstitution(institution){

    if(institution.instituionType && institution.institutionName && institution.serverURL && institution.serverIPAddress && institution.authorizedPerson ){
        const index = institutions.findIndex(item => item.name === institution.institution.name);
        if(index === -1){
            institution.institution.id = faker.random.numeric(5);
            institutions.push(institution);
            return 0;
        }
        else{
            return 1;
        }
    }
    else{
        return 2;
    }

    

}