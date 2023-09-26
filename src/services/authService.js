import http from './httpService'

const apiEndpoint = 'http://localhost:80/api/auth/'

http.setJwt(getJwt())
export function login(username, password){

    return http.post(apiEndpoint,{username,password})
}

export function getJwt(){
    return localStorage.getItem('token')
}

export default {
    login,
    getJwt
}