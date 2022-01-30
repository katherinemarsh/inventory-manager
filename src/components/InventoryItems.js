import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useReducer, useState } from "react";

// import the mutation and query
import { createInventoryItem as CreateInventoryItem } from "../graphql/mutations";
import { listInventoryItems as ListInventoryItems } from "../graphql/queries";
import { onCreateInventoryItem as OnCreateInventoryItem } from "../graphql/subscriptions";

const CLIENT_ID = uuid();

const initialState = {
  name: "",
  startingQuantity: "",
  primaryGrade: "",
  secondaryGrade: "",
  inventoryItems: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_INVENTORY_ITEMS":
      return { ...state, inventoryItems: action.inventoryItems };
    case "SET_INPUT":
      return { ...state, [action.key]: action.value };
    case "CLEAR_INPUT":
      return { ...initialState, inventoryItems: state.inventoryItems };
    case "ADD_INVENTORY_ITEM":
      return {
        ...state,
        inventoryItems: [...state.inventoryItems, action.inventoryItem],
      };
    default:
      return state;
  }
}

function InventoryItems() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getData();
    const subscription = API.graphql(
      graphqlOperation(OnCreateInventoryItem)
    ).subscribe({
      next: (eventData) => {
        const inventoryItem = eventData.value.data.OnCreateInventoryItem;
        if (inventoryItem.clientId === CLIENT_ID) return;
        dispatch({ type: "ADD_INVENTORY_ITEM", inventoryItem });
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  async function getData() {
    try {
      const inventoryItemData = await API.graphql(
        graphqlOperation(ListInventoryItems)
      );
      console.log("data from API: ", inventoryItemData);
      dispatch({
        type: "SET_INVENTORY_ITEMS",
        talks: inventoryItemData.data.listInventoryItems.items,
      });
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  async function createInventoryItem() {
    const { name, startingQuantity, primaryGrade, secondaryGrade } = state;
    if (
      name === "" ||
      startingQuantity === "" ||
      primaryGrade === "" ||
      secondaryGrade === ""
    )
      return;

    const inventoryItem = {
      name,
      startingQuantity,
      primaryGrade,
      secondaryGrade,
    };
    const inventoryItems = [...state.inventoryItems, inventoryItem];
    dispatch({ type: "SET_INVENTORY_ITEMS", inventoryItems });
    dispatch({ type: "CLEAR_INPUT" });

    try {
      await API.graphql(
        graphqlOperation(CreateInventoryItem, { input: inventoryItem })
      );
      console.log("item created!");
    } catch (err) {
      console.log("error creating talk...", err);
    }
  }

  // change state then user types into input
  function onChange(e) {
    dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
  }

  // add UI with event handlers to manage user input
  return (
    <div>
      <div className="bg-neutralSecondary p-4 pb-6 flex flex-wrap items-end">
        <div className="w-full md:w-1/3 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-item-name"
          >
            Item Name
          </label>
          <input
            className="block w-full appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-item-name"
            type="text"
            placeholder="Ex. Chocolate Tubs"
            value={state.name}
            onChange={onChange}
          />
        </div>
        <div className="w-full sm:w-1/3 md:w-1/4 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-starting-inventory"
          >
            Starting Quantity
          </label>
          <input
            className="block w-full appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-starting-inventory"
            type="text"
            placeholder="Ex. 0"
            value={state.startingQuantity}
            onChange={onChange}
          />
        </div>
        <div className="w-full sm:w-1/3 md:w-1/5 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-interval-1"
          >
            1st Magnitude
          </label>
          <input
            className="block w-full appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-interval-1"
            type="text"
            placeholder="Ex. 1"
            value={state.primaryGrade}
            onChange={onChange}
          />
        </div>
        <div className="w-full sm:w-1/3 md:w-1/5 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-interval-2"
          >
            2nd Magnitude
          </label>
          <input
            className="block w-full appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-interval-2"
            type="text"
            placeholder="Ex. 5"
            value={state.secondaryGrade}
            onChange={onChange}
          />
        </div>
      </div>
      <div
        onClick={createInventoryItem}
        className="cursor-pointer absolute left-1/2 transform text-3xl -translate-y-1/2 -translate-x-1/2"
      >
        <FontAwesomeIcon
          icon={faPlusCircle}
          className="text-secondary rounded-full bg-neutralPrimary"
        />
      </div>
      {state.inventoryItems.map((item, index) => (
        <div
          key={index}
          className="bg-neutralSecondary p-4 pb-6 mt-4 flex flex-wrap items-end"
        >
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-item-name"
            >
              Item Name
            </label>
            <input
              className="block w-full appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-item-name"
              type="text"
              placeholder="Ex. Chocolate Tubs"
              value={item.name}
            />
          </div>
          <div className="w-full sm:w-1/3 md:w-1/4 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-starting-inventory"
            >
              Starting Quantity
            </label>
            <input
              className="block w-full appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-starting-inventory"
              type="text"
              placeholder="Ex. 0"
              value={item.startingQuantity}
            />
          </div>
          <div className="w-full sm:w-1/3 md:w-1/5 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-interval-1"
            >
              1st Magnitude
            </label>
            <input
              className="block w-full appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-interval-1"
              type="text"
              placeholder="Ex. 1"
              value={item.primaryGrade}
            />
          </div>
          <div className="w-full sm:w-1/3 md:w-1/5 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-interval-2"
            >
              2nd Magnitude
            </label>
            <input
              className="block w-full appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-interval-2"
              type="text"
              placeholder="Ex. 5"
              value={item.secondaryGrade}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default InventoryItems;
