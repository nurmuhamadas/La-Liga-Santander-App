const BASE_URL = "http://api.football-data.org/v2/";
const head = {
    headers: {
        "X-Auth-Token": "217f2c3afcb0492aa884c4f5bff4f455"
    }
}


const getDataCompetitions = (option) => {
    let url = `${BASE_URL}competitions/2014/${option.type}`;
    if (option.type == "matches")
        url += `?matchday=${option.matchday}`;
    if ("cache" in window) {
        caches.match(url).then(response => {
            if (response) {
                response.json()
                    .then(data => data);
            }
        })
    }
    return fetch(url, head)
        .then(response => response.json())
        .then(responseJson => responseJson)
        .catch(err => err)
}

const getDataPlayer = (id) => {
    if ("cache" in window) {
        caches.match(`${BASE_URL}players/${id}`).then(response => {
            if (response) {
                response.json()
                    .then(data => data);
            }
        })
    }
    return fetch(`${BASE_URL}players/${id}`, head)
        .then(response => response.json())
        .then(responseJson => responseJson)
        .catch(err => err)
}

const getDataTeam = (id) => {
    if ("cache" in window) {
        caches.match(`${BASE_URL}teams/${id}`).then(response => {
            if (response) {
                response.json()
                    .then(data => data);
            }
        })
    }
    return fetch(`${BASE_URL}teams/${id}`, head)
        .then(response => response.json())
        .then(responseJson => responseJson)
        .catch(err => err)
}

const getDataMatch = (id) => {
    if ("cache" in window) {
        caches.match(`${BASE_URL}matches/${id}`).then(response => {
            if (response) {
                response.json()
                    .then(data => data);
            }
        })
    }
    return fetch(`${BASE_URL}matches/${id}`, head)
        .then(response => response.json())
        .then(responseJson => responseJson)
        .catch(err => err)
}




export {
    getDataCompetitions,
    getDataPlayer,
    getDataTeam,
    getDataMatch
}