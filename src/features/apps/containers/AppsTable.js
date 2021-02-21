import { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import ActionBar from "../../shared/components/ActionBar";

import AppsTable from "../components/AppsTable";
import SearchAppsForm from "../components/SearchAppsForm";
import ActionsUsers from "../components/ActionsApps";
import useApps from "../hooks/useAppsTableByUser";
import ManageAppModal from "../components/ManageAppModal";
import AppHeader from "../components/AppHeader";
import { getApp, archivedApp, activeApp } from "../requests";
import showGlobalNotification from "../../../helpers/showGlobalNotification";

import { setApp } from "../../../redux/app";
import useModal from "../../shared/hooks/useModal";

const Apps = ({ userId, planId }) => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);

  const { apps, filters, setFilters, pagination, setPagination, loading, refetch } = useApps();

  const commonProps = { filters, setFilters };
  const [page, setPage] = useState("all");
  const [subpage, setSubpage] = useState("1");
  const [selectedApp, setSelectedApp] = useState({});

  const [appId, setAppId] = useState(null);
  const [visible, setVisible] = useState(false);

  const [isOpenManageAppsModal, openManageAppsModal, closeManageAppsModal] = useModal();

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

  const activeComponent = () => {
    setVisible(true);
    refetch();
  };

  useEffect(() => {
    setApp(selectedApp)(dispatch);
  }, [selectedApp]);

  useEffect(() => {
    setFilters({ ...filters, userId });
    setTimeout(activeComponent, 300);
  }, [userId]);

  useEffect(() => {
    if (planId) {
      setFilters({ ...filters, planId });
      setTimeout(activeComponent, 300);
    }
  }, [planId]);

  const handleEdit = (app) => {
    setSelectedApp(app);
    setAppId(app._id);
    openManageAppsModal();
  };

  const handleDetails = (app) => {
    setPage("one");
    getApp(app._id, {
      onSuccess: (response) => {
        setSelectedApp(response.result);
        // setLoaderForm(false);
      },
      onError: () => showGlobalNotification("error", "Error", "error"),
    });
    // setSelectedUser(user);
  };

  const handleArchivedConfirm = (app) => {
    archivedApp(
      {
        app,
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

  const handleArchived = (app) => {
    setAppId(app._id);
    confirmAlert({
      title: `Eliminar ${app.name}`,
      message: `Esta seguro que desea eliminar el setting de ${app.name}?`,
      buttons: [
        {
          label: "SI",
          onClick: () => handleArchivedConfirm(app),
        },
        {
          label: "NO",
          onClick: () => {},
        },
      ],
    });
  };

  const handleActiveConfirm = (app) => {
    activeApp(
      {
        app,
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

  const handleActive = (app) => {
    setAppId(app._id);
    confirmAlert({
      title: app.active ? "Desactivar el Paquete" : "Activar el Paquete",
      message: "Esta seguro que desea continuar?",
      buttons: [
        {
          label: "SI",
          onClick: () => handleActiveConfirm(app),
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
          {/*  <ActionBar {...commonProps} options={{ actions: apps?.length > 0 && ActionsUsers }}>
            <SearchAppsForm {...commonProps} refetch={refetch} />
      </ActionBar> */}
          {visible ? (
            <AppsTable
              {...commonProps}
              apps={apps}
              pagination={pagination}
              setPagination={setPagination}
              loading={loading}
              refetch={refetch}
              initialValues={initialValues}
              setPage={setPage}
              setSelectedApp={setSelectedApp}
              selectedApp={selectedApp}
              handleDetails={handleDetails}
              handleEdit={handleEdit}
              details={handleDetails}
              handleArchived={handleArchived}
              handleActive={handleActive}
            />
          ) : (
            ""
          )}
        </div>
      )}
      {page === "one" && (
        <div>
          <AppHeader
            setPage={setPage}
            selectedApp={selectedApp}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            setSubpage={setSubpage}
            handleArchived={handleArchived}
          />
          {subpage === "1" && (
            <>
              <h2> 1 </h2>
            </>
          )}
        </div>
      )}
      <ManageAppModal
        refetch={refetch}
        appId={appId}
        setAppId={setAppId}
        closeModal={closeManageAppsModal}
        openModal={isOpenManageAppsModal}
        initialValues={initialValues}
        apps={apps}
        selectedApp={selectedApp}
        setSelectedAppMain={setSelectedApp}
        setApp={setApp}
        getApp={getApp}
        session={sessionStoreRedux.currentSession}
      />
    </>
  );
};

export default Apps;
