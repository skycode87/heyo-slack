import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import ActionBar from "../../shared/components/ActionBar";
import MasterTable from "../components/MastersTable";
import SearchMastersForm from "../components/SearchMastersForm";
import useMaster from "../hooks/useMaster";
import BaseModal from "../../shared/components/Modal";
import ManageMasterModal from "../components/ManageMasterModal";
import AddMasterButton from "../components/AddMasterButton";
import MastersHeader from "../components/MastersHeader";
import Breadcrumb from "../components/Breadcrumb";
import { getMaster, archivedMaster, activeMaster } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { setMasterRedux, setMasterFatherRedux } from "../../../redux/master";
import useModal from "../../shared/hooks/useModal";

const Masters = () => {
  const dispatch = useDispatch();
  const masterStoreRedux = useSelector((store) => store.master);

  const { masters, filters, setFilters, pagination, setPagination, loading, refetch } = useMaster();

  const commonProps = { filters, setFilters };
  const [page, setPage] = useState("all");
  const [selectedMaster, setSelectedMaster] = useState({});
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenActiveModal, openActiveModal, closeActiveModal] = useModal();

  const [reset, setReset] = useState(0);

  const [masterId, setMasterId] = useState(null);
  const [isOpenManageMastersModal, openManageMastersModal, closeManageMastersModal] = useModal();

  const resetValues = {
    name: "",
    value: "",
    description: "",
    fatherId: "",
  };

  const [initialValues, setInitialValues] = useState(resetValues);

  const handleAdd = (data) => {
    setInitialValues({ ...initialValues, fatherId: data._id });
    setReset(Math.floor(Math.random() * 11));
    openManageMastersModal();
  };

  const handleEdit = (master) => {
    setSelectedMaster(master);
    setMasterId(master._id);
    setReset(Math.floor(Math.random() * 11));
    openManageMastersModal();
  };

  const handleArchivedConfirm = (master) => {
    archivedMaster(
      {
        master,
      },
      {
        onSuccess: (response) => {
          refetch();
          showGlobalNotification("success", "En Horabuena", "El registro ha sido eliminado");
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
        onFinally: () => closeDeleteModal(),
      }
    );
  };

  const handleArchived = (master) => {
    setMasterId(master._id);
    confirmAlert({
      title: `Eliminar ${master.name}`,
      message: `Esta seguro que desea eliminar el setting de ${master.name}?`,
      buttons: [
        {
          label: "SI",
          onClick: () => handleArchivedConfirm(master),
        },
        {
          label: "NO",
          onClick: () => {},
        },
      ],
    });
  };

  const handleActiveConfirm = (master) => {
    // setSelectedMaster(master);
    activeMaster(
      {
        master,
      },
      {
        onSuccess: (response) => {
          refetch();
          showGlobalNotification("success", "En Horabuena", "El registro ha sido actualizado");
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
        onFinally: () => closeDeleteModal(),
      }
    );
  };

  const handleActive = (master) => {
    setMasterId(master._id);
    confirmAlert({
      title: master.active ? "Desactivar el Setting" : "Activar el Setting",
      message: "Esta seguro que desea continuar?",
      buttons: [
        {
          label: "SI",
          onClick: () => handleActiveConfirm(master),
        },
        {
          label: "NO",
          onClick: () => {},
        },
      ],
    });
  };

  const handleDetails = (master) => {
    setFilters({ ...filters, fatherId: master._id });
    setSelectedMaster(master);
    setMasterFatherRedux(master)(dispatch);
    refetch();
  };

  const handleGoBack = () => {
    setFilters({ ...filters, fatherId: "", ...resetValues });
    setSelectedMaster(resetValues);
    setMasterFatherRedux(resetValues)(dispatch);
    refetch();
  };

  return (
    <>
      {page === "all" && (
        <div>
          <Breadcrumb goto={handleGoBack} />
          <MastersHeader
            selectedMaster={selectedMaster}
            primaryAction={
              <AddMasterButton refetch={refetch} initialValues={initialValues} selectedMaster={selectedMaster} />
            }
            handleGoBack={handleGoBack}
          />
          <ActionBar {...commonProps}>
            <SearchMastersForm {...commonProps} refetch={refetch} />
          </ActionBar>
          <MasterTable
            {...commonProps}
            masters={masters}
            pagination={pagination}
            setPagination={setPagination}
            loading={loading}
            refetch={refetch}
            initialValues={initialValues}
            setPage={setPage}
            setSelectedMaster={setSelectedMaster}
            selectedMaster={selectedMaster}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            handleArchived={handleArchived}
            openDeleteModal={openDeleteModal}
            details={handleDetails}
            handleAdd={handleAdd}
            handleActive={handleActive}
          />
        </div>
      )}
      <BaseModal
        isOpenModal={isOpenDeleteModal}
        closeModal={closeDeleteModal}
        onConfirm={handleArchivedConfirm}
        onCancel={closeDeleteModal}
        isAlert="true"
        title="Desea eliminar este Setting?"
        confirmText="Si"
        cancelText="No"
        footer
      >
        <p>Setting: {selectedMaster.name}</p>
      </BaseModal>
      <ManageMasterModal
        refetch={refetch}
        masterId={masterId}
        setMasterId={setMasterId}
        closeModal={closeManageMastersModal}
        openModal={isOpenManageMastersModal}
        initialValues={initialValues}
        masters={masters}
        selectedMasterMain={selectedMaster}
        setSelectedMasterMain={setSelectedMaster}
        setMasterRedux={setMasterRedux}
        getMaster={getMaster}
        masterStoreRedux={masterStoreRedux}
        reset={reset}
      />
    </>
  );
};

export default Masters;
