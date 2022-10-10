import axios from "axios";


const defaultUrl = "http://localhost:9001/";


export async function postServiceMethod(url, body) {

    try {

        const result = await axios.post(defaultUrl + url, body);
        return result.data

    } catch (error) {

        console.log(error, 'error')
        throw error
    }
}


export async function getServiceMethod(url) {

    try {

        const result = await axios.get(defaultUrl + url);
        return result.data

    } catch (error) {

        console.log(error, 'error')
        throw error
    }
}

export async function putServiceMethod(url, body) {

    try {

        const result = await axios.put(defaultUrl + url, body);
        return result.data

    } catch (error) {

        console.log(error, 'error')
        throw error
    }
}