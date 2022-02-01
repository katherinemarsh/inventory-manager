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
export const createInventoryItem = /* GraphQL */ `
  mutation CreateInventoryItem(
    $input: CreateInventoryItemInput!
    $condition: ModelInventoryItemConditionInput
  ) {
    createInventoryItem(input: $input, condition: $condition) {
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
export const updateInventoryItem = /* GraphQL */ `
  mutation UpdateInventoryItem(
    $input: UpdateInventoryItemInput!
    $condition: ModelInventoryItemConditionInput
  ) {
    updateInventoryItem(input: $input, condition: $condition) {
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
export const deleteInventoryItem = /* GraphQL */ `
  mutation DeleteInventoryItem(
    $input: DeleteInventoryItemInput!
    $condition: ModelInventoryItemConditionInput
  ) {
    deleteInventoryItem(input: $input, condition: $condition) {
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
