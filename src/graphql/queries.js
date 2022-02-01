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
        owner
      }
      nextToken
    }
  }
`;
export const getInventoryItem = /* GraphQL */ `
  query GetInventoryItem($id: ID!) {
    getInventoryItem(id: $id) {
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
export const listInventoryItems = /* GraphQL */ `
  query ListInventoryItems(
    $filter: ModelInventoryItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInventoryItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clientId
        inventory {
          id
          name
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
      nextToken
    }
  }
`;
