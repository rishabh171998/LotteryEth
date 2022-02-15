const hdwallet=require('@truffle/hdwallet-provider');
const Web3=require('web3');
const {abi,evm}=require('./compile');
const provider=new hdwallet(
    'ACCOUNT SECRET',
    'https://rinkeby.infura.io/v3/199ff887de384df89f891656d34eb30f'
)

const web3=new Web3(provider);

const deploy=async ()=>
{
const accounts=await web3.eth.getAccounts();

console.log('Attempting to deploy from account',accounts[0]);
const result=await new web3.eth.Contract(abi)
.deploy({data:evm.bytecode.object})
.send({from:accounts[0],gas: '1000000' });
console.log('Contract',result);
provider.engine.stop();
}
deploy();