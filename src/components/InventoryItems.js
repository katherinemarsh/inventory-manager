import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuid } from "uuid";

// import the mutation and query
import { createInventoryItem as CreateInventoryItem } from "../graphql/mutations";
import { getInventory as GetInventory } from "../graphql/queries";
import { onCreateInventoryItem as OnCreateInventoryItem } from "../graphql/subscriptions";

const CLIENT_ID = uuid();

const initialState = {
  inventoryName: "",
  name: "",
  quantity: "",
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
        inventoryItems: [action.inventoryItem, ...state.inventoryItems],
      };
    default:
      return state;
  }
}

function InventoryItems() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();

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
      const inventoryData = await API.graphql({
        query: GetInventory,
        variables: { id: params.id },
      });
      state.inventoryName = inventoryData.data.getInventory.name;
      dispatch({
        type: "SET_INVENTORY_ITEMS",
        inventoryItems: inventoryData.data.getInventory.itemList.items,
      });
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  async function createInventoryItem() {
    const { name, quantity, primaryGrade, secondaryGrade } = state;
    if (
      name === "" ||
      quantity === "" ||
      primaryGrade === "" ||
      secondaryGrade === ""
    )
      return;

    const inventoryItem = {
      clientId: CLIENT_ID,
      inventoryItemListId: params.id,
      name: name,
      quantity: parseFloat(quantity),
      primaryGrade: parseFloat(primaryGrade),
      secondaryGrade: parseFloat(secondaryGrade),
    };
    const inventoryItems = [inventoryItem, ...state.inventoryItems];
    dispatch({ type: "SET_INVENTORY_ITEMS", inventoryItems });
    dispatch({ type: "CLEAR_INPUT" });

    try {
      await API.graphql(
        graphqlOperation(CreateInventoryItem, {
          input: inventoryItem,
        })
      );
      console.log("item created!");
    } catch (err) {
      console.log("error creating inventory item...", err);
    }
  }

  // change state then user types into input
  function onChange(e) {
    dispatch({ type: "SET_INPUT", key: e.target.name, value: e.target.value });
  }

  // add UI with event handlers to manage user input
  return (
    <div className="bg-neutralPrimary relative sm:w-3/5 w-full px-4 sm:px-10 py-6">
      <div className="font-bold mb-2">{state.inventoryName}</div>
      <div className="bg-neutralSecondary p-4 pb-6 flex flex-wrap items-end">
        <div className="w-full md:w-1/3 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-item-name"
          >
            Item Name
          </label>
          <input
            className="block w-full appearance-none border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-item-name"
            name="name"
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
            className="block w-full appearance-none border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-starting-inventory"
            name="quantity"
            type="text"
            placeholder="Ex. 0"
            value={state.quantity}
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
            className="block w-full appearance-none border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-interval-1"
            name="primaryGrade"
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
            className="block w-full appearance-none border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-interval-2"
            name="secondaryGrade"
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
              className="block w-full appearance-none border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
              className="block w-full appearance-none border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-starting-inventory"
              type="text"
              placeholder="Ex. 0"
              value={item.quantity}
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
              className="block w-full appearance-none border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
              className="block w-full appearance-none border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-interval-2"
              type="text"
              placeholder="Ex. 5"
              value={item.secondaryGrade}
            />
          </div>
        </div>
      ))}
      <div className="mx-auto mt-10 w-1/2 text-center font-bold bg-secondary text-neutralPrimary rounded-full py-3 px-4">
        Generate QR Code
      </div>
    </div>
  );
}

export default InventoryItems;
