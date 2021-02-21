import { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import ActionBar from "../../shared/components/ActionBar";

import CalendarsTable from "../components/CalendarsTable";
import SearchCalendarsForm from "../components/SearchCalendarsForm";
import ActionsUsers from "../components/ActionsCalendars";
import useCalendars from "../hooks/useCalendars";
import ManageCalendarModal from "../components/ManageCalendarModal";
import AddUserButton from "../components/AddCalendarButton";
import InfoPack from "../components/InfoPack";
import InfoRoot from "../components/InfoRoot";

import TransContainer from "../../trans/containers/Trans";

import ManageTransModal from "../../trans/components/ManageTransModal";

import CalendarHeader from "../components/CalendarHeader";
import CalendarsHeader from "../components/CalendarsHeader";
import { getCalendar, archivedCalendar, activeCalendar } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";

import { setCalendar } from "../../../redux/calendar";
import useModal from "../../shared/hooks/useModal";

const Calendars = ({ isEmbed = false, userId = null, reload }) => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);

  const { calendars, filters, setFilters, pagination, setPagination, loading, refetch } = useCalendars(userId);

  const commonProps = { filters, setFilters };
  const [page, setPage] = useState("all");
  const [subpage, setSubpage] = useState("1");
  const [selectedCalendar, setSelectedCalendar] = useState({});

  const [calendarId, setCalendarId] = useState(null);
  const [isOpenManageCalendarsModal, openManageCalendarsModal, closeManageCalendarsModal] = useModal();

  const [isOpenManageTranssModal, openManageTranssModal, closeManageTranssModal] = useModal();

  const [initialValues, setInitialValues] = useState({
    name: "",
    duration: "",
    category: "",
    maxLimit: 1,
    minLimit: 1,
    observation: "",
    active: true,
    tag: "",
    avatar: "",
    public: false,
    startdate: "2020/01/01",
    closuredate: "2020/01/01",
  });

  useEffect(() => {
    setCalendar(selectedCalendar)(dispatch);
  }, [selectedCalendar]);

  useEffect(() => {
    refetch();
  }, [reload]);

  const handleEdit = (calendar) => {
    setSelectedCalendar(calendar);
    setCalendarId(calendar._id);
    openManageCalendarsModal();
  };

  const handleDetails = (calendar) => {
    setSelectedCalendar({});
    setCalendarId(calendar._id);
    setPage("one");
    getCalendar(calendar._id, {
      onSuccess: (response) => {
        setSelectedCalendar(response.result);
        // setLoaderForm(false);
      },
      onError: () => showGlobalNotification("error", "Error", "error"),
    });
    //
  };

  const handleAddTrans = (calendar) => {
    setSelectedCalendar(calendar);
    setCalendarId(calendar._id);
    openManageTranssModal();
  };

  const handleArchivedConfirm = (calendar) => {
    archivedCalendar(
      {
        calendar,
      },
      {
        onSuccess: (response) => {
          refetch();
          showGlobalNotification("success", "En Horabuena", "El registro ha sido eliminado");
        },
        onError: () => showGlobalNotification("error", "Error", "error"),
        onFinally: () => {},
      }
    );
  };

  const handleArchived = (calendar) => {
    setCalendarId(calendar._id);
    confirmAlert({
      title: `Eliminar ${calendar.name}`,
      message: `Esta seguro que desea eliminar el setting de ${calendar.name}?`,
      buttons: [
        {
          label: "SI",
          onClick: () => handleArchivedConfirm(calendar),
        },
        {
          label: "NO",
          onClick: () => {},
        },
      ],
    });
  };

  const handleActiveConfirm = (calendar) => {
    activeCalendar(
      {
        calendar,
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

  const handleActive = (calendar) => {
    setCalendarId(calendar._id);
    confirmAlert({
      title: calendar.active ? "Desactivar el Paquete" : "Activar el Paquete",
      message: "Esta seguro que desea continuar?",
      buttons: [
        {
          label: "SI",
          onClick: () => handleActiveConfirm(calendar),
        },
        {
          label: "NO",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <>
      {page === "all" && (
        <div>
          {!isEmbed && (
            <CalendarsHeader primaryAction={<AddUserButton refetch={refetch} initialValues={initialValues} />} />
          )}
          <ActionBar {...commonProps} options={{ actions: calendars?.length > 0 && ActionsUsers }}>
            <SearchCalendarsForm {...commonProps} refetch={refetch} />
          </ActionBar>
          <CalendarsTable
            {...commonProps}
            calendars={calendars}
            pagination={pagination}
            setPagination={setPagination}
            loading={loading}
            refetch={refetch}
            initialValues={initialValues}
            setPage={setPage}
            setSelectedCalendar={setSelectedCalendar}
            selectedCalendar={selectedCalendar}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            details={handleDetails}
            handleArchived={handleArchived}
            handleActive={handleActive}
            handleAddTrans={handleAddTrans}
          />
        </div>
      )}
      {page === "one" && (
        <div>
          <CalendarHeader
            setPage={setPage}
            selectedCalendar={selectedCalendar}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            setSubpage={setSubpage}
            handleArchived={handleArchived}
          />
          {subpage === "1" && (
            <div style={{ padding: 20 }}>
              <TransContainer isEmbed="true" calendarId={calendarId} />
            </div>
          )}
          {subpage === "2" && (
            <div style={{ padding: 20 }}>
              <h2> Acerca de los eventos </h2>
            </div>
          )}
          {subpage === "3" && (
            <div style={{ padding: 20 }}>
              <InfoPack selectedCalendar={selectedCalendar} />
            </div>
          )}
          {subpage === "4" && (
            <div style={{ padding: 20 }}>
              <InfoRoot selectedCalendar={selectedCalendar} />
            </div>
          )}
        </div>
      )}
      <ManageCalendarModal
        refetch={refetch}
        calendarId={calendarId}
        setCalendarId={setCalendarId}
        closeModal={closeManageCalendarsModal}
        openModal={isOpenManageCalendarsModal}
        initialValues={initialValues}
        calendars={calendars}
        selectedCalendar={selectedCalendar}
        setSelectedCalendarMain={setSelectedCalendar}
        setCalendar={setCalendar}
        getCalendar={getCalendar}
        session={sessionStoreRedux.currentSession}
      />
      <ManageTransModal
        refetch={refetch}
        closeModal={closeManageTranssModal}
        openModal={isOpenManageTranssModal}
        initialValues={initialValues}
        session={sessionStoreRedux.currentSession}
        selectedCalendar={selectedCalendar}
      />
    </>
  );
};

export default Calendars;
