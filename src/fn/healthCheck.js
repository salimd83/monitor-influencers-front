import _ from 'lodash'

let envJson = {}
try {
    envJson = require('../.env.json')
}
catch (err) {

}

const defaultEnv = {
    'commit' : 'NA',
    'build'  : 'NA',
    'version': 'NA',
    'repo'   : {
        'branch': 'NA',
        'tag'   : 'NA'
    }
}

export const envDetails = {...defaultEnv, ...envJson}

const hiUserStorage = JSON.parse(localStorage.getItem('hiUser'))

const defaultUser = {
    baToken: '',
    from   : 'internal',
    role   : 'guest',
    data   : {
        'displayName': 'Not signed in.',
        'photoURL'   : 'assets/images/avatars/Abbott.jpg',
        'email'      : 'hello@beaux.media'
    }
}

export const hiUser = {...defaultUser, ...hiUserStorage}

console.log(`Hey Devs! You are running version ${envDetails.version} build ${envDetails.build}.`)

export async function healthCheck(dataArr, func, opts = []) {


}