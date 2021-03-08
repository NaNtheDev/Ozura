const txt = document.createElement('terminal');
const csl = document.getElementById('terminal');

const term = {
    log: function log(msg, type = 'attack') {
        if (type === 'load') {
            const load = document.createElement('a');
            const br = document.createElement('br');

            load.textContent = `${msg} `;
            load.setAttribute('class', 'load');

            txt.append(load);
            txt.append(br);
            csl.append(txt);
        };
    }
};