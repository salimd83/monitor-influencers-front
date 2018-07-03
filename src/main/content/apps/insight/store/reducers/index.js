import {combineReducers} from 'redux'
import insight           from './insight.reducer'
import user              from './user.reducer'

const profileAppReducers = combineReducers({
                                               insight,
                                               user
                                           })

export default profileAppReducers
