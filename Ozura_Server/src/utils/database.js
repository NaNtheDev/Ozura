const Enmap = require('enmap');

module.exports = {
    client: new Enmap({ name: 'client' }),
    command: new Enmap({ name: 'command' }),
    stats: new Enmap({ name: 'stats' })
};
