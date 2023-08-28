import http from 'http';
import url from 'url';
import pathmodule from 'path';
import fetch from 'node-fetch';

const hostname = 'localhost';
const port = 3000;
const waitTime = 3600000;

let response;

const edges = {
    'BOG' : {ip: '13.227.5.86'},
    'LIM' : {ip: '108.158.102.122'},
    'QRO' : {ip: '3.161.10.56'},
    'SCL' : {ip: '3.162.198.91'},
    'EZE' : {ip: '18.65.46.55'},
    'NBO' : {ip: '52.84.97.16'},
    'BAH' : {ip: '18.66.153.31'},
    'DXB' : {ip: '18.161.66.30'},
    'FJR' : {ip: '13.35.169.84'},
    'MCT' : {ip: '18.64.142.204'}
}

for(let prop in edges){
    edges[prop].name = prop
    edges[prop].lastTime = Date.now() - waitTime - 1
}

function random(){
    return ("000000000000000000" + Math.random().toString().slice(2)).slice(-12)
}

async function _fetch(ip){
    return await fetch('http://' + ip + '/download' + '?v=' + random(), {
        method: 'GET',
        headers: {
          'Host': 'd375c8n0f70a17.cloudfront.net',
        },
    })
}

function __fetch(ip){
    fetch('http://' + ip + '/download-' + '?v=' + random(), {
        method: 'GET',
        headers: {
          'Host': 'd375c8n0f70a17.cloudfront.net',
        },
    }).then(function(res){
        try {
            res.text();
        }catch(e){ }
    }).catch(function(error){
        
    });
}

const server = http.createServer(async (req, res) => {
    
    const url = new URL('http://localhost' + req.url),
          params = url.searchParams,
          path = url.pathname.replace(/^\/+|\/+$/g, '');
    
    let content = '',
        response,
        length,
        time,
        param;

    if(path == 'cdn'){
        /*
        async function handle(){
            let pop
            
            param = (params.get('pop') || '').toUpperCase();
            pop   = edges[param] || {};
            
            if(pop.name){
                if(params.get('limit') && (Date.now() - pop.lastTime < waitTime)){
                    content = 'Rate Limit.'
                    return;
                }
                time = Date.now()
                /*
                response = await _fetch(pop.ip)
                if(response.ok){
                    length = (await response.text()).length
                    pop.lastTime = Date.now();
                }
                content += pop.name + ': refreshed ' + (response.ok ? ('✓' + ' (' + length + ')') : '✖') + ' in ' + ((Date.now() - time) / 1000).toFixed(1) + 's'
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
        await handle()
        */
        
        for(let prop in edges){
            __fetch(edges[prop].ip);
        }
        
        content = 'Edges refreshed ✓'
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(content);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.timeout = 300000;
server.setTimeout(300000);