import http from 'http';
import url from 'url';
import pathmodule from 'path';
import fetch from 'node-fetch';

const hostname = 'localhost';
const port = 3000;
const waitTime = 3600000;

const edges = {
    'BOG' : {
        ip: '13.227.5.86',
        host: 'server-13-227-5-86.bog50.r.cloudfront.net',
        node: 'BOG50-C1'
    },
    'LIM' : {
        ip: '108.158.102.122',
        host: '',
        node: 'LIM50-P1'
    },
    'QRO' : {
        ip: '3.161.10.56',
        host: 'server-3-161-10-56.qro51.r.cloudfront.net',
        node: 'QRO51-P3'
    },
    'SCL' : {
        ip: '3.162.230.171',
        host: 'server-3-162-230-171.scl51.r.cloudfront.net',
        node: 'SCL51-P5'
    },
    'EZE' : {
        ip: '18.65.46.55',
        host: 'server-18-65-46-55.eze50.r.cloudfront.net',
        node: 'EZE50-P1'
    },
    'NBO' : {
        ip: '52.84.97.16',
        host: 'server-52-84-97-16.nbo50.r.cloudfront.net',
        node: 'NBO50-C1'
    },
    'BAH' : {
        ip: '18.66.153.31',
        host: 'server-18-66-153-50.bah52.r.cloudfront.net',
        node: ''
    },
    'DXB' : {
        ip: '18.161.66.30',
        host: 'server-18-161-66-30.dxb52.r.cloudfront.net',
        node: 'DXB52-P1'
    },
    'FJR' : {
        ip: '13.35.169.84',
        host: 'server-13-35-169-84.fjr50.r.cloudfront.net',
        node: 'FJR50-C1'
    },
    'MCT' : {
        ip: '18.64.142.204',
        host: 'server-18-64-142-204.mct50.r.cloudfront.net',
        node: 'MCT50-P1'
    }
}
let pops = {};
let count = 0;
const startTime = Date.now();

function random(){
    return ("000000000000000000" + Math.random().toString().slice(2)).slice(-12)
}

function _fetch(edge){
    fetch('http://' + edge.ip + '/download?v=' + random(), {
        method: 'GET',
        headers: {
          'Host': 'd375c8n0f70a17.cloudfront.net'
        }
    }).then(function(response){
        response.text().then(function(text){
            
        });
    }).catch(function(error){
        
    });
}

const server = http.createServer((req, res) => {
    
    const url = new URL('http://localhost' + req.url),
          params = url.searchParams,
          path = url.pathname.replace(/^\/+|\/+$/g, '');
    
    let content = '';

    if(path == 'cdn'){
        
        for(let prop in edges){
            _fetch(edges[prop]);
        }
        
        content += 'Edges refreshed ✓'
    }else if(path == 'pop'){
        let pop = params.get('pop');
        let ip  = params.get('ip');
        if(pop){
            pops[pop] = ip;
            count++;
        }
    }else if(path == 'pops'){
        content += "Count: " + count + "\n\n";
        content += JSON.stringify(pops, null, 4);
    }else if(path == 'age'){
        content += 'Age: ' + Math.round((Date.now() - startTime) / 1000);
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(content);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.timeout = 300000;
server.setTimeout(300000);