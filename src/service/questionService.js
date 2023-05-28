import axios from 'axios'
import createApiClient from "./apiService";
const api = createApiClient('https://chatbotabc-l3ed-master-oteukwknoa-wm.a.run.app/');

const getAllQuestion = async() => {
    return (await api.get('api/question')).data;
}
const getQuestion = async(history_id) => {
    return (await api.get('api/question/history_id='+history_id)).data;
}

const createQuestion = async (data) => {
    return (await api.post('api/question',data)).data
}

const updateQuestion = async (questionID, data) => {
    return (await api.put('api/question/'+questionID, data)).data;
}
const updateLike = async (questionID, data) => {
    return (await api.put('api/question/'+questionID, data)).data;
}

export {
    getAllQuestion,
    getQuestion,
    createQuestion,
    updateQuestion,
    updateLike,
}