/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getInventory = /* GraphQL */ `
  query GetInventory($id: ID!) {
    getInventory(id: $id) {
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
export const listInventories = /* GraphQL */ `
  query ListInventories(
    $filter: ModelInventoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInventories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        itemList {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getInventoryItem = /* GraphQL */ `
  query GetInventoryItem($id: ID!) {
    getInventoryItem(id: $id) {
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
export const listInventoryItems = /* GraphQL */ `
  query ListInventoryItems(
    $filter: ModelInventoryItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInventoryItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        inventory {
          id
          name
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
      nextToken
    }
  }
`;
