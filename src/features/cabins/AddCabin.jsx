import Button from "../../ui/Button.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";

import Modal from "../../ui/Modal.jsx";
import CabinTable from "./CabinTable.jsx";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens={"cabin-form"}>
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name={"cabin-form"}>
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens={"table"}>
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name={"table"}>
        <CabinTable/>
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal(true)}>Add new cabin</Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm closeForm={() => setIsOpenModal(false)}  />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
