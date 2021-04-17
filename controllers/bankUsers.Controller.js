const bankUsers = require('../users.json');
const fs = require('fs');


const allBankUsers = (req, res) => {
    return res.status(200).json({user: bankUsers.users});
};

const newUser = (req, res) => {
    const {id} = req.body;
    const checkuser = bankUsers.users.find(i => i.id == id );
    const defaultUser = {
        id: id,
        cash: 0,
        credit: 0,
        isActive: true,
    }
    if(checkuser) {
        return res.json("already have a user with this id");
    }
    else {
        bankUsers.users.push(defaultUser);
        fs.writeFileSync('users.json', JSON.stringify(bankUsers));
        return res.status(200).json({status: "User added to the DB"})
    }

};

const depositCashToUser = (req, res) => {
    const {id} = req.params;
    const {cashToTransfer} = req.body;
    const checkuser = bankUsers.users.find(i => i.id == id );
        if(!cashToTransfer || cashToTransfer < 0 || !checkuser){
            return res.json("wrong input, the transfer failed")
        }
        else {
            checkuser.cash += cashToTransfer;
            fs.writeFileSync('users.json', JSON.stringify(bankUsers));
            return res.status(200).json({status: "transfer completed"})
        }
};

const creditUpdate = (req, res) => {
    const {id} = req.params;
    const {setNewCredit} = req.body;
    const checkuser = bankUsers.users.find(i => i.id == id );
        if(!setNewCredit || setNewCredit < 0 || !checkuser){
            return res.json("wrong input, the update failed")  
        }
        else {
            checkuser.credit += setNewCredit;
            fs.writeFileSync('users.json', JSON.stringify(bankUsers));
            return res.status(200).json({status: "new credit set completed"}) 
        }
}

const withdrawMoney = (req, res) => {
    const {id} = req.params;
    const {cashToWithdraw} = req.body;
    const checkuser = bankUsers.users.find(i => i.id == id );
        if(!cashToWithdraw || cashToWithdraw < 0 || !checkuser){
            return res.json("wrong input, the withdraw failed");
        } 
        else if(checkuser.cash + checkuser.credit < cashToWithdraw ){
            return res.json("You don't have options to withdraw this amount of money - Not enough credit!") 
        }
        else {
            checkuser.cash -= cashToWithdraw;
            fs.writeFileSync('users.json', JSON.stringify(bankUsers));
            return res.status(200).json({status: "withdraw completed your new balance is:" + checkuser.cash}) 
        }
}

module.exports = {
    allBankUsers,
    newUser,
    depositCashToUser,
    creditUpdate,
    withdrawMoney,
};