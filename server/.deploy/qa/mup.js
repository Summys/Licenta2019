module.exports = {
    servers: {
        one: {
            host: '3.122.246.210',
            username: 'ubuntu',
            pem: './retrospect.pem'
        }
    },
    meteor: {
        name: 'retrospect',
        path: '../..',
        servers: {
            one: {}
        },
        buildOptions: {
            serverOnly: true
        },
        env: {
            PORT: 3000,
            ROOT_URL: 'https://retrospect.space',
            MONGO_URL: 'mongodb://retrospectUser:oZs6AAAXfIvwS80@3.122.246.210:27017/retrospect'
        },
        dockerImage: 'abernix/meteord:node-8-base',
        deployCheckWaitTime: 120,
        enableUploadProgressBar: true
    }
};