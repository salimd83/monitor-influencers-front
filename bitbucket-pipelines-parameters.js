const fs = require('fs')

const json = {
    'commit' : process.argv[2],
    'version': process.argv[3],
    'build'  : process.argv[4],
    'repo'   : {
        'branch': process.argv[5],
        'tag'   : process.argv[6]
    }
}


fs.writeFile('src/.env.json', JSON.stringify(json), 'utf8', () => {
    return 'File Created'
})


