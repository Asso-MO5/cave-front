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
  "getGifts_packs": {
    "path": "/gifts_packs",
    "description": "Récupère la liste des packs de gifts",
    "roles": [
      "GSM"
    ],
    "method": "get"
  },
  "postGifts_packs": {
    "path": "/gifts_packs",
    "description": "Permet de créer un pack de gifts",
    "roles": [
      "GSM"
    ],
    "method": "post"
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
  "postAuthRestricted": {
    "path": "/auth/restricted",
    "description": "Permet de vérifier si l'utilisateur est authentifié",
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
  "deleteGifts_packsId": {
    "path": "/gifts_packs/{id}",
    "description": "Supprime un pack de gifts",
    "roles": [
      "GSM"
    ],
    "method": "delete"
  },
  "deleteItemsId": {
    "path": "/items/{id}",
    "description": "Permet de supprimer un item",
    "roles": [
      "reviewer"
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