import { API, graphqlOperation } from "aws-amplify";
import { listInventories as ListInventories } from "../graphql/queries";
import { useEffect, useState } from "react";
import { createInventory as CreateInventory } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

function InventoryList() {
  const [inventories, updateInventories] = useState([]);
  const [name, setInventoryName] = useState("");

  useEffect(() => {
    getInventories();
  }, []);

  async function getInventories() {
    try {
      const inventoryData = await API.graphql(
        graphqlOperation(ListInventories)
      );
      console.log("inventoryData:", inventoryData);
      updateTalks(inventoryData.data.ListInventories.items);
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
      console.log(createInventoryData.data);
      console.log("inventory created!");
      const navigate = useNavigate();
      useCallback(
        () => navigate(`/inventory/${inventory.id}`, { replace: true }),
        [navigate]
      );
    } catch (err) {
      console.log("error creating inventory...", err);
    }
  }
  return (
    <div>
      {inventories.map((inventory, index) => (
        <div key={index}>
          <Link to={`/inventory/${inventory.id}`}>{inventory.name}</Link>
        </div>
      ))}
      <div>
        <h3> Enter New Inventory Name </h3>
        <form onSubmit={createInventory}>
          <input
            className="block w-full appearance-none bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="<Inventory Name>"
            value={name}
            onChange={(e) => setInventoryName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default InventoryList;
