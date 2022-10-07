import express from 'express';
//import { faker } from '@faker-js/faker';
import bodyParser from 'body-parser';
import * as settings from './settings.js';
import { addInstitution, institutionDetails, updateInstitution } from './institution.js';
import { consentStatusData, consentInfoData } from './consents.js';
import { dataFetchInfo } from './data-fetch.js';

import cors from 'cors';
import { generateLogs } from './logs.js';
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get("/", (req, resp) => {

    resp.status(200);
    resp.json({ status: "running" });
})

app.get("/settings", (req, resp) => {

    resp.json(settings.settings);
})

app.post("/settings", (req, resp) => {

    const data = req.body;
    console.log("setting", req.body);
    settings.updateSetting(data);
    resp.status(200);
    resp.json({ status: "completed" });
})

app.get("/institutions", (req, resp) => {

    resp.status(200);
    resp.json(institutionDetails);
})

app.put("/institutions", (req, resp) => {

    const institution = req.body;
    const isUpdated = updateInstitution(institution);
    if (isUpdated) {
        resp.status(200);
        resp.json(institution);
    }
    else {
        resp.status(400);
        resp.json({ status: "NotUpdated" });
    }

})

app.post("/institutions", (req, resp) => {

    const institution = req.body;
    const isUpdated = addInstitution(institution);
    if (isUpdated === 0) {
        resp.status(200);
        resp.json(institution);
    }
    else {
        resp.status(400);
        resp.json({ status: "NotUpdated" });
    }

})

app.get("/consent-status", (req, resp) => {

    resp.status(200);
    resp.json(consentStatusData);
})

app.get("/consents", (req, resp) => {

    resp.status(200);
    resp.json(consentInfoData);
})

app.get("/dataFetch", (req, resp) => {

    resp.status(200);
    resp.json(dataFetchInfo);
})

app.get("/logs", (req, resp) => {

    const logs = generateLogs();
    resp.status(200);
    resp.json(logs);
})

const portNo = 9001;
app.listen(portNo, () => {
    console.log(`Started App at Port No ${portNo}`)
})


