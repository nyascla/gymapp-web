import urlcat from 'urlcat';

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

class BaseClient  {
    _setupRequest(method, paths=[], params={}) {
        return new Promise((resolve, reject) => {
            fetch(urlcat(['api', ...paths].join('/'), params), {method, credentials: 'same-origin'}).catch(reject)
                .then(response => response.ok ? response.json().then(resolve).catch(() => resolve(null)) : reject(response));
        })
    }

    _setupRequestWithJSON(method, paths=[], params={}, body={}) {
        return new Promise((resolve, reject) => {
            fetch(urlcat(['api', ...paths].join('/'), params), 
                {method,
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify(body)
                
                },
            ).catch(reject)
            .then(response => response.ok ? response.json().then(resolve).catch(() => resolve(null)) : reject(response));
        })
    }
}

class Exercises extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['exercises', ...paths], params);
    }

    getPatterns() {
        return this._setupRequest(METHOD.GET, ['patterns']);
    }

    getExercises(pattern) {
        return this._setupRequest(METHOD.GET, [':pattern'], {pattern});
    }
}

class Sessions extends BaseClient {
    _setupRequest(method, paths=[], params={}) {
        return super._setupRequest(method, ['sessions', ...paths], params);
    }
    _setupRequestWithJSON(method, paths=[], params={}, body={}) {
        return super._setupRequestWithJSON(method, ['sessions', ...paths], params, body);
    }

    getTodaySesion() {
        return this._setupRequest(METHOD.GET);
    }

    getSessionsHistoric() {
        return this._setupRequest(METHOD.GET, ['all']);    
    }

    getAllExercisesFromSession(session) {
        return this._setupRequest(METHOD.GET, ['all','exercises', ':session'], {session});    
    }

    getAllSetsFromExercise(session, exercise) {
        return this._setupRequest(METHOD.GET, ['all','sets', ':session', ':exercise'], {session, exercise});    
    }

    getAllSessions(exercise) {
        return this._setupRequest(METHOD.GET, [':exercise'], {exercise});    
    }

    getAllSetsFromSession(exercise, session) {
        return this._setupRequest(METHOD.GET, [':exercise', ':session'], {exercise, session});    
    }

    getChartData(exercise){
        return this._setupRequest(METHOD.GET, ['chart,Data', ':exercise'], {exercise});    
    }

    addSet(exercise, set) {
        return this._setupRequestWithJSON(METHOD.POST, [':exercise'], {exercise}, set);    
    }
}

export default {
    exercises: new Exercises(),
    sessions: new Sessions()
}