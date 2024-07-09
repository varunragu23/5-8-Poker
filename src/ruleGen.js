

const suits = ['C', 'D', 'H', 'S'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const createCardList = (charater, dealt) => {
    let print = `The ${charater} already has the following cards: \n`;
    // console.log(dealt);

    dealt.forEach((card) => {
        print = print + card + `\n`;
    });
    return print;
}

export const createPrompt = (input, userDealt, dealerDealt) => {
  const userCards = createCardList(`user`, userDealt);
  const dealerCards = createCardList(`dealer`, dealerDealt);
  let prompt = 
  `You are a helpful assistant knowledgable in a spin-off of poker where the dealer and the user are competing to form the best poker hands possible. You need to select a subset of poker cards from the following list according to the user's query: 
    ${values.map(value => suits.map(suit => `${value}${suit.charAt(0)}`)).flat().join(', ')}.\n`
     + userCards 
    + dealerCards;
  prompt = prompt +  `The user's requested subset of cards is as follows: "${input}" 
  Please select their requested cards from the provided list and print only the cards the user needs to select. This is important! don't give the user all the available cards, only the cards they want`
  return prompt;
};