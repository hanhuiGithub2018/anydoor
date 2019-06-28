
const fs = require('fs');
const path = require('path');
const promise = require('./promise');
const isFresh = require('./config/cacheConfig');

module.exports = async (filePath, req, res)=>{
   await promise.fileState(filePath)
             .then((states)=>{

                 //判断缓存是否可用
                 if(isFresh(states, req, res)) {
                     res.statusCode = 304;
                     res.end();
                     return;
                 }

                if (states.isFile()){
                    promise.readFile(filePath)
                        .then((file) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/plain');
                            //这个地方 res,req 都是双工流，可读可写
                            fs.createReadStream(filePath).pipe(res);
                        })
                        .catch((err)=>{
                            //这个地方的错误会在外层方法被捕获，可以不写
                            throw new Error(err)
                        })
                }
                if (states.isDirectory()){
                    promise.readDir(filePath)
                        .then((files)=>{
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/html');
                            //file 是一个数组，直接使用数组方法处理它
                            let str = "";
                            files.map(function (val) {
                                str += `<p><a href='${path.relative('../', req.url)}/${val}'>${val}</a></p>`;
                            });
                            let html = `
                                <!DOCTYPE html>
                                <html>
                                  <head>
                                    <meta charset="utf-8">
                                      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
                                    <title>File</title>
                                  </head>
                                  <body>
                                        ${str}
                                  </body>
                                </html>
                            `;
                            // res.end(files.join(','));
                            res.end(html)
                        })
                        .catch((err)=>{
                            //这个地方的错误会在外层方法被捕获，可以不写
                            throw new Error(err)
                        })
                }
             })
             .catch((err)=>{
                 res.statusCode = 404;
                 res.setHeader('Content-Type', 'text/plain');
                 res.end(err);
             });
};
