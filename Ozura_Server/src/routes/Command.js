const { Router } = require('express');

module.exports = class Command extends Router {
    constructor(server) {
        super(server);
        this.server = server;

        this.get('/command', (req, res) => {
            if (!this.server.data.client.has(req.headers['x-forwarded-for'])) return res.json({
                message: 'You doesn\'t registred',
                code: 429
            });
            this.server.data.client.set(req.headers['x-forwarded-for'], Date.now(), 'lastCall')
            res.json({
                message: this.server.data.command.get('command'),
                code: 200
            });
        });
    };
};