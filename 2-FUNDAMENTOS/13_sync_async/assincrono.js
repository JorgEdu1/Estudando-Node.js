const fs = require('fs');

console.log("Início");

fs.writeFile('arquivo.txt', 'Oi', function(err) {
    setTimeout(function() {
        console.log("Arquivo escrito");
    }, 2000);
});

console.log("Fim");