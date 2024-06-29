const suits = ['C', 'D', 'H', 'S'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const faceValues = ['T', 'J', 'Q', 'K', 'A'];

const hasValue = (val, dealt) => {
    for(let i = 0; i < dealt.length; i++) {
        if(dealt[i][0] == val) return true;
    }
    return false;
}

const upd = (val, rules, to) => {
    for(let suit of suits) {
        rules[(val + suit)] = to;
    }
    return;
}

const getRules = (userDealt, dealerDealt) => {
    let rules = {};
    for(let value of values) {
        if(faceValues.includes(value)) {
            if(hasValue(value, userDealt)) {
                upd(value, rules, false);
            }
            else {
                upd(value, rules, true);
            }
        }
        else {
            upd(value, rules, false);
        }
    }
    return rules;
}

module.exports = { getRules };
