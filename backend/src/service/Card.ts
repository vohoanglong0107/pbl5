import CardRepo from "../repository/card";
import CardModel from "../model/Card";

class Card {
  constructor() {}

  public async GetMainDeckByPlayerNumber(numPlayers: number) {
    let decks: Array<CardModel> = new Array();

    // add Attack x2 cards
    var attacks = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "Attack 2x"
    );
    attacks.forEach((card) => {
      let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
      decks.push(c);
    });

    var targetedAttack = await CardRepo.getBySetSheetMechanic(
      "Imploding Kittens",
      "Expansions",
      "Targeted Attack 2x"
    );
    targetedAttack.forEach((card) => {
      let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
      decks.push(c);
    });

    // add Cat Card cards
    var catCards = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "Cat Card"
    );
    catCards.forEach((card) => {
      for (let i = 1; i <= 4; i++) {
        let c = new CardModel(
          card.id,
          card.name,
          card.description,
          card.imgUrl
        );
        decks.push(c);
      }
    });

    // add defuse cards
    var defuses = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "Defuse"
    );
    for (let i = 0; i < numPlayers * 2; ++i) {
      const card = defuses[i % defuses.length];
      let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
      decks.push(c);
    }

    // add Exploding Kitten cards
    var explodingKittens = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "Exploding Kitten"
    );
    for (let i = 0; i < Math.max(numPlayers, explodingKittens.length); ++i) {
      const card = explodingKittens[i % explodingKittens.length];
      let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
      decks.push(c);
    }

    // ! hadn't supported yet
    // add Favor cards
    // var Favors = await CardRepo.getBySetSheetMechanic(
    //   "Original Edition",
    //   "Main Decks",
    //   "Favor"
    // );
    // Favors.forEach((card) => {
    //   let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
    //   decks.push(c);
    // });

    // // add Nope cards
    // var Nopes = await CardRepo.getBySetSheetMechanic(
    //   "Original Edition",
    //   "Main Decks",
    //   "Nope"
    // );
    // Nopes.forEach((card) => {
    //   let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
    //   decks.push(c);
    // });

    // add See the Future 3x cards
    var SeetheFutures = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "See the Future 3x"
    );
    SeetheFutures.forEach((card) => {
      let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
      decks.push(c);
    });

    // add Shuffle cards
    var Shuffles = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "Shuffle"
    );
    Shuffles.forEach((card) => {
      let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
      decks.push(c);
    });

    // add Skip cards
    var Skips = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "Skip"
    );
    Skips.forEach((card) => {
      let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
      decks.push(c);
    });

    var DrawFromBottoms = await CardRepo.getBySetSheetMechanic(
      "Imploding Kittens",
      "Expansions",
      "Draw From the Bottom"
    );
    DrawFromBottoms.forEach((card) => {
      let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
      decks.push(c);
    });
    var Reverses = await CardRepo.getBySetSheetMechanic(
      "Imploding Kittens",
      "Expansions",
      "Reverse"
    );
    Reverses.forEach((card) => {
      let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
      decks.push(c);
    });
    return decks;
  }
}

export default new Card();
