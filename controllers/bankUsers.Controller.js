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
        res.json("already have a user with this id");
    }
    else {
        bankUsers.users.push(defaultUser);
        fs.writeFileSync('users.json', JSON.stringify(bankUsers));
        res.status(200).json({status: "User added to the DB"})
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
            res.status(200).json({status: "transfer completed"})
        }
}


module.exports = {
    allBankUsers,
    newUser,
    depositCashToUser,

};