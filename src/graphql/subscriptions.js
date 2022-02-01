/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateInventory = /* GraphQL */ `
  subscription OnCreateInventory($owner: String) {
    onCreateInventory(owner: $owner) {
      id
      name
      itemList {
        items {
          id
          clientId
          name
          quantity
          primaryGrade
          secondaryGrade
          createdAt
          updatedAt
          inventoryItemListId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateInventory = /* GraphQL */ `
  subscription OnUpdateInventory($owner: String) {
    onUpdateInventory(owner: $owner) {
      id
      name
      itemList {
        items {
          id
          clientId
          name
          quantity
          primaryGrade
          secondaryGrade
          createdAt
          updatedAt
          inventoryItemListId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteInventory = /* GraphQL */ `
  subscription OnDeleteInventory($owner: String) {
    onDeleteInventory(owner: $owner) {
      id
      name
      itemList {
        items {
          id
          clientId
          name
          quantity
          primaryGrade
          secondaryGrade
          createdAt
          updatedAt
          inventoryItemListId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateInventoryItem = /* GraphQL */ `
  subscription OnCreateInventoryItem($owner: String) {
    onCreateInventoryItem(owner: $owner) {
      id
      clientId
      inventory {
        id
        name
        itemList {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      name
      quantity
      primaryGrade
      secondaryGrade
      createdAt
      updatedAt
      inventoryItemListId
      owner
    }
  }
`;
export const onUpdateInventoryItem = /* GraphQL */ `
  subscription OnUpdateInventoryItem($owner: String) {
    onUpdateInventoryItem(owner: $owner) {
      id
      clientId
      inventory {
        id
        name
        itemList {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      name
      quantity
      primaryGrade
      secondaryGrade
      createdAt
      updatedAt
      inventoryItemListId
      owner
    }
  }
`;
export const onDeleteInventoryItem = /* GraphQL */ `
  subscription OnDeleteInventoryItem($owner: String) {
    onDeleteInventoryItem(owner: $owner) {
      id
      clientId
      inventory {
        id
        name
        itemList {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      name
      quantity
      primaryGrade
      secondaryGrade
      createdAt
      updatedAt
      inventoryItemListId
      owner
    }
  }
`;
