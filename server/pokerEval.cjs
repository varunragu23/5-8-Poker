const suits = ['C', 'D', 'H', 'S'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const faceValues = ['T', 'J', 'Q', 'K', 'A'];

const isRoyalFlush = (hand) => {
    for (let suit of suits) {
        let cnt = 0;
        for (let value of faceValues) {
            if (hasCard(hand, (value + suit))) cnt++;
        }
        if(cnt === 5) {
            return true;
        }
    }
    return false;
};

const isStraightFlush = (hand) => {
    for(let i = 8; i >= 0; i--) {
        for(let suit of suits) {
            let cnt = 0;
            for(let j = 0; j < 5; j++) {
                if(hasCard(hand, (values[i + j] + suit))) cnt++;
            }
            if(cnt === 5) {
                return {'isStraightFlush': true, 'index': i};
            }
        }
    }
    return {'isStraightFlush': false};
}

const isFourOfAKind = (hand) => {
    for (let i = 12; i >= 0; i--) {
        if(cntCard(hand, values[i]) === 4) {
            return {'isFourOfAKind': true, 'index': i};
        }
    }
    return {'isFourOfAKind': false};
}

const isFullHouse = (hand) => {
    for (let i = 12; i >= 0; i--) {
        for (let j = 12; j >= 0; j--) {
            if(i === j) continue;
            if(cntCard(hand, values[i]) >= 3 && cntCard(hand, values[j]) >= 2) {
                return {'isFullHouse': true, 'index': i};
            }
        }
    }
    return {'isFullHouse': false};
}

const getBest = (hand1, hand2) => {
    if(hand1.length == 0) return false;
    if(hand2.length == 0) return true;

    for(let i = 0; i < hand1.length; i++) {
        if(hand1[i] > hand2[i]) return true;
        else if(hand1[i] < hand2[i]) return false;
    }
    return true;
}

// Helper function example
const isFlush = (hand) => {
    let best = [];
    for (let suit of suits) {
        let cur = [];
        for(let i = 12; i >= 0; i--) {
            if(cur.length >= 5) break;
            if(hasCard(hand, (values[i] + suit))) cur = [...cur, i]
        }
        if(cur.length == 5) {
            if(!getBest(best, cur)) {
                best = cur;
            }
        }
    }
    if(best.length == 5) {
        return {'isFlush': true, 'index': best};
    }
    else {
        return {'isFlush': false};
    }
};

const isStraight = (hand) => {
    for(let i = 8; i >= 0; i--) {
        let cnt = 0;
        for(let j = 0; j < 5; j++) {
            if(cntCard(hand, values[i + j]) >= 1) cnt++;
        }
        if(cnt === 5) {
            return {'isStraight': true, 'index': i};
        }
    }
    return {'isStraight': false};
};

const isThreeOfAKind = (hand) => {
    for (let i = 12; i >= 0; i--) {
        if(cntCard(hand, values[i]) >= 3) {
            return {'isThreeOfAKind': true, 'index': i};
        }
    }
    return {'isThreeOfAKind': false};
}

const isTwoPair = (hand) => {
    for (let i = 12; i >= 0; i--) {
        for (let j = 12; j >= 0; j--) {
            if(i === j) continue;
            if(cntCard(hand, values[i]) >= 2 && cntCard(hand, values[j]) >= 2) {
                return {'isTwoPair': true, 'index': [i, j]};
            }
        }
    }
    return {'isTwoPair': false};
}

const isPair = (hand) => {
    for (let i = 12; i >= 0; i--) {
        if(cntCard(hand, values[i]) >= 2) {
            return {'isPair': true, 'index': i};
        }
    }
    return {'isPair': false};
}

const isHighCard = (hand) => {
    for (let i = 12; i >= 0; i--) {
        if(cntCard(hand, values[i]) >= 1) {
            return {'isHighCard': true, 'index': i};
        }
    }
    return {'isHighCard' : false};
}



const hasCard = (hand, card) => {
    return hand.includes(card);
};

const cntCard = (hand, value) => {
    let cnt = 0;
    for (let suit of suits) {
        if (hasCard(hand, (value + suit))) {
            cnt++;
        }
    }
    return cnt;
}

// Main function to evaluate the hand
const evaluateHand = (hand) => {
    let royalEval = isRoyalFlush(hand);
    if(royalEval) {
        return {'hand': 'Royal Flush', 'value': 1, 'index': 0};
    }
    let straightFlushEval = isStraightFlush(hand);
    if(straightFlushEval['isStraightFlush']) {
        return {'hand': 'Straight Flush', 'value': 2, 'index': straightFlushEval['index']};
    }
    let fourOfAKindEval = isFourOfAKind(hand);
    if(fourOfAKindEval['isFourOfAKind']) {
        return {'hand': 'Four Of A Kind', 'value': 3, 'index': fourOfAKindEval['index']};
    }
    let fullHouseEval = isFullHouse(hand);
    if(fullHouseEval['isFullHouse']) {
        return {'hand': 'Full House', 'value': 4, 'index': fullHouseEval['index']};
    }
    let flushEval = isFlush(hand);
    if(flushEval['isFlush']) {
        return {'hand': 'Flush', 'value': 5, 'index': flushEval['index']};
    }
    let straightEval = isStraight(hand);
    if(straightEval['isStraight']) {
        return {'hand': 'Straight', 'value': 6, 'index': straightEval['index']};
    }
    let threeOfAKindEval = isThreeOfAKind(hand);
    if(threeOfAKindEval['isThreeOfAKind']) {
        return {'hand': 'Three Of A Kind', 'value': 7, 'index': threeOfAKindEval['index']};
    }
    let twoPairEval = isTwoPair(hand);
    if(twoPairEval['isTwoPair']) {
        return {'hand': 'Two Pair', 'value': 8, 'index': twoPairEval['index']};
    }
    let pairEval = isPair(hand);
    if(pairEval['isPair']) {
        return {'hand': 'Pair', 'value': 9, 'index': pairEval['index']};
    }
    let highCardEval = isHighCard(hand);
    if(highCardEval['isHighCard']) {
        return {'hand': 'High Card', 'value': 10, 'index': highCardEval['index']};
    }
    return {'hand': 'Empty Hand', 'value': 11, 'index': 0};
};

const compareHands = (hand1, hand2) => {
    if(hand1['value'] < hand2['value']) return true;
    if(hand1['value'] > hand2['value']) return false;

    let val = hand1['value'];
    if(val === 5 || val == 8) {
        let bst = getBest(hand1['index'], hand2['index']);
        return bst;
    }
    if(hand1['index'] >= hand2['index']) return true;
    return false;
}

module.exports = {compareHands, evaluateHand}