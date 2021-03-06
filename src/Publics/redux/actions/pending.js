import axios from 'axios';
const url = 'https://aingcreation.com';
// const url = 'https://lib-books-test.herokuapp.com';

export const pendingBooks = () => {
    return {
        type: 'GET_STATUS',
        payload: axios.get(`${url}/get/pending/`),

    }
};

export const editPending = (bookid) => {
    return {
        type: 'STATUS_EDIT', bookid,
        payload: axios.patch(`${url}/get/pending/${bookid}`)
    }

};