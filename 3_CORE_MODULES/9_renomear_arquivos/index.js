const fs = require('fs');

fs.rename('arquivo.txt', 'arquivo_renomeado.txt', function(err) {
    if (err) 
        console.log(err) 
        return;
    console.log('Arquivo renomeado com sucesso!');
});