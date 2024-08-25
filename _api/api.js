export const API = {
  basePath: '/',
  info: { title: 'CAVE API Documentation', version: '1.0.0' },
  swagger: '2.0',
  host: 'localhost:3000',
  schemes: ['http'],
  tags: [],
  paths: {
    '/games': {
      get: {
        summary: 'Récupère la liste des jeux',
        operationId: 'getGames',
        description: 'Membres MO5',
        parameters: [
          {
            type: 'string',
            name: 'authorization',
            in: 'header',
            required: true,
          },
          {
            type: 'integer',
            default: 10,
            minimum: 1,
            maximum: 100000,
            name: 'limit',
            in: 'query',
          },
        ],
        tags: ['games'],
        responses: {
          200: {
            schema: { $ref: '#/definitions/Model2' },
            description: 'Successful',
          },
        },
      },
    },
    '/items': {
      get: {
        summary: 'Récupère la liste des items (jeux, machines, listes, etc.)',
        operationId: 'getItems',
        description: 'Membres MO5',
        parameters: [
          {
            type: 'string',
            name: 'authorization',
            in: 'header',
            required: true,
          },
          {
            type: 'string',
            enum: ['game', 'machine'],
            name: 'type',
            in: 'query',
            required: true,
          },
          {
            type: 'integer',
            default: 10,
            minimum: 1,
            maximum: 100000,
            name: 'limit',
            in: 'query',
          },
        ],
        tags: ['items'],
        responses: {
          200: {
            schema: {
              $ref: '#/definitions/MachineResponse',
              'x-alternatives': [
                { $ref: '#/x-alt-definitions/MachineResponse' },
                { $ref: '#/x-alt-definitions/GameResponse' },
              ],
            },
            description: 'Successful',
          },
        },
      },
    },
    '/game/{slug}': {
      get: {
        summary: 'Récupère jeu par son slug',
        operationId: 'getGameSlug',
        description: 'Membres MO5',
        parameters: [
          {
            type: 'string',
            name: 'authorization',
            in: 'header',
            required: true,
          },
        ],
        tags: ['game'],
        responses: {
          200: {
            schema: { $ref: '#/definitions/Game' },
            description: 'Successful',
          },
        },
      },
    },
    '/items/{id}/status/{status}': {
      put: {
        summary: "Permet de changer le status d'un item",
        operationId: 'putItemsIdStatusStatus',
        description: 'reviewer',
        parameters: [
          {
            type: 'string',
            name: 'authorization',
            in: 'header',
            required: true,
          },
        ],
        tags: ['items'],
        responses: {
          default: { schema: { type: 'string' }, description: 'Successful' },
        },
      },
    },
  },
  definitions: {
    Model1: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        slug: { type: 'string' },
        release_year: { type: 'integer' },
        machine_name: { type: 'string' },
      },
      required: ['name', 'slug', 'release_year', 'machine_name'],
    },
    Model2: { type: 'array', items: { $ref: '#/definitions/Model1' } },
    MachineResponse: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        slug: { type: 'string' },
        release_year: { type: 'number' },
        manufacturer: { type: 'string' },
      },
      required: ['name', 'slug', 'release_year'],
    },
    Item: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        slug: { type: 'string' },
        description: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        release_year: {
          type: 'integer',
          'x-alternatives': [{ type: 'integer' }, { type: 'string' }],
        },
        cover_id: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        cover_url: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        type: { type: 'string' },
        author_id: { type: 'string' },
        status: { type: 'string' },
        created_at: { type: 'string', format: 'date' },
        updated_at: { type: 'string', format: 'date' },
        item_ref_id: { type: 'string' },
      },
      required: [
        'id',
        'name',
        'slug',
        'type',
        'author_id',
        'status',
        'created_at',
        'updated_at',
      ],
    },
    Company: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        slug: { type: 'string' },
        country: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        description: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        borned_at: {
          type: 'integer',
          'x-alternatives': [{ type: 'integer' }, { type: 'string' }],
        },
        logo_id: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        logo_url: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        activities: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        author_id: { type: 'string' },
        relation_type: { type: 'string' },
        created_at: { type: 'string', format: 'date' },
        updated_at: { type: 'string', format: 'date' },
      },
      required: [
        'id',
        'name',
        'slug',
        'author_id',
        'relation_type',
        'created_at',
        'updated_at',
      ],
    },
    Model3: { type: 'object' },
    medias: { type: 'array', items: { $ref: '#/definitions/Model3' } },
    Game: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        slug: { type: 'string' },
        description: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        release_year: {
          type: 'integer',
          'x-alternatives': [{ type: 'integer' }, { type: 'string' }],
        },
        cover_id: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        cover_url: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        type: { type: 'string' },
        author_id: { type: 'string' },
        status: { type: 'string' },
        created_at: { type: 'string', format: 'date' },
        updated_at: { type: 'string', format: 'date' },
        ref_id: { type: 'string' },
        machine: {
          $ref: '#/definitions/Item',
          'x-alternatives': [
            { $ref: '#/x-alt-definitions/Item' },
            { type: 'string' },
          ],
        },
        developer: { $ref: '#/definitions/Company' },
        publisher: { $ref: '#/definitions/Company' },
        medias: { $ref: '#/definitions/medias' },
      },
      required: [
        'id',
        'name',
        'slug',
        'type',
        'author_id',
        'status',
        'created_at',
        'updated_at',
        'ref_id',
        'medias',
      ],
    },
  },
  'x-alt-definitions': {
    MachineResponse: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        slug: { type: 'string' },
        release_year: { type: 'number' },
        manufacturer: { type: 'string' },
      },
      required: ['name', 'slug', 'release_year'],
    },
    GameResponse: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        slug: { type: 'string' },
        release_year: { type: 'number' },
        editor: { type: 'string' },
        developer: { type: 'string' },
      },
      required: ['name', 'slug', 'release_year', 'editor', 'developer'],
    },
    Item: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        slug: { type: 'string' },
        description: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        release_year: {
          type: 'integer',
          'x-alternatives': [{ type: 'integer' }, { type: 'string' }],
        },
        cover_id: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        cover_url: {
          type: 'string',
          'x-alternatives': [{ type: 'string' }, { type: 'string' }],
        },
        type: { type: 'string' },
        author_id: { type: 'string' },
        status: { type: 'string' },
        created_at: { type: 'string', format: 'date' },
        updated_at: { type: 'string', format: 'date' },
        item_ref_id: { type: 'string' },
      },
      required: [
        'id',
        'name',
        'slug',
        'type',
        'author_id',
        'status',
        'created_at',
        'updated_at',
      ],
    },
  },
}
