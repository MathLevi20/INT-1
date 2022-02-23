'use strict'

const fs = require("fs")
const path = require("path")
const axios = require("axios")

async function download() {

    const url = 'https://s3.amazonaws.com/cdn.chickenorpasta.com.br/content/uploads/2018/07/27144837/Akira-Kaneda-1013x620.jpg'
    const imagepath = path.resolve(__dirname, 'files', 'image.jpg')
    const writer = fs.createWriteStream(imagepath)
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    })


    response.data.pipe(writer)
    
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('erro', reject)
    })

}
download()