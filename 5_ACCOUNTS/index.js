//modulos externos
const inquirer = require('inquirer');
const chalk = require('chalk');

//modulos internos
const fs = require('fs');

operation();

function operation(){
    inquirer.prompt([{
        type: 'list',
        name: 'operation',
        message: 'O que você deseja fazer? ',
        choices: [
            'Criar uma conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair',
        ],},
    ]).then((answer) => {

        const action = answer['operation'];

        if(action === 'Criar uma conta'){
            createAccount();
        }else if(action === 'Depositar'){
            deposit();
        }else if(action === 'Consultar saldo'){
            getAccountBalance();
        }
        else if(action === 'Sacar'){
            withdraw();
        }
        else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por utilizar o nosso banco!'));
            process.exit();
        }
        else{
            console.log(chalk.bgRed.black('Operação inválida!'));
            operation();
        }
    }).catch((err) => console.log(err));
}

function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir:'))
    buildAccount();
}

function buildAccount(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta: ',
    },]).then((answer) => {
        const accountName = answer['accountName'];
        console.info(chalk.green(`Nome da conta: ${accountName}`));

        if(!fs.existsSync('./accounts')){
            fs.mkdirSync('./accounts');
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'));
            buildAccount();
            return;
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err){
            console.log(err);
        });

        console.log(chalk.bgGreen.black('Conta criada com sucesso!'));

        operation();

    }).catch((err) => console.log(err));
}

function deposit(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta: ',
    },]).then((answer) => {
        const accountName = answer['accountName'];

        if(!checkAccount(accountName)){
            return deposit();
        }

        inquirer.prompt([
            {
            name: 'amount',
            message: 'Digite o valor do depósito: ',	 
        },
    ]).then((answer) => {
        
        const amount = answer['amount'];
        
        addAmount(accountName, amount);

        
    })
        
    }).catch((err) => console.log(err));  
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'));
        return false;
    }
    return true;
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName);

    if(!amount){
        console.log(chalk.bgRed.black('Valor inválido!'));
        return deposit();
    }

    accountData.balance += parseFloat(amount) + parseFloat(accountData.balance);

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){
        console.log(err);
    });

    console.log(chalk.bgGreen.black(`Depósito no valor R$${amount} realizado com sucesso!`));
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding: 'utf-8',
        flag: 'r',
    });

    return JSON.parse(accountJSON);

}

function getAccountBalance(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta: ',
    },]).then((answer) => {
        const accountName = answer['accountName'];

        if(!checkAccount(accountName)){
            return getAccountBalance();
        }

        const accountData = getAccount(accountName);

        console.log(chalk.bgBlue.black(`O saldo da conta ${accountName} é R$${accountData.balance}`));

        operation();

    }).catch((err) => console.log(err));
}

function withdraw(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta: ',
    },]).then((answer) => {
        const accountName = answer['accountName'];

        if(!checkAccount(accountName)){
            return withdraw();
        }

        inquirer.prompt([
            {
            name: 'amount',
            message: 'Digite o valor do saque: ',	 
        },
    ]).then((answer) => {
        
        const amount = answer['amount'];
        
        removeAmount(accountName, amount);

    })
        
    }).catch((err) => console.log(err));  
}

function removeAmount(accountName,amount){
    const accountData = getAccount(accountName);

    if(!amount){
        console.log(chalk.bgRed.black('Valor inválido!'));
        return withdraw();
    }

    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Saldo insuficiente!'));
        return withdraw();
    }

    accountData.balance -= parseFloat(amount);

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){
        console.log(err);
    });

    console.log(chalk.bgGreen.black(`Saque no valor R$${amount} realizado com sucesso!`));

    operation();
}