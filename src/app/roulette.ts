export class Roulette {

    symboles:string[];

    constructor(symboles:string[]){
        this.symboles=symboles;
    }

    get(index:number):string{
        return this.symboles[index%(this.symboles.length)]
    }
}