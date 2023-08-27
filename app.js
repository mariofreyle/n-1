import http from 'http';
import url from 'url';
import pathmodule from 'path';
import fetch from 'node-fetch';

const hostname = 'localhost';
const port = 3000;

const edges = {
    'BOG' : '13.227.5.86',
    'LIM' : '108.158.102.122',
    'QRO' : '3.161.10.56',
    'SCL' : '3.162.198.91',
    'EZE' : '18.65.46.55',
    'NBO' : '52.84.97.16',
    'BAH' : '18.66.153.31',
    'DXB' : '18.161.66.30',
    'FJR' : '13.35.169.84',
    'MCT' : '18.64.142.204'
}

/*const edges = {
    'BOG' : '13.227.5.86',
    'SCL' : '3.162.198.91'
}*/

function random(){
    return ("000000000000000000" + Math.random().toString().slice(2)).slice(-12)
}

const server = http.createServer(async (req, res) => {
    
    let content = '',
        response,
        length;

    async function _fetch(ip){
    return await fetch('http://' + ip + '/downloadx' + '?v=' + random(), {
        method: 'GET',
            headers: {
              'Host': 'd375c8n0f70a17.cloudfront.net',
            },
        })
    }
    
    if(req.url.match(/\/cdn/)){
        for(let prop in edges){
            response = await _fetch(edges[prop])
            if(response.ok){
                length = (await response.text()).length
            }
            content += prop + ': refreshed ' + (response.ok ? ('✓' + ' (' + length + ')') : '✖')
            content += "\n"
            if(response.ok){
                for(const pair of response.headers.entries()){
                    if(!pair[0].match(/cache-control|server|server-timing|timing-allow-origin|vary|via|x-amz-cf-id/)){
                        content += `  ${pair[0]}: ${pair[1]}`
                        content += "\n";
                    }
                }
            }
            content += "\n"
        }
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.end(content);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.timeout = 300000;
server.setTimeout(300000);