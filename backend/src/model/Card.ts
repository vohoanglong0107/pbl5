export default class Card {
    constructor(mechanic: string, prompt: string, picture: string) {
        this.mechanic = mechanic;
        this.prompt = prompt;
        this.picture = picture;
    }

    mechanic: string;
    prompt: string;
    picture: string;
}