const path=require('path');
const fs=require('fs');

const solc=require('solc');
const LotteryPath=path.resolve(__dirname,'contract','Lottery.sol');

const source=fs.readFileSync(LotteryPath,'utf8');

var input=
{
    language:'Solidity',
    sources:
    {
        'Lottery.sol':
        {
            content:source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 
const output=JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output.contracts['Lottery.sol'])
/*for (var contractName in output.contracts['Inbox.sol']) {
    console.log(
      contractName +
        ': ' +
        output.contracts['Inbox.sol'][contractName]
    );
  }

*/
module.exports = output.contracts["Lottery.sol"]["Lottery"];
