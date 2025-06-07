export class Avatar {
  public eyebrows: number;
  public eyes: number;
  public hasGlasses: boolean;
  public glasses: number;
  public mouth: number;
}

export interface ICharacter {
  id: number;
  user_id: string;
  lastName: string;
  firstName: string;
  isAdmin: boolean;
  avatar: number[];
}

export class Character {
  public id: number;
  public lastName: string;
  public firstName: string;
  public isAdmin: boolean;
  public avatar: Avatar;
}

export const getAvatarURL = (avatar: Avatar) => {
  let result = 'https://api.dicebear.com/9.x/adventurer-neutral/svg?backgroundColor[]&';
  const attributes = [];
  attributes.push('eyebrows=variant' + (avatar.eyebrows > 9 ? avatar.eyebrows : '0' + avatar.eyebrows));
  attributes.push('eyes=variant' + (avatar.eyes > 9 ? avatar.eyes : '0' + avatar.eyes));
  attributes.push('glassesProbability=' + (avatar.hasGlasses ? 100 : 0));
  attributes.push('glasses=variant' + (avatar.glasses > 9 ? avatar.glasses : '0' + avatar.glasses));
  attributes.push('mouth=variant' + (avatar.mouth > 9 ? avatar.mouth : '0' + avatar.mouth));
  attributes.forEach((attribute, index) => {
    if (index > 0) result += '&';
    result += attribute;
  });
  return result;
};

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
