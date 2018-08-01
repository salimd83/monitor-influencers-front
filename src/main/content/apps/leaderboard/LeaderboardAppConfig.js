import LeaderboardApp     from 'main/content/apps/leaderboard/LeaderboardApp'
import FuseSettingsConfig from 'fuse-configs/fuseSettingsConfig'


export const LeaderboardAppConfig = {

    settings: {
        layout: {
            config: {}
        }, ...FuseSettingsConfig.alternativeConfig.mirror
    },
    auth    : ['siLeaderboard'],
    routes  : [
        {
            path     : '/mirrorr/leaderboard',
            component: LeaderboardApp
        }
    ]
}
