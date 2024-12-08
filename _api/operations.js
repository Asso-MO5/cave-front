export const operations = {
  "getCompanies": {
    "path": "/companies",
    "description": "Récupère la liste des entreprises",
    "roles": [
      "Membres MO5"
    ],
    "method": "get"
  },
  "putCompanies": {
    "path": "/companies",
    "description": "Met à jour une entreprise",
    "roles": [
      "Master Control Program"
    ],
    "method": "put"
  },
  "getItems": {
    "path": "/items",
    "description": "Récupère la liste des items par type et recherche",
    "roles": [
      "Membres MO5"
    ],
    "method": "get"
  },
  "postItems": {
    "path": "/items",
    "description": "Permet de créer un item",
    "roles": [
      "publisher",
      "reviewer"
    ],
    "method": "post"
  },
  "getLoots": {
    "path": "/loots",
    "description": "Récupère la liste des loots",
    "roles": [
      "Membres MO5"
    ],
    "method": "get"
  },
  "postLoots": {
    "path": "/loots",
    "description": "Permet de créer un loot",
    "roles": [
      "publisher",
      "Master Control Program"
    ],
    "method": "post"
  },
  "getCompaniesId": {
    "path": "/companies/{id}",
    "description": "Récupère une entreprise",
    "roles": [
      "Membres MO5"
    ],
    "method": "get"
  },
  "getItemId": {
    "path": "/item/{id}",
    "description": "Récupère un item par son id",
    "roles": [
      "Membres MO5"
    ],
    "method": "get"
  },
  "putItemId": {
    "path": "/item/{id}",
    "description": "Permet de modifier un item",
    "roles": [
      "publisher",
      "reviewer"
    ],
    "method": "put"
  },
  "getItemsPublic": {
    "path": "/items/public",
    "description": "Récupère la liste des items par type et recherche",
    "method": "get"
  },
  "getMediasLight": {
    "path": "/medias/light",
    "description": "Récupère la liste des medias",
    "roles": [
      "Membres MO5"
    ],
    "method": "get"
  },
  "getMessagesRoom_id": {
    "path": "/messages/{room_id}",
    "description": "Récupère les messages d'une room",
    "roles": [
      "Membres MO5"
    ],
    "method": "get"
  },
  "postMessagesRoom_id": {
    "path": "/messages/{room_id}",
    "description": "Permet de créer un message",
    "roles": [
      "Membres MO5"
    ],
    "method": "post"
  },
  "getItemPublicId": {
    "path": "/item/public/{id}",
    "description": "Récupère un item par son id",
    "method": "get"
  },
  "getItemsIdPrintType": {
    "path": "/items/{id}/print/{type}",
    "description": "la version imprimable d un item",
    "roles": [
      "Membres MO5"
    ],
    "method": "get"
  },
  "postMedias": {
    "path": "/medias",
    "description": "Permet de créer un media",
    "roles": [
      "publisher",
      "reviewer"
    ],
    "method": "post"
  },
  "postItemsExist": {
    "path": "/items/exist",
    "description": "Vérifie si un item existe",
    "roles": [
      "publisher",
      "reviewer"
    ],
    "method": "post"
  },
  "postItemsExport": {
    "path": "/items/export",
    "description": "Permet d exporter les items",
    "roles": [
      "Membres MO5"
    ],
    "method": "post"
  },
  "postItemsImport": {
    "path": "/items/import",
    "description": "Permet d importer des items",
    "roles": [
      "publisher",
      "reviewer"
    ],
    "method": "post"
  },
  "putCompanyIdMedia": {
    "path": "/company/{id}/media",
    "description": "Permet de mettre à jour le media d une company",
    "roles": [
      "reviewer",
      "publisher"
    ],
    "method": "put"
  },
  "putItemIdMedia": {
    "path": "/item/{id}/media",
    "description": "Permet de mettre à jour le media d un item",
    "roles": [
      "reviewer",
      "publisher"
    ],
    "method": "put"
  },
  "putLootsWinId": {
    "path": "/loots/win/{id}",
    "description": "Permet de valider un loot",
    "roles": [
      "publisher",
      "Master Control Program"
    ],
    "method": "put"
  },
  "putLootsWin_publicId": {
    "path": "/loots/win_public/{id}",
    "description": "Permet de valider un loot",
    "method": "put"
  },
  "putCompanyIdStatusStatus": {
    "path": "/company/{id}/status/{status}",
    "description": "Permet de modifier le status d'une entreprise",
    "roles": [
      "publisher",
      "reviewer"
    ],
    "method": "put"
  },
  "putItemIdStatusStatus": {
    "path": "/item/{id}/status/{status}",
    "description": "Permet de modifier le status d'un item",
    "roles": [
      "publisher",
      "reviewer"
    ],
    "method": "put"
  },
  "deleteItemsId": {
    "path": "/items/{id}",
    "description": "Permet de supprimer un item",
    "roles": [
      "reviewer"
    ],
    "method": "delete"
  },
  "deleteLootsId": {
    "path": "/loots/{id}",
    "description": "Supprime un loot",
    "roles": [
      "publisher",
      "Master Control Program"
    ],
    "method": "delete"
  },
  "deleteMediasId": {
    "path": "/medias/{id}",
    "description": "Supprime un media",
    "roles": [
      "publisher",
      "reviewer"
    ],
    "method": "delete"
  },
  "deleteItemItemidMediaMediaid": {
    "path": "/item/{itemId}/media/{mediaId}",
    "description": "Permet de supprimer un media d un item",
    "roles": [
      "reviewer",
      "publisher"
    ],
    "method": "delete"
  }
}