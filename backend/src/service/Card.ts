import CardRepo from "../repository/card";
import CardModel from "../model/Card";

interface CardSetting {
  name: string;
  number: number;
}

class Card {
  constructor() { }

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

    // var targetedAttack = await CardRepo.getBySetSheetMechanic(
    //   "Imploding Kittens",
    //   "Expansions",
    //   "Targeted Attack 2x"
    // );
    // targetedAttack.forEach((card) => {
    //   let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
    //   decks.push(c);
    // });

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

    // var DrawFromBottoms = await CardRepo.getBySetSheetMechanic(
    //   "Imploding Kittens",
    //   "Expansions",
    //   "Draw From the Bottom"
    // );
    // DrawFromBottoms.forEach((card) => {
    //   let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
    //   decks.push(c);
    // });
    // var Reverses = await CardRepo.getBySetSheetMechanic(
    //   "Imploding Kittens",
    //   "Expansions",
    //   "Reverse"
    // );
    // Reverses.forEach((card) => {
    //   let c = new CardModel(card.id, card.name, card.description, card.imgUrl);
    //   decks.push(c);
    // });

    return decks;
  }

  private async AddCardsToDeck(decks: Array<CardModel>, set: string, sheet: string, mechanic: string, num: number) {
    // let cardRes: Array<CardModel> = new Array();
    let cards = await CardRepo.getBySetSheetMechanic(set, sheet, mechanic);
    if (cards.length >= num) {
      for (let k = 0; k < num; k++) {
        decks.push(new CardModel(cards[k].id, cards[k].name, cards[k].description, cards[k].imgUrl));
      }
    } else {
      for (let k = 0; k < num / cards.length; k++) {
        decks.push(new CardModel(cards[k].id, cards[k].name, cards[k].description, cards[k].imgUrl));
      }
      for (let k = 0; k < num % cards.length; k++) {
        decks.push(new CardModel(cards[k].id, cards[k].name, cards[k].description, cards[k].imgUrl));
      }
    }
    return decks;
  }



  public async GetMainDeckByPlayerNumberAndCardSetting(numPlayers: number, cardSetting: CardSetting[]) {
    var decks: Array<CardModel> = new Array();
    for (let i = 0; i < cardSetting.length; i++) {
      if (cardSetting[i].name == "Attack") {
        await this.AddCardsToDeck(decks, "Original Edition", "Main Decks", "Attack 2x", cardSetting[i].number);
      } else if (cardSetting[i].name == "See the Future") {
        await this.AddCardsToDeck(decks, "Original Edition", "Main Decks", "See the Future 3x", cardSetting[i].number);
      } else if (cardSetting[i].name == "Cat Card") {
        await this.AddCardsToDeck(decks, "Original Edition", "Main Decks", "Cat Card", cardSetting[i].number);
      } else if (cardSetting[i].name == "Defuse") {
        await this.AddCardsToDeck(decks, "Original Edition", "Main Decks", "Defuse", cardSetting[i].number);
      } else if (cardSetting[i].name == "Exploding Kitten") {
        await this.AddCardsToDeck(decks, "Original Edition", "Main Decks", "Exploding Kitten", cardSetting[i].number);
      } else if (cardSetting[i].name == "Shuffle") {
        await this.AddCardsToDeck(decks, "Original Edition", "Main Decks", "Shuffle", cardSetting[i].number);
      } else if (cardSetting[i].name == "Skip") {
        await this.AddCardsToDeck(decks, "Original Edition", "Main Decks", "Skip", cardSetting[i].number);
      } else if (cardSetting[i].name == "Targeted Attack") {
        await this.AddCardsToDeck(decks, "Imploding Kittens", "Expansions", "Targeted Attack 2x", cardSetting[i].number);
      } else if (cardSetting[i].name == "Draw From the Bottom") {
        await this.AddCardsToDeck(decks, "Imploding Kittens", "Expansions", "Draw From the Bottom", cardSetting[i].number);
      } else if (cardSetting[i].name == "Reverse") {
        await this.AddCardsToDeck(decks, "Imploding Kittens", "Expansions", "Reverse", cardSetting[i].number);
      }
    }
    return decks;
  }

  public async GetDefaultCardSetting(numPlayers: number) {
    const res: CardSetting[] = []

    // add Attack x2 cards
    var attacks = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "Attack 2x"
    );

    res.push({ name: "Attack", number: attacks.length })

    var targetedAttack = await CardRepo.getBySetSheetMechanic(
      "Imploding Kittens",
      "Expansions",
      "Targeted Attack 2x"
    );
    res.push({ name: "Targeted Attack", number: targetedAttack.length })

    // add Cat Card cards
    var catCards = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "Cat Card"
    );
    res.push({ name: "Cat Card", number: catCards.length })

    res.push({ name: "Defuse", number: numPlayers * 2 })

    // add Exploding Kitten cards
    var explodingKittens = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "Exploding Kitten"
    );
    res.push({ name: "Exploding Kitten", number: Math.max(numPlayers, explodingKittens.length) })

    // add See the Future 3x cards
    var SeetheFutures = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "See the Future 3x"
    );
    res.push({ name: "See the Future", number: SeetheFutures.length })

    // add Shuffle cards
    var Shuffles = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "Shuffle"
    );
    res.push({ name: "Shuffle", number: Shuffles.length })

    // add Skip cards
    var Skips = await CardRepo.getBySetSheetMechanic(
      "Original Edition",
      "Main Decks",
      "Skip"
    );
    res.push({ name: "Skip", number: Skips.length })

    var DrawFromBottoms = await CardRepo.getBySetSheetMechanic(
      "Imploding Kittens",
      "Expansions",
      "Draw From the Bottom"
    );
    res.push({ name: "Draw From the Bottom", number: DrawFromBottoms.length })

    var Reverses = await CardRepo.getBySetSheetMechanic(
      "Imploding Kittens",
      "Expansions",
      "Reverse"
    );
    res.push({ name: "Reverse", number: Reverses.length })

    return res;
  }

}

export default new Card();
