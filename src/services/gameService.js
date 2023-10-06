import http from './httpService'

const apiEndpoint  = 'http://localhost:80/api/game'




export function singlePlayerGame(){
    return http.get(apiEndpoint+'/single-player')
}

export function multiPlayerGame(){
    return http.get(apiEndpoint+'/multiplayer')
}

export function joinGame(gameId){
    return http.post(apiEndpoint+'/join-game',{
        id:gameId
    })
}