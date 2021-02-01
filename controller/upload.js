const fs = require('fs')
const path = require('path')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 生成新的文件夹名称
function getUploadDirName(){
    const date = new Date();
    let month = Number.parseInt(date.getMonth()) + 1;
    let day = Number.parseInt(date.getDay());
    month = month.toString().length > 1 ? month : `0${month}`;
    day = day.toString().length > 1 ? day : `0${day}`;
    const dir = `${date.getFullYear()}${month}${day}`;
    return dir;
}

// 生成新的文件名称
function getUploadFileName(fileName) {
    let ext = fileName.split('.')
    let dateInt = new Date().getTime()
    return `${dateInt}.${ext[ext.length - 1]}`
}

// 检查文件夹是否存在
function checkDirExist(dirName) {
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
}

class Upload {
    static async uploadImage(ctx) {
        try {
            // 上传单个文件
            const file = ctx.request.files.file
            // 创建可读流
            const reader = fs.createReadStream(file.path)
            // 生成图片文件名字
            let newName = getUploadFileName(file.name)
            let newDir = getUploadDirName()
            console.log(newDir);
            // 文件目录
            let dir = path.join(__dirname, `../public/upload/${newDir}`);
            checkDirExist(dir)
            let filePath = `${dir}/${newName}`
            // 创建可写流
            const upStream = fs.createWriteStream(filePath)
            // 可读流通过管道写入可写流
            reader.pipe(upStream)
            let urlstr = `/upload/${newName}`
            ctx.body = new SuccessModel('上传成功')
            ctx.body.data = {
                url: urlstr
            }
        } catch (err) {
            ctx.body = new ErrorModel(err)
            ctx.body.status = 500
        }

    }
}

module.exports = Upload;