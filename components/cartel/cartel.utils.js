import { ITEM_TYPE } from '@/utils/constants'

export const PRINT_TYPES = [
  {
    name: 'carte',
    long_short_description: 200,
    long_description_fr: 150,
    types: [
      ITEM_TYPE.accessory,
      ITEM_TYPE.obj,
      ITEM_TYPE.machine,
      ITEM_TYPE.soft,
      ITEM_TYPE.game,
    ],
  },
  {
    name: 'cartel',
    long_description_fr: 600,
    long_description_en: 600,
    types: [ITEM_TYPE.machine],
  },
  {
    name: 'A3 paysage',
    long_description_fr: 1000,
    long_description_en: 1000,
    types: [ITEM_TYPE.game],
  },
  {
    name: 'A3 QR',
    long_description_fr: 1000,
    long_description_en: 1000,
    types: [ITEM_TYPE.game],
  },
  {
    name: 'emplacements',
    types: [
      ITEM_TYPE.accessory,
      ITEM_TYPE.obj,
      ITEM_TYPE.machine,
      ITEM_TYPE.soft,
      ITEM_TYPE.game,
    ],
  },
]

export const COMPANIES_PER_TYPE = {
  obj: ['machine', 'manufacturer'],
  accessory: ['machine', 'manufacturer'],
  machine: ['machine', 'manufacturer'],
  soft: ['machine', 'publisher', 'developer'],
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
