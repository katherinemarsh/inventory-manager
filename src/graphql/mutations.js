/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createInventory = /* GraphQL */ `
  mutation CreateInventory(
    $input: CreateInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    createInventory(input: $input, condition: $condition) {
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
export const updateInventory = /* GraphQL */ `
  mutation UpdateInventory(
    $input: UpdateInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    updateInventory(input: $input, condition: $condition) {
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
export const deleteInventory = /* GraphQL */ `
  mutation DeleteInventory(
    $input: DeleteInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    deleteInventory(input: $input, condition: $condition) {
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
export const createInventoryItem = /* GraphQL */ `
  mutation CreateInventoryItem(
    $input: CreateInventoryItemInput!
    $condition: ModelInventoryItemConditionInput
  ) {
    createInventoryItem(input: $input, condition: $condition) {
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
export const updateInventoryItem = /* GraphQL */ `
  mutation UpdateInventoryItem(
    $input: UpdateInventoryItemInput!
    $condition: ModelInventoryItemConditionInput
  ) {
    updateInventoryItem(input: $input, condition: $condition) {
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
export const deleteInventoryItem = /* GraphQL */ `
  mutation DeleteInventoryItem(
    $input: DeleteInventoryItemInput!
    $condition: ModelInventoryItemConditionInput
  ) {
    deleteInventoryItem(input: $input, condition: $condition) {
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
