const fs = require('fs');

module.exports = {
    //文件状态
    fileState: function(path){
        return new Promise(function (resolve, reject) {
            fs.stat(path, (err, states)=>{
                if (err) {
                    return reject('No such director or file is exist,please check your path !');
                }
                resolve(states)
            })
        })
    },

    // 读文件
    readFile: function (path) {
        return new Promise(function (resolve, reject) {
            fs.readFile(path, (err, file)=>{
                if (err) {
                    return reject('No such director or file is exist !');
                }
                resolve(file)
            })
        })
    },

    //读文件夹
    readDir: function (path) {
        return new Promise(function (resolve, reject) {
            fs.readdir(path, (err, files)=>{
                if (err) {
                    return reject('No such director or file is exist !');
                }
                resolve(files)
            })
        })
    }
};
