// sample algorithm template, copy this as starter code
// your algorithm should be written in javascript, and should be contained
// within the function getRules that takes parameters userDealt, dealerDealt

// this particular algorithm attempts to get a straight of 'T', 'J', 'Q', 'K', 'A' every time

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
