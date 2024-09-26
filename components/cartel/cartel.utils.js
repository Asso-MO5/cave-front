export const PRINT_TYPES = [
  {
    name: 'carte',
    long_short_description: 200,
  },
  {
    name: 'cartel machine',
    long_short_description: 200,
    long_description_fr: 600,
    long_description_en: 600,
  },
  {
    name: 'rollup',
    long_short_description: 200,
    long_description_fr: 600,
    long_description_en: 600,
  },
]

export const PRINT_TYPES_GAME = [
  {
    name: 'carte',
    long_short_description: 100,
  },
  {
    name: 'cartel machine',
    short_description: 200,
    long_description_fr: 1000,
    long_description_en: 1000,
  },
  {
    name: 'rollup',
    long_short_description: 200,
    long_description_fr: 1000,
    long_description_en: 1000,
  },
]

export const COMPANIES_PER_TYPE = {
  obj: ['manufacturer'],
  accessory: ['manufacturer'],
  machine: ['manufacturer'],
  soft: ['publisher', 'developer'],
  game: ['machine', 'publisher', 'developer'],
}

export const TXT_VARS = {
  var_place: 'Emplacement',
  var_origin: 'Provenance',
  var_price: 'Prix',
  var_release_fr: 'Date de sortie',
  var_release_eu: 'Date de sortie EUR',
  var_release_jap: 'Date de sortie JAP',
  var_release_us: 'Date de sortie USA',
}

export const TXT_LONGS = [
  {
    label: 'Description courte',
    key: 'long_short_description',
  },
  {
    label: 'Description FR',
    key: 'long_description_fr',
  },
  {
    label: 'Description EN',
    key: 'long_description_en',
  },
]
