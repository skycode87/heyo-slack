import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import ActionBar from "../../shared/components/ActionBar";
import AppsTable from "../components/AppsTable";
import SearchAppsForm from "../components/SearchAppsForm";
import ActionsUsers from "../components/ActionsApps";
import ManageAppModal2 from "../components/ManageAppModal2";
import AddUserButton from "../components/AddAppButton";
import ManageTransModal from "../../trans/components/ManageTransModal";
import AppHeader from "../components/AppHeader";
import AppsHeader from "../components/AppsHeader";
import InfoPack from "../components/InfoPack";
import InfoRoot from "../components/InfoRoot";

// HELPERS
import showGlobalNotification from "../../../helpers/showGlobalNotification";

// REDUX
import { setApp, setAppRedux } from "../../../redux/app";

// REQUEST
import { getApp, archivedApp, activeApp } from "../requests";

// HOOKS
import useApps from "../hooks/useApps";
import useModal from "../../shared/hooks/useModal";

// CONTAINERS
import TransContainer from "../../trans/containers/Trans";

// CONSTANTS
import { globals, numbers } from "../../../constants/globals";

const Apps = ({ isEmbed = false, userId = null, reload, planId = null }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);

  const { apps, filters, setFilters, pagination, setPagination, loading, refetch } = useApps(userId, planId);

  const commonProps = { filters, setFilters };
  const [page, setPage] = useState(globals.PAGE_MAIN);
  const [subpage, setSubpage] = useState(numbers.ONE);
  const [selectedApp, setSelectedApp] = useState({});

  const [appId, setAppId] = useState(null);
  const [isOpenManageAppsModal, openManageAppsModal, closeManageAppsModal] = useModal();

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
    setApp(selectedApp)(dispatch);
  }, [selectedApp]);

  useEffect(() => {
    refetch();
  }, [reload]);

  const handleEdit = (app) => {
    setSelectedApp(app);
    setAppId(app._id);
    openManageAppsModal();
  };

  const handleDetails = (app) => {
    setSelectedApp({});
    setAppId(app._id);
    setPage(globals.PAGE_ONE);
    setSubpage(numbers.ONE);
    getApp(app._id, {
      onSuccess: (response) => {
        setSelectedApp(response.result);
        setAppRedux(response.result)(dispatch);
      },
      onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
    });
    //
  };

  const handleAddTrans = (app) => {
    setSelectedApp(app);
    setAppId(app._id);
    openManageTranssModal();
  };

  const handleArchivedConfirm = (app) => {
    archivedApp(
      {
        app,
      },
      {
        onSuccess: (response) => {
          refetch();
          showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
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
          label: t("yes"),
          onClick: () => handleArchivedConfirm(app),
        },
        {
          label: t("no"),
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
          showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
        onFinally: () => {},
      }
    );
  };

  const handleActive = (app) => {
    setAppId(app._id);
    confirmAlert({
      title: app.active ? `Desactivar la ${t("application")}` : `Activar la ${t("application")}`,
      message: "Esta seguro que desea continuar?",
      buttons: [
        {
          label: t("yes"),
          onClick: () => handleActiveConfirm(app),
        },
        {
          label: t("no"),
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <>
      {page === globals.PAGE_MAIN && (
        <div>
          {!isEmbed && (
            <AppsHeader
              t={t}
              primaryAction={
                <AddUserButton
                  isOpenManageAppsModal={isOpenManageAppsModal}
                  openManageAppsModal={openManageAppsModal}
                  t={t}
                />
              }
            />
          )}
          <ActionBar t={t} {...commonProps} options={{ actions: apps?.length > 0 && ActionsUsers }}>
            <SearchAppsForm {...commonProps} refetch={refetch} t={t} />
          </ActionBar>
          <AppsTable
            {...commonProps}
            apps={apps}
            pagination={pagination}
            setPagination={setPagination}
            loading={loading}
            refetch={refetch}
            setPage={setPage}
            setSelectedApp={setSelectedApp}
            selectedApp={selectedApp}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            details={handleDetails}
            handleArchived={handleArchived}
            handleActive={handleActive}
            handleAddTrans={handleAddTrans}
            t={t}
          />
        </div>
      )}
      {page === globals.PAGE_ONE && (
        <div>
          <AppHeader
            setPage={setPage}
            selectedApp={selectedApp}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            setSubpage={setSubpage}
            handleArchived={handleArchived}
            t={t}
          />
          {subpage === numbers.ONE && (
            <div style={{ padding: 20 }}>
              <TransContainer isEmbed="true" appId={appId} />
            </div>
          )}
          {subpage === numbers.TWO && (
            <div style={{ padding: 20 }}>
              <h2> Acerca de los eventos </h2>
            </div>
          )}
          {subpage === numbers.THREE && (
            <div style={{ padding: 20 }}>
              <InfoPack selectedApp={selectedApp} />
            </div>
          )}
          {subpage === numbers.FOUR && (
            <div style={{ padding: 20 }}>
              <InfoRoot selectedApp={selectedApp} />
            </div>
          )}
        </div>
      )}
      <ManageAppModal2
        refetch={refetch}
        appId={appId}
        setAppId={setAppId}
        closeModal={closeManageAppsModal}
        openModal={isOpenManageAppsModal}
        t={t}
      />
      <ManageTransModal
        refetch={refetch}
        closeModal={closeManageTranssModal}
        openModal={isOpenManageTranssModal}
        initialValues={initialValues}
        session={sessionStoreRedux.currentSession}
        selectedApp={selectedApp}
        t={t}
      />
    </>
  );
};

export default Apps;
