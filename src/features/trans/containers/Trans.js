import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";

import ActionBar from "../../shared/components/ActionBar";
import TranssTable from "../components/TranssTable";
import SearchTranssForm from "../components/SearchTransForm";
import ActionsUsers from "../components/ActionsTrans";
import ManageTransModal2 from "../components/ManageTransModal2";
import DetailsTransModal from "../components/DetailsTransModal";
import AddUserButton from "../components/AddTransButton";
import TranssHeader from "../components/TranssHeader";

// HELPERS
import showGlobalNotification from "../../../helpers/showGlobalNotification";

// REDUX
import { setTrans, setTransRedux } from "../../../redux/trans";

// REQUEST
import { getTrans, archivedTrans, activeTrans } from "../requests";

// HOOKS
import useTranss from "../hooks/useTranss";
import useModal from "../../shared/hooks/useModal";

// CONTAINERS
import AppsTable from "../../apps/containers/AppsTable";

// CONSTANTS
import { globals, numbers } from "../../../constants/globals";

const Transs = ({ isEmbed = false, appId = null, planId = null, userId = null }) => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);
  const { t, i18n } = useTranslation();

  const { transs, filters, setFilters, pagination, setPagination, loading, refetch } = useTranss(appId, planId, userId);

  const commonProps = { filters, setFilters };
  const [page, setPage] = useState(globals.PAGE_MAIN);
  const [subpage, setSubpage] = useState(numbers.ONE);
  const [selectedTrans, setSelectedTrans] = useState({});

  const [transId, setTransId] = useState(null);
  const [isOpenManageTranssModal, openManageTranssModal, closeManageTranssModal] = useModal();

  const [isOpenDetailsTransModal, openDetailsTransModal, closeDetailsTransModal] = useModal();

  const [initialValues, setInitialValues] = useState({
    mode: "Efectivo",
    fullname: "",
    email: "",
    phone: "",
    amount: 0,
    pending: 0,
    total: 0,
    appId: "",
  });

  useEffect(() => {
    setTrans(selectedTrans)(dispatch);
  }, [selectedTrans]);

  const handleEdit = (trans) => {
    setSelectedTrans(trans);
    setTransId(trans._id);
    openManageTranssModal();
  };

  const handleDetails = (trans) => {
    getTrans(trans._id, {
      onSuccess: (response) => {
        setTransRedux(response.result);
        setSelectedTrans(response.result);
        openDetailsTransModal();
      },
      onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
    });
  };

  const handleArchivedConfirm = (trans) => {
    archivedTrans(
      {
        trans,
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

  const handleArchived = (trans) => {
    setTransId(trans._id);
    confirmAlert({
      title: `Eliminar ${trans.description} por ${trans.amount}`,
      message: `Esta seguro que desea eliminar el setting de ${trans.description}?`,
      buttons: [
        {
          label: t("yes"),
          onClick: () => handleArchivedConfirm(trans),
        },
        {
          label: t("no"),
          onClick: () => {},
        },
      ],
    });
  };

  const handleReverseConfirm = (trans) => {
    activeTrans(
      {
        trans,
      },
      {
        onSuccess: () => {
          refetch();
          showGlobalNotification("success", t("inHorabuena"), t("successfulProcess"));
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
        onFinally: () => {},
      }
    );
  };

  const handleReverse = (trans) => {
    setTransId(trans._id);
    confirmAlert({
      title: "Desea reversar el Pago",
      buttons: [
        {
          label: t("yes"),
          onClick: () => handleReverseConfirm(trans),
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
            <TranssHeader
              t={t}
              primaryAction={
                <AddUserButton
                  isOpenManageTranssModal={isOpenManageTranssModal}
                  openManageTranssModal={openManageTranssModal}
                />
              }
            />
          )}
          <ActionBar {...commonProps} options={{ actions: transs?.length > 0 && ActionsUsers }}>
            <SearchTranssForm {...commonProps} refetch={refetch} />
          </ActionBar>
          <TranssTable
            {...commonProps}
            transs={transs}
            pagination={pagination}
            setPagination={setPagination}
            loading={loading}
            refetch={refetch}
            initialValues={initialValues}
            setPage={setPage}
            setSelectedTrans={setSelectedTrans}
            selectedTrans={selectedTrans}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            details={handleDetails}
            handleArchived={handleArchived}
            handleReverse={handleReverse}
            openDetailsTransModal={openDetailsTransModal}
            t={t}
          />
        </div>
      )}

      <ManageTransModal2
        refetch={refetch}
        transId={transId}
        setTransId={setTransId}
        closeModal={closeManageTranssModal}
        openModal={isOpenManageTranssModal}
        t={t}
      />
      <DetailsTransModal
        refetch={refetch}
        transId={transId}
        setTransId={setTransId}
        closeModal={closeDetailsTransModal}
        openModal={isOpenDetailsTransModal}
        initialValues={initialValues}
        transs={transs}
        selectedTransMain={selectedTrans}
        setSelectedTransMain={setSelectedTrans}
        setTrans={setTrans}
        getTrans={getTrans}
        session={sessionStoreRedux.currentSession}
      />
    </>
  );
};

export default Transs;
