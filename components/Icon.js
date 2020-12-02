import {
  faStoreSlash as StoreS,
  faStore as Store,
  faBan as Ban,
  faEdit as Edit,
  faTrash as Trash,
  faIdCard as Card,
  faMapMarkedAlt as Map,
  faTasks as Tasks
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const library = {
  StoreS,
  Store,
  Ban,
  Edit,
  Trash,
  Card,
  Map,
  Tasks
};
export default function Icon({ name, color }) {
  return (
    <>
      <FontAwesomeIcon
        icon={library[name]}
        style={{ color: color, margin: "0 .5rem" }}
      />
    </>
  );
}
