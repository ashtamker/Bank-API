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




module.exports = {
    allBankUsers,
    newUser,
};