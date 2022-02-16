import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

// import the mutation and query
import { getInventory as GetInventory } from "../graphql/queries";
import { onUpdateInventory as OnUpdateInventory } from "../graphql/subscriptions";
import { updateInventoryItem as UpdateInventoryItem } from "../graphql/mutations";

const initialState = {
  name: "",
  inventoryItems: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_INVENTORY_ITEMS":
      return { ...state, inventoryItems: action.inventoryItems };
    case "SET_INPUT":
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
}

function InventoryEdit() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();

  useEffect(() => {
    getData();
    const subscription = API.graphql(
      graphqlOperation(OnUpdateInventory)
    ).subscribe({
      next: (eventData) => {
        const inventoryData = eventData.value.data.OnUpdateInventory;
        dispatch({
          type: "SET_INVENTORY_ITEMS",
          inventoryItems: inventoryData.itemList.items,
        });
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
      console.log("data from API: ", inventoryData);
      dispatch({
        type: "SET_INVENTORY_ITEMS",
        inventoryItems: inventoryData.data.getInventory.itemList.items,
      });
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  // change state then user types into input
  function onChange(e) {
    console.log("will update the inventory item here");
  }

  function updateItemCount(index, magnitude) {
    const updatedInventoryItems = state.inventoryItems;
    updatedInventoryItems[index].quantity += magnitude;
    dispatch({
      type: "SET_INVENTORY_ITEMS",
      inventoryItems: updatedInventoryItems,
    });
  }

  return (
    <div className="bg-neutralPrimary p-4">
      {state.name}
      {state.inventoryItems.map((item, index) => (
        <div key={index} className="mb-2">
          <div className="mb-1">{item.name}</div>
          <div className="inline-flex text-textWhite items-stretch">
            <button
              onClick={() => updateItemCount(index, -item.secondaryGrade)}
              className="bg-negativeButtonSecondary p-4 rounded-l-full font-bold"
            >
              {"-" + item.secondaryGrade}
            </button>
            <button
              onClick={() => updateItemCount(index, -item.primaryGrade)}
              className="bg-negativeButtonPrimary p-4 font-bold"
            >
              {"-" + item.primaryGrade}
            </button>
            <input
              className="block text-textPrimary text-center appearance-none bg-gray-200 text-gray-700 border border-red-500 p-4 leading-tight focus:outline-none focus:bg-white"
              id="grid-item-name"
              type="text"
              placeholder=""
              value={item.quantity}
              onChange={onChange}
            />
            <button
              onClick={() => updateItemCount(index, item.primaryGrade)}
              className="bg-positiveButtonPrimary p-4 font-bold"
            >
              {"+" + item.primaryGrade}
            </button>
            <button
              onClick={() => updateItemCount(index, item.secondaryGrade)}
              className="bg-positiveButtonSecondary p-4 rounded-r-full font-bold"
            >
              {"+" + item.secondaryGrade}
            </button>
          </div>
        </div>
      ))}
      <div className="mx-auto mt-10 w-1/2 text-center font-bold bg-secondary text-neutralPrimary rounded-full py-3 px-4">
        Submit
      </div>
    </div>
  );
}

export default InventoryEdit;
