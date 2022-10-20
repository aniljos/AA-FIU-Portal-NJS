import { ConsentInfo } from "../consent";
import axios from 'axios';


export async function getConsentInfo(): Promise<Array<ConsentInfo>> {

    try {

        const url = "http://localhost:9001/consents";
        const results = await axios.get<Array<ConsentInfo>>(url);
        return results.data

    }
    catch (error) {

        throw error
    }
}