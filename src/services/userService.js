import http from './httpService'

const apiEndpoint  = 'http://localhost:80/api/users'
export function getUsers(){
    return http.get(apiEndpoint)
}

export function registration(user){
    return http.post(apiEndpoint+'/register',{
    name: user.name,
    password: user.password,
    username:user.username,
    email: user.username
    })
}

