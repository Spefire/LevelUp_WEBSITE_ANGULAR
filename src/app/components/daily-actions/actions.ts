export interface Action {
  name: string;
  description: string;
  xpRewards: {
    force?: number;
    habilete?: number;
    tenacite?: number;
    charisme?: number;
    intelligence?: number;
  };
}

export const listActions: Action[] = [
  {
    name: 'Musculation',
    description: 'Faire une séance de musculation',
    xpRewards: {
      force: 10,
      tenacite: 5,
    },
  },
  {
    name: 'Yoga',
    description: 'Pratiquer le yoga',
    xpRewards: {
      habilete: 10,
      intelligence: 5,
    },
  },
  {
    name: 'Course à pied',
    description: 'Faire une course',
    xpRewards: {
      tenacite: 10,
      force: 5,
    },
  },
  {
    name: 'Hygiène personnelle',
    description: 'Prendre soin de son hygiène',
    xpRewards: {
      charisme: 10,
      tenacite: 5,
    },
  },
  {
    name: 'Méditation',
    description: 'Pratiquer la méditation',
    xpRewards: {
      intelligence: 10,
      habilete: 5,
    },
  },
];
