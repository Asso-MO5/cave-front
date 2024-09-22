export const operations = {
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
  "getMediasLight": {
    "path": "/medias/light",
    "description": "Récupère la liste des medias",
    "roles": [
      "Membres MO5"
    ],
    "method": "get"
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
  "postItemsExport": {
    "path": "/items/export",
    "description": "Permet d exporter les items",
    "roles": [
      "Membres MO5"
    ],
    "method": "post"
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
      "publisher",
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
  }
}