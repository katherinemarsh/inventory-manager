import { API, graphqlOperation } from "aws-amplify";
import { listInventories as ListInventories } from "../graphql/queries";
import { useEffect, useState } from "react";
import { createInventory as CreateInventory } from "../graphql/mutations";
import { useHistory, Link } from "react-router-dom";

function InventoryList() {
  const [inventories, updateInventories] = useState([]);
  const [name, setInventoryName] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getInventories();
  }, []);

  async function getInventories() {
    try {
      const inventoryData = await API.graphql(
        graphqlOperation(ListInventories)
      );
      console.log("inventoryData:", inventoryData);
      updateInventories(inventoryData.data.listInventories.items);
    } catch (err) {
      console.log("error fetching inventories...", err);
    }
  }

  async function createInventory(e) {
    e.preventDefault();
    if (name === "") return;

    const inventory = {
      name,
    };

    try {
      const createInventoryData = await API.graphql({
        query: CreateInventory,
        variables: { input: inventory },
      });
      history.push(`/inventory/${createInventoryData.data.id}`);
      console.log("inventory created!");
    } catch (err) {
      console.log("error creating inventory...", err);
    }
  }

  const handleAddNewInventory = () => {
    setShowNewModal(true);
  };

  return (
    <div className="p-4">
      {inventories.length > 0 ? (
        <h1 className="font-bold">Inventories</h1>
      ) : (
        <div>No Inventories Available</div>
      )}
      {inventories.map((inventory, index) => (
        <div key={index}>
          <Link to={`/inventory/${inventory.id}`}>{inventory.name}</Link>
        </div>
      ))}
      {showNewModal ? (
        <form
          onSubmit={createInventory}
          className="bg-neutralSecondary p-4 m-4 ml-0"
        >
          <input
            className="block w-full appearance-none border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="New Inventory Name"
            value={name}
            onChange={(e) => setInventoryName(e.target.value)}
          />
          <button
            className="mx-auto mt-4 text-center font-bold bg-secondary text-neutralPrimary rounded-full py-3 px-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      ) : (
        <button
          onClick={handleAddNewInventory}
          className="mx-auto mt-4 text-center font-bold bg-secondary text-neutralPrimary rounded-full py-3 px-4"
        >
          Add New Inventory
        </button>
      )}
    </div>
  );
}

export default InventoryList;
