const x = "10";

//checar se X é um número

if(!Number.isInteger(x)){
    throw new Error('X não é um número')
}

console.log('Continuando o código...');