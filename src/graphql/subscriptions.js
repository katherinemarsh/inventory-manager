/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateInventory = /* GraphQL */ `
  subscription OnCreateInventory {
    onCreateInventory {
      id
      name
      itemList {
        items {
          id
          name
          primaryGrade
          secondaryGrade
          createdAt
          updatedAt
          inventoryItemListId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInventory = /* GraphQL */ `
  subscription OnUpdateInventory {
    onUpdateInventory {
      id
      name
      itemList {
        items {
          id
          name
          primaryGrade
          secondaryGrade
          createdAt
          updatedAt
          inventoryItemListId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInventory = /* GraphQL */ `
  subscription OnDeleteInventory {
    onDeleteInventory {
      id
      name
      itemList {
        items {
          id
          name
          primaryGrade
          secondaryGrade
          createdAt
          updatedAt
          inventoryItemListId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateInventoryItem = /* GraphQL */ `
  subscription OnCreateInventoryItem {
    onCreateInventoryItem {
      id
      inventory {
        id
        name
        itemList {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      primaryGrade
      secondaryGrade
      createdAt
      updatedAt
      inventoryItemListId
    }
  }
`;
export const onUpdateInventoryItem = /* GraphQL */ `
  subscription OnUpdateInventoryItem {
    onUpdateInventoryItem {
      id
      inventory {
        id
        name
        itemList {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      primaryGrade
      secondaryGrade
      createdAt
      updatedAt
      inventoryItemListId
    }
  }
`;
export const onDeleteInventoryItem = /* GraphQL */ `
  subscription OnDeleteInventoryItem {
    onDeleteInventoryItem {
      id
      inventory {
        id
        name
        itemList {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      primaryGrade
      secondaryGrade
      createdAt
      updatedAt
      inventoryItemListId
    }
  }
`;
