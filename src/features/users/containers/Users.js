import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// COMPONENTS
import ActionBar from "../../shared/components/ActionBar";
import UsersTable from "../components/usersTable";
import SearchUsersForm from "../components/SearchUsersForm";
import ActionsUsers from "../components/ActionsUsers";
import BaseModal from "../../shared/components/Modal";
import ManageUserModal from "../components/ManageUserModal";
import SearchAssistsForm from "../components/SearchAssistsForm";
import ManageAssistModal from "../components/ManageAssistModal";
import AssistsTable from "../components/assistTable";
import SelectModalApp from "../components/SelectModalApp";
import AddUserButton from "../components/AddUserButton";
import UserHeader from "../components/userHeader";
import UsersHeader from "../components/usersHeader";

// HELPERS
import showGlobalNotification from "../../../helpers/showGlobalNotification";

// REDUX
import { setUser, setUserRedux } from "../../../redux/user";

// REQUEST
import { archivedUser, activeUser, getUser, saveAssist } from "../requests";

// HOOKS
import useUsers from "../hooks/useUsers";
import useModal from "../../shared/hooks/useModal";
import useAssists from "../hooks/useAssists";

// CONTAINERS
import AppsContainer from "../../apps/containers/Apps";
import TransContainer from "../../trans/containers/Trans";
import GuestContainer from "../../guest/containers/Guests";

// CONSTANTS
import { globals, numbers } from "../../../constants/globals";

const Users = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { users, filters, setFilters, pagination, setPagination, loading, refetch } = useUsers();
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

  const [reloadGuest, setReloadGuest] = useState(0);
  const [reloadApp, setReloadApp] = useState(0);

  const [subpage, setSubpage] = useState(numbers.ONE);
  const [selectedUser, setSelectedUser] = useState({});
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenInactiveModal, openInactiveModal, closeInactiveModal] = useModal();
  const commonPropsAssists = { filters: filtersAssists, setFilters: setFiltersAssists };

  const [userId, setUserId] = useState(null);
  const [isOpenManageUsersModal, openManageUsersModal, closeManageUsersModal] = useModal();
  const [isOpenManageAssistModal, openManageAssistModal, closeManageAssistModal] = useModal();

  const [isOpenManageGuestsModal, openManageGuestsModal, closeManageGuestsModal] = useModal();

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
    setUser(selectedUser)(dispatch);
  }, [selectedUser]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setUserId(user._id);
    openManageUsersModal();
  };

  const handleAssist = (user) => {
    setSelectedUser(user);
    setUserId(user._id);
    openManageAssistModal();
  };

  const handleGuest = (user) => {
    setSelectedUser(user);
    setUserId(user._id);
    openManageGuestsModal();
  };

  const handleGeneralModal = (user) => {
    setSelectedUser(user);
    setUserId(user._id);
    openGeneralModal();
  };

  const handleEditInvitation = (user) => {
    setSelectedUser({});
    setUserId(false);
    setInitialValues({ ...initialValues, refererId: user._id });
    openManageUsersModal();
    setPage("all");
  };

  const handleArchived = (user) => {
    setSelectedUser(user);
    setUserId(user._id);
    openDeleteModal();
  };

  const handleArchivedConfirm = () => {
    archivedUser(
      {
        user: selectedUser,
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

    // setUserId(user._id);
    // openManageUsersModal();
  };

  const handleInactive = (user) => {
    setSelectedUser(user);
    setUserId(user._id);
    openInactiveModal();
  };

  const handleActiveConfirm = () => {
    activeUser(
      {
        user: selectedUser,
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

    // setUserId(user._id);
    // openManageUsersModal();
  };

  const handleDetails = (user) => {
    setPage(globals.PAGE_ONE);
    setSubpage(numbers.PAGE_ONE);
    getUser(user._id, {
      onSuccess: (response) => {
        setUserRedux(response.user)(dispatch);
        setSelectedUser(response.user);
        // setLoaderForm(false);
      },
      onError: () => showGlobalNotification("error", "Error", "error"),
    });
  };

  return (
    <>
      {page === globals.PAGE_MAIN && (
        <div>
          <UsersHeader t={t} />

          <UsersTable
            {...commonProps}
            users={users}
            pagination={pagination}
            setPagination={setPagination}
            loading={loading}
            refetch={refetch}
            initialValues={initialValues}
            setPage={setPage}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            handleArchived={handleArchived}
            handleInactive={handleInactive}
            openDeleteModal={openDeleteModal}
            details={handleDetails}
            t={t}
          />
        </div>
      )}
      {page === globals.PAGE_ONE && (
        <div>
          <UserHeader
            subpage={subpage}
            setPage={setPage}
            selectedUser={selectedUser}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            handleGuest={handleGuest}
            openDeleteModal={openDeleteModal}
            handleGeneralModal={handleGeneralModal}
            handleAssist={handleAssist}
            handleEditInvitation={handleEditInvitation}
            setSubpage={setSubpage}
            t={t}
          />
          {subpage === numbers.ONE && (
            <div className="subcontainer-wrapper">
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
                setSelectedUser={setSelectedUser}
                selectedUser={selectedUser}
              />
            </div>
          )}
          {subpage === numbers.TWO && (
            <>
              <div className="subcontainer-wrapper">
                <AppsContainer isEmbed="true" userId={selectedUser._id} reload={reloadApp} />
              </div>
            </>
          )}
          {subpage === numbers.THREE && (
            <div className="subcontainer-wrapper">
              <TransContainer isEmbed="true" userId={selectedUser._id} />
            </div>
          )}
          {subpage === numbers.FOUR && (
            <div className="subcontainer-wrapper">
              <GuestContainer isEmbed="true" userId={selectedUser._id} reload={reloadGuest} />
            </div>
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
        confirmText="Si"
        cancelText="No"
        footer
      >
        <p>
          {t("fullname")}: {selectedUser.firstname} {selectedUser.lastname}
        </p>
        <p>
          {" "}
          {t("email")}: {selectedUser.email}{" "}
        </p>
        <p>
          {" "}
          {t("type")}: {selectedUser.type}{" "}
        </p>
      </BaseModal>
      <BaseModal
        isOpenModal={isOpenInactiveModal}
        closeModal={closeInactiveModal}
        onConfirm={handleActiveConfirm}
        onCancel={closeInactiveModal}
        isAlert="true"
        title={`Desea ${!selectedUser.active ? "Activar" : "Desactivar"} este usuario?`}
        confirmText="Si"
        cancelText="No"
        footer
      >
        <p>
          Nombre completo: {selectedUser.firstname} {selectedUser.lastname}
        </p>
        <p> Email: {selectedUser.email} </p>
        <p> Tipo: {selectedUser.type} </p>
      </BaseModal>
      <ManageUserModal
        refetch={refetch}
        userId={userId}
        setUserId={setUserId}
        closeModal={closeManageUsersModal}
        openModal={isOpenManageUsersModal}
        initialValues={initialValues}
        users={users}
        selectedUser={selectedUser}
        setSelectedUserMain={setSelectedUser}
        setUser={setUser}
        getUser={getUser}
        t={t}
      />
      <ManageAssistModal
        refetch={refetchAssists}
        userId={userId}
        setUserId={setUserId}
        closeModal={closeManageAssistModal}
        openModal={isOpenManageAssistModal}
        initialValues={initialValuesAssist}
        users={users}
        selectedUser={selectedUser}
        setSelectedUserMain={setSelectedUser}
        setUser={setUser}
        getUser={getUser}
        saveAssist={saveAssist}
      />
      <SelectModalApp
        refetch={refetch}
        userId={userId}
        setUserId={setUserId}
        closeModal={closeGeneralModal}
        openModal={isOpenGeneralModal}
        initialValues={initialValuesAssist}
        users={users}
        selectedUser={selectedUser}
        setSelectedUserMain={setSelectedUser}
        setUser={setUser}
        getUser={getUser}
        saveAssist={saveAssist}
        setReloadApp={setReloadApp}
        t={t}
      />

      {/*
      <ManageGuestModal
        refetch={refetch}
        closeModal={closeManageGuestsModal}
        openModal={isOpenManageGuestsModal}
        initialValues={initialValues}
        users={users}
        setReloadGuest={setReloadGuest}
        selectedUserData={selectedUser}
        setSelectedUserMain={setSelectedUser}
     />
     */}
    </>
  );
};

export default Users;

// HELPERS

// REDUX

// REQUEST

// HOOKS

// CONTAINERS

// CONSTANTS
