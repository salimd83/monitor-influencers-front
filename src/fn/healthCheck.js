import _ from 'lodash'

import envJson from '../.env.json'

export const envDetails = envJson
export const hiUser     = JSON.parse(localStorage.getItem('hiUser'))
console.log(`You are running version ${envDetails.version} build ${envDetails.build}.`, 'color: #bada55')
console.log(`Internal none cached version: https://beaux.link/dev/?app=hi&version=${envDetails.version}`, 'color: #bada55')


export async function healthCheck(dataArr, func, opts = []) {


}
