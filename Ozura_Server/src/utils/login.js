module.exports = (token, req, res) => {
    if (!req.headers.token) return res.json({
        message: 'Unauthorized',
        code: 429
    });
    if (req.headers.token != token) return res.json({
        message: 'Unauthorized',
        code: 429
    });
};
