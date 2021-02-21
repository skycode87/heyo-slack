import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManagePortalUserModal from "../components/ManagePortalUserModal";
import UserPortalHeader from "../components/userPortalHeader";
import { getUser } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";

import { setUser } from "../../../redux/user";
import useModal from "../../shared/hooks/useModal";

const Users = () => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);
  const [subpage, setSubpage] = useState("1");
  const [selectedUser, setSelectedUser] = useState({});

  const [userId, setUserId] = useState(null);
  const [isOpenManageUsersModal, openManageUsersModal, closeManageUsersModal] = useModal();

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

  useEffect(() => {
    getUser(sessionStoreRedux.currentSession._id, {
      onSuccess: (response) => {
        setSelectedUser(response.user);
        // setLoaderForm(false);
      },
      onError: () => showGlobalNotification("error", "Error", "error"),
    });
  }, [sessionStoreRedux.currentSession]);

  useEffect(() => {
    setUser(selectedUser)(dispatch);
  }, [selectedUser]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setUserId(user._id);
    openManageUsersModal();
  };

  const handleEditInvitation = (user) => {
    setSelectedUser({});
    setUserId(false);
    setInitialValues({ ...initialValues, refererId: user._id });
    openManageUsersModal();
  };

  return (
    <>
      <div>
        <UserPortalHeader
          selectedUser={selectedUser}
          handleEdit={handleEdit}
          handleEditInvitation={handleEditInvitation}
          setSubpage={setSubpage}
        />
      </div>
      <ManagePortalUserModal
        userId={userId}
        setUserId={setUserId}
        closeModal={closeManageUsersModal}
        openModal={isOpenManageUsersModal}
        initialValues={initialValues}
        selectedUser={selectedUser}
        setSelectedUserMain={setSelectedUser}
        setUser={setUser}
        getUser={getUser}
      />
    </>
  );
};

export default Users;
