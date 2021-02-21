import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { confirmAlert } from "react-confirm-alert";
import ActionBar from "../../shared/components/ActionBar";
import GuestsTable from "../components/guestsTable";
import SearchGuestsForm from "../components/SearchGuestsForm";
import ActionsGuests from "../components/ActionsGuest";
import BaseModal from "../../shared/components/Modal";
import ManageGuestModal from "../components/ManageGuestModal";
import DetailsTransModal from "../components/DetailsGuestModal";

import SearchAssistsForm from "../components/SearchAssistsForm";
import ManageAssistModal from "../components/ManageAssistModal";
import AssistsTable from "../components/assistTable";

import SelectModalApp from "../components/SelectModalApp";
import AddGuestButton from "../components/AddGuestButton";
import GuestHeader from "../components/guestHeader";
import GuestsHeader from "../components/guestsHeader";

// HELPERS
import showGlobalNotification from "../../../helpers/showGlobalNotification";

// REDUX
import { setGuestRedux } from "../../../redux/guest";

// REQUEST
import { archivedGuest, activeGuest, getGuest, saveAssist } from "../requests";

// HOOKS
import useAssists from "../hooks/useAssists";
import useModal from "../../shared/hooks/useModal";
import useGuests from "../hooks/useGuests";

// CONTAINERS
import AppsContainer from "../../apps/containers/Apps";
import TransContainer from "../../trans/containers/Trans";

// CONSTANTS
import { globals, numbers } from "../../../constants/globals";

const Guests = ({ isEmbed = false, userId = null, reload }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { guests, filters, setFilters, pagination, setPagination, loading, refetch } = useGuests(userId);
  const {
    assists,
    filtersAssists,
    setFiltersAssists,
    paginationAssists,
    setPaginationAssists,
    loadingAssists,
    refetchAssists,
  } = useAssists();

  const commonProps = { filters, setFilters };
  const [page, setPage] = useState(globals.PAGE_MAIN);
  const [subpage, setSubpage] = useState(numbers.ONE);
  const [selectedGuest, setSelectedGuest] = useState({});
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenInactiveModal, openInactiveModal, closeInactiveModal] = useModal();
  const [isOpenDetailsGuestModal, openDetailsGuestModal, closeDetailsGuestModal] = useModal();
  const commonPropsAssists = { filters: filtersAssists, setFilters: setFiltersAssists };
  // const [selectedGuest, setSelectedGuest] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [isOpenManageGuestsModal, openManageGuestsModal, closeManageGuestsModal] = useModal();
  const [isOpenManageAssistModal, openManageAssistModal, closeManageAssistModal] = useModal();

  const [isOpenGeneralModal, openGeneralModal, closeGeneralModal] = useModal();

  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    role: "USER",
    address: "",
    city: "Medellin",
    region: "Antioquia",
    country: "Colombia",
    document: "",
    documentType: "CEDULA",
    observation: "",
    birthdate: "1990/01/01",
    category: "cliente",
    type: "Normal",
    email: "",
    phone: "",
    reference: "",
    active: "",
    startdate: "1990/01/01",
    closuredate: "1990/01/01",
    refererId: null,
  });

  const [initialValuesAssist, setInitialValuesAssist] = useState({
    type: "suscripcion",
    observation: "",
    location: "envigado",
  });

  useEffect(() => {
    setGuestRedux(selectedGuest)(dispatch);
  }, [selectedGuest]);

  useEffect(() => {
    refetch();
  }, [reload]);

  const handleEdit = (guest) => {
    setSelectedGuest(guest);
    setGuestId(guest._id);
    openManageGuestsModal();
  };

  const handleAssist = (guest) => {
    setSelectedGuest(guest);
    setGuestId(guest._id);
    openManageAssistModal();
  };

  const handleGeneralModal = (guest) => {
    setSelectedGuest(guest);
    setGuestId(guest._id);
    openGeneralModal();
  };

  const handleEditInvitation = (guest) => {
    setSelectedGuest({});
    setGuestId(false);
    setInitialValues({ ...initialValues, refererId: guest._id });
    openManageGuestsModal();
    setPage("all");
  };

  const handleArchived = (guest) => {
    setSelectedGuest(guest);
    setGuestId(guest._id);
    openDeleteModal();
  };

  const handleArchivedConfirm = () => {
    archivedGuest(
      {
        guest: selectedGuest,
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

  const handleActiveConfirm = (guest) => {
    activeGuest(
      {
        guest,
      },
      {
        onSuccess: (response) => {
          refetch();
          showGlobalNotification("success", "En Horabuena", "El registro ha sido actusalizado");
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
        onFinally: () => {},
      }
    );
  };

  const handleActive = (guest) => {
    setGuestId(guest._id);
    confirmAlert({
      title: guest.active ? "Desactivar el Invitado" : "Activar el Invitado",
      message: "Esta seguro que desea continuar?",
      buttons: [
        {
          label: t("yes"),
          onClick: () => handleActiveConfirm(guest),
        },
        {
          label: t("no"),
          onClick: () => {},
        },
      ],
    });
  };

  const handleDetails = (guest) => {
    if (!userId) {
      setPage(globals.PAGE_ONE);
      setSubpage(numbers.ONE);
    }

    getGuest(guest._id, {
      onSuccess: (response) => {
        setSelectedGuest(response.result);
        setGuestRedux(response.result)(dispatch);
        if (userId) openDetailsGuestModal();
      },
      onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
    });
  };

  return (
    <>
      {page === globals.PAGE_MAIN && (
        <div>
          {!isEmbed && (
            <GuestsHeader
              t={t}
              primaryAction={
                <AddGuestButton
                  isOpenManageGuestsModal={isOpenManageGuestsModal}
                  openManageGuestsModal={openManageGuestsModal}
                  t={t}
                />
              }
            />
          )}
          <ActionBar {...commonProps} options={{ actions: guests.length > 0 && ActionsGuests }}>
            <SearchGuestsForm {...commonProps} refetch={refetch} />
          </ActionBar>
          <GuestsTable
            {...commonProps}
            guests={guests}
            pagination={pagination}
            setPagination={setPagination}
            loading={loading}
            refetch={refetch}
            initialValues={initialValues}
            setPage={setPage}
            setSelectedGuest={setSelectedGuest}
            selectedGuest={selectedGuest}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            handleArchived={handleArchived}
            handleActive={handleActive}
            openDeleteModal={openDeleteModal}
            details={handleDetails}
            t={t}
          />
        </div>
      )}
      {page === globals.PAGE_ONE && (
        <div>
          <GuestHeader
            subpage={subpage}
            setPage={setPage}
            selectedGuest={selectedGuest}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            openDeleteModal={openDeleteModal}
            handleGeneralModal={handleGeneralModal}
            handleAssist={handleAssist}
            handleEditInvitation={handleEditInvitation}
            setSubpage={setSubpage}
            t={t}
          />
          {subpage === numbers.ONE && (
            <>
              <ActionBar {...commonPropsAssists}>
                <SearchAssistsForm {...commonPropsAssists} refetch={refetchAssists} />
              </ActionBar>
              <AssistsTable
                assists={assists}
                filters={filtersAssists}
                setFilters={setFiltersAssists}
                pagination={paginationAssists}
                setPagination={setPaginationAssists}
                loading={loadingAssists}
                refetch={refetchAssists}
                initialValues={initialValues}
                setPage={setPage}
                setSelectedGuest={setSelectedGuest}
                selectedGuest={selectedGuest}
                t={t}
              />
            </>
          )}
          {subpage === numbers.TWO && (
            <>
              <div style={{ padding: 20 }}>
                <AppsContainer isEmbed="true" guestId={selectedGuest?._id} />
              </div>
            </>
          )}
          {subpage === numbers.THREE && (
            <>
              <TransContainer isEmbed="true" guestId={selectedGuest?._id} />
            </>
          )}
        </div>
      )}
      <BaseModal
        isOpenModal={isOpenDeleteModal}
        closeModal={closeDeleteModal}
        onConfirm={handleArchivedConfirm}
        onCancel={closeDeleteModal}
        isAlert="true"
        title="Desea eliminar este usuario?"
        confirmText={t("yes")}
        cancelText={t("no")}
        footer
      >
        <p>
          Nombre completo: {selectedGuest?.firstname} {selectedGuest?.lastname}
        </p>
        <p> Email: {selectedGuest?.email} </p>
        <p> Tipo: {selectedGuest?.type} </p>
      </BaseModal>
      <BaseModal
        isOpenModal={isOpenInactiveModal}
        closeModal={closeInactiveModal}
        onConfirm={handleActiveConfirm}
        onCancel={closeInactiveModal}
        isAlert="true"
        title={`Desea ${!selectedGuest?.active ? "Activar" : "Desactivar"} este usuario?`}
        confirmText={t("yes")}
        cancelText={t("no")}
        footer
      >
        <p>
          Nombre completo: {selectedGuest?.firstname} {selectedGuest?.lastname}
        </p>
        <p> Email: {selectedGuest?.email} </p>
        <p> Tipo: {selectedGuest?.type} </p>
      </BaseModal>
      <ManageGuestModal
        refetch={refetch}
        guestId={guestId}
        setGuestId={setGuestId}
        closeModal={closeManageGuestsModal}
        openModal={isOpenManageGuestsModal}
        guests={guests}
        selectedGuest={selectedGuest}
        t={t}
      />
      <ManageAssistModal
        refetch={refetchAssists}
        guestId={guestId}
        setGuestId={setGuestId}
        closeModal={closeManageAssistModal}
        openModal={isOpenManageAssistModal}
        initialValues={initialValuesAssist}
        guests={guests}
        selectedGuest={selectedGuest}
        setSelectedGuestMain={setSelectedGuest}
        setGuest={setGuestRedux}
        getGuest={getGuest}
        saveAssist={saveAssist}
      />
      <SelectModalApp
        refetch={refetch}
        guestId={guestId}
        setGuestId={setGuestId}
        closeModal={closeGeneralModal}
        openModal={isOpenGeneralModal}
        initialValues={initialValuesAssist}
        guests={guests}
        selectedGuest={selectedGuest}
        setSelectedGuestMain={setSelectedGuest}
        setGuest={setGuestRedux}
        getGuest={getGuest}
        saveAssist={saveAssist}
      />
      <DetailsTransModal
        refetch={refetch}
        guestId={guestId}
        setGuestId={setGuestId}
        closeModal={closeDetailsGuestModal}
        openModal={isOpenDetailsGuestModal}
        initialValues={initialValues}
        guests={guests}
        selectedGuestMain={selectedGuest}
        setSelectedGuestMain={setSelectedGuest}
      />
    </>
  );
};

export default Guests;
