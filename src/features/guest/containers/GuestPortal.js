import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManagePortalGuestModal from "../components/ManagePortalGuestModal";
import GuestPortalHeader from "../components/guestPortalHeader";
import { getGuest } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";

import { setGuest } from "../../../redux/guest";
import useModal from "../../shared/hooks/useModal";

const Guests = () => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);
  const [subpage, setSubpage] = useState("1");
  const [selectedGuest, setSelectedGuest] = useState({});

  const [guestId, setGuestId] = useState(null);
  const [isOpenManageGuestsModal, openManageGuestsModal, closeManageGuestsModal] = useModal();

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
    getGuest(sessionStoreRedux.currentSession._id, {
      onSuccess: (response) => {
        setSelectedGuest(response.guest);
        // setLoaderForm(false);
      },
      onError: () => showGlobalNotification("error", "Error", "error"),
    });
  }, [sessionStoreRedux.currentSession]);

  useEffect(() => {
    setGuest(selectedGuest)(dispatch);
  }, [selectedGuest]);

  const handleEdit = (guest) => {
    setSelectedGuest(guest);
    setGuestId(guest._id);
    openManageGuestsModal();
  };

  const handleEditInvitation = (guest) => {
    setSelectedGuest({});
    setGuestId(false);
    setInitialValues({ ...initialValues, refererId: guest._id });
    openManageGuestsModal();
  };

  return (
    <>
      <div>
        <GuestPortalHeader
          selectedGuest={selectedGuest}
          handleEdit={handleEdit}
          handleEditInvitation={handleEditInvitation}
          setSubpage={setSubpage}
        />
      </div>
      <ManagePortalGuestModal
        guestId={guestId}
        setGuestId={setGuestId}
        closeModal={closeManageGuestsModal}
        openModal={isOpenManageGuestsModal}
        initialValues={initialValues}
        selectedGuest={selectedGuest}
        setSelectedGuestMain={setSelectedGuest}
        setGuest={setGuest}
        getGuest={getGuest}
      />
    </>
  );
};

export default Guests;
