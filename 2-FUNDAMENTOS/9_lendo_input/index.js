const { read } = require('fs')

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readLine.question('Qual é a sua linguagem preferida? ', (language) => {
    console.log(`Sua linguagem preferida é ${language}`)
    readLine.close()
})