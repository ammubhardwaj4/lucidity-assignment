import InventoryManagementView from "../Components/Inventory";
import { GetInventoryContainer } from "../Containers/getInventoryContainer";

export default function InventoryManagement(props) {
  return (
    <GetInventoryContainer {...props}>
      <InventoryManagementView />
    </GetInventoryContainer>
  );
}
