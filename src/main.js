
const http = require('http');
const chalk = require('chalk');
const path = require('path');
const config = require('./config');
const workDeal = require('./workDeal');
const server = http.createServer((req, res)=>{

    const filePath = path.join(config.root, "..", req.url);
    //这个地方的函数是一个 async 函数，等待执行完毕 才可以执行下一个操作
    workDeal(filePath, req, res);

});

server.listen(config.port, config.hostName, ()=>{
    let addr = "http://" + config.hostName + ":" + config.port;
    console.info("Server started at " + chalk.green(addr));
});
