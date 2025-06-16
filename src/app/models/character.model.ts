export class Avatar {
  public back: number;
  public body: number;
  public emotion: number;
  public eyes: number;
  public items: number;
  public mouth: number;
  public outfits: number;

  constructor() {
    this.back = 1;
    this.body = 1;
    this.emotion = 1;
    this.eyes = 1;
    this.items = 1;
    this.mouth = 1;
    this.outfits = 1;
  }
}

export interface ICharacter {
  id: number;
  user_id: string;
  lastName: string;
  firstName: string;
  isAdmin: boolean;
  back: number;
  body: number;
  emotion: number;
  eyes: number;
  items: number;
  mouth: number;
  outfits: number;
}

export class Character {
  public id: number;
  public lastName: string;
  public firstName: string;
  public isAdmin: boolean;
  public avatar: Avatar;

  constructor() {
    this.id = 0;
    this.lastName = Adjectives[Math.floor(Math.random() * Adjectives.length)];
    this.firstName = Nouns[Math.floor(Math.random() * Nouns.length)];
    this.isAdmin = false;
    this.avatar = new Avatar();
  }

  public static getICharacter(user_id: string, character: Character) {
    const item: ICharacter = {
      id: character.id,
      user_id,
      lastName: character.lastName,
      firstName: character.firstName,
      isAdmin: character.isAdmin,
      back: character.avatar.back,
      body: character.avatar.body,
      emotion: character.avatar.emotion,
      eyes: character.avatar.eyes,
      items: character.avatar.items,
      mouth: character.avatar.mouth,
      outfits: character.avatar.outfits,
    };
    return item;
  }

  public static getCharacter(result: ICharacter) {
    const avatar: Avatar = {
      back: result.back,
      body: result.body,
      emotion: result.emotion,
      eyes: result.eyes,
      items: result.items,
      mouth: result.mouth,
      outfits: result.outfits,
    };
    const character: Character = {
      id: result.id,
      lastName: result.lastName,
      firstName: result.firstName,
      isAdmin: result.isAdmin,
      avatar: avatar,
    };
    return character;
  }
}

export const Adjectives = [
  'Sombre',
  'Noble',
  'Vaillant',
  'Svelte',
  'Fier',
  'Sage',
  'Rusé',
  'Vif',
  'Ténébreux',
  'Brillant',
  'Intrépide',
  'Calme',
  'Ancien',
  'Hurlant',
  'Brumeux',
  'Rieur',
  'Tempétueux',
  'Loyal',
  'Ombre',
  'Hardy',
  'Gracieux',
  'Mystique',
  'Alerte',
  'Silencieux',
  'Éclatant',
  'Droit',
  'Féerique',
  'Brûlant',
  'Insaisissable',
  'Nébuleux',
  'Franc',
  'Bondissant',
  'Glorieux',
  'Vénérable',
  'Agile',
  'Habile',
  'Majestueux',
  'Bouillant',
  'Pur',
  'Serein',
  'Tranchant',
  'Profond',
  'Doux',
  'Ardent',
  'Velu',
  'Poétique',
  'Étoilé',
  'Héroïque',
  'Frémissant',
  'Captivant',
  'Mystérieux',
  'Étincelant',
  'Flottant',
  'Indomptable',
  'Hésitant',
  'Calme',
  'Lourd',
  'Enchanteur',
  'Hâtif',
  'Délicat',
  'Pointu',
  'Téméraire',
  'Super',
].sort((a, b) => a.localeCompare(b));

export const Nouns = [
  'Lame',
  'Flamme',
  'Aigle',
  'Loup',
  'Chêne',
  'Hibou',
  'Renard',
  'Corbeau',
  'Vipère',
  'Faucon',
  'Écarlate',
  'Serpent',
  'Lézard',
  'Cristal',
  'Chardon',
  'Rivière',
  'Saphir',
  'Roc',
  'Sentier',
  'Sylphe',
  'Griffon',
  'Corail',
  'Cerf',
  'Chasseur',
  'Moineau',
  'Pic',
  'Lys',
  'Lutin',
  'Écureuil',
  'Colombe',
  'Cygne',
  'Rune',
  'Lierre',
  'Dahu',
  'Épine',
  'Galet',
  'Grimoire',
  'Flocon',
  'Flambeau',
  'Nectar',
  'Silex',
  'Lueur',
  'Faon',
  'Ramure',
  'Lièvre',
  'Trèfle',
  'Statuette',
  'Chimère',
  'Parchemin',
  'Boussole',
  'Sapin',
  'Lanterne',
  'Voile',
  'Mistral',
  'Sanglier',
  'Oursin',
  'Goupil',
  'Brise',
  'Archet',
  'Pin',
  'Marbre',
  'Zéphyr',
  'Glycine',
  'Souffle',
  'Abîme',
  'Vent',
  'Phénix',
  'Grizzli',
  'Kobold',
  'Golem',
  'Minotaure',
  'Brume',
  'Écu',
  'Marteau',
  'Serpe',
  'Nénuphar',
  'Sylvain',
  'Oracle',
].sort((a, b) => a.localeCompare(b));
