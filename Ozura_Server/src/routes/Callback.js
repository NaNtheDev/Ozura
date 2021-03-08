const { Router } = require('express');
const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = class Callback extends Router {
    constructor(server) {
        super(server);
        this.server = server;

        this.get('/callback', (req, res) => {
            if (this.server.data.client.has(req.headers['x-forwarded-for'])) return res.json({
                message: 'Already registred',
                code: 200
            });
            if (!req.headers.os) return res.json({
                message: 'Set the os in the headers',
                code: 300
            });
            if (!req.headers.token || req.headers.token !== config.userToken) return res.json({
                message: 'Unauthorized',
                code: 429
            });
            if (!this.server.config.os.includes(req.headers.os)) return res.json({
                message: `The os ${req.headers.os} doesn't exist`,
                code: 404
            });
            fetch(`http://ip-api.com/json/${req.headers['x-forwarded-for']}`)
                .then(res => res.json())
                .then(data => {
                    this.server.data.client.set(req.headers['x-forwarded-for'], {
                        ip: req.headers['x-forwarded-for'],
                        os: req.headers.os,
                        joinAt: Date.now(),
                        lastCall: Date.now(),
                        location: {
                            region: data.regionName,
                            country: data.countryCode,
                            city: data.city,
                            latitude: data.lat,
                            longitude: data.lon
                        }
                    });
                    this.server.data.stats.math(req.headers.os, '+', 1, 'count');
                });
            res.json({
                message: 'OK',
                code: 200
            });
        });
    };
};
