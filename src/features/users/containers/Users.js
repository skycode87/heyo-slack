import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// COMPONENTS
import UsersTable from "../components/usersTable";
import UsersHeader from "../components/usersHeader";

// HELPERS
import showGlobalNotification from "../../../helpers/showGlobalNotification";

// REDUX
import { setUser, setUserRedux } from "../../../redux/user";

// REQUEST
import { getUser } from "../requests";

// HOOKS
import useUsers from "../hooks/useUsers";
import useModal from "../../shared/hooks/useModal";

// CONSTANTS
import { globals, numbers } from "../../../constants/globals";

const Users = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { users, filters, setFilters, pagination, setPagination, loading, refetch } = useUsers();

  const commonProps = { filters, setFilters };
  const [page, setPage] = useState(globals.PAGE_MAIN);

  const [subpage, setSubpage] = useState(numbers.ONE);
  const [selectedUser, setSelectedUser] = useState({});
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenInactiveModal, openInactiveModal, closeInactiveModal] = useModal();

  const [userId, setUserId] = useState(null);

  const [initialValues] = useState({
    firstname: "",
    lastname: "",
    role: "",
    address: "",
    city: "",
    region: "",
    country: "",
    document: "",
    documentType: "CEDULA",
    observation: "",
    birthdate: "1990/01/01",
    category: "",
    type: "",
    email: "",
    phone: "",
    reference: "",
    active: "",
    startdate: "1990/01/01",
    closuredate: "1990/01/01",
    refererId: null,
  });

  useEffect(() => {
    setUser(selectedUser)(dispatch);
  }, [selectedUser]);

  const handleArchived = (user) => {
    setSelectedUser(user);
    setUserId(user._id);
    openDeleteModal();
  };

  const handleInactive = (user) => {
    setSelectedUser(user);
    setUserId(user._id);
    openInactiveModal();
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
            handleEdit=""
            handleArchived={handleArchived}
            handleInactive={handleInactive}
            openDeleteModal={openDeleteModal}
            details={handleDetails}
            t={t}
          />
        </div>
      )}
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
