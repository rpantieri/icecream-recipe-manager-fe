export class IngredientDTO {
    public id: number = NaN;
    public name: string = '';
    public fats: number = 0;
    public sugars: number = 0;
    public otherSolids: number = 0;
    public sml: number = 0;
    public cost: number = 0;
    public pac: number = 0;
    public pod: number = 0;
    public totSolids: number = 0;
    public water: number = 0;

    constructor() { }

    static copyFromProxy(i:IngredientDTO): IngredientDTO{
        let a:IngredientDTO = new IngredientDTO();
        a.id = i.id;
        a.name = i.name;
        a.fats = i.fats;
        a.sugars = i.sugars;
        a.otherSolids = i.otherSolids;
        a.sml = i.sml;
        a.cost = i.cost;
        a.pac = i.pac;
        a.pod = i.pod;
        a.initValues();
        return a;
    }

    initValues() {
        this.totSolids = this.sugars + this.fats + this.sml + this.otherSolids;
        this.water = Number((100 - this.totSolids).toFixed(2));
    }
}