import { API, graphqlOperation } from "aws-amplify";
import { ListInventories } from "../graphql/queries";
import { useEffect, useState } from "react";

function InventoryList() {
  const [inventories, updateInventories] = useState([]);

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
  return (
    <div>
      {inventories.map((inventory, index) => (
        <div key={index}>
          <h3>{inventory.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default InventoryList;
