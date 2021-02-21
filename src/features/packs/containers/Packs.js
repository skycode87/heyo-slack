import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import ActionBar from "../../shared/components/ActionBar";

import PacksTable from "../components/PacksTable";
import SearchPacksForm from "../components/SearchPacksForm";
import ActionsUsers from "../components/ActionsPacks";
import ManagePackModal from "../components/ManagePackModal";
import ManagePackContentModal from "../components/ManagePackContentModal";

import AddUserButton from "../components/AddPackButton";
import PackHeader from "../components/PackHeader";
import PacksHeader from "../components/PacksHeader";
import PacksCard from "../components/PacksCard";

import ManageBucketModal from "../../bucket/components/ManageBucketModal";

// HELPERS
import showGlobalNotification from "../../../helpers/showGlobalNotification";

// REQUEST
import { getPack, archivedPack, activePack } from "../requests";

// REDUX
import PlansCalendar from "../../plans/containers/PlansCalendar";

// REDUX
import { setPackRedux } from "../../../redux/pack";

// HOOKS
import useModal from "../../shared/hooks/useModal";
import usePacks from "../hooks/usePacks";

// CONSTANTS
import { globals, numbers } from "../../../constants/globals";

// CONTAINER
import BucketContainer from "../../bucket/containers/Buckets";
import PlansContainer from "../../plans/containers/Plans";

const Packs = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { packs, filters, setFilters, pagination, setPagination, loading, refetch } = usePacks();

  const commonProps = { filters, setFilters };
  const [page, setPage] = useState(globals.PAGE_MAIN);
  const [subpage, setSubpage] = useState(numbers.ONE);
  const [selectedPack, setSelectedPack] = useState({});
  const [packId, setPackId] = useState(null);
  const [newPlan, setNewPlan] = useState(false);
  const [isOpenManagePacksModal, openManagePacksModal, closeManagePacksModal] = useModal();
  const [isOpenManagePackContentModal, openManagePackContentModal, closeManagePackContentModal] = useModal();

  const [reloadApp, setReloadApp] = useState(0);

  const [isOpenManagePlansModal, openNewPlanModal, closeManagePlansModal] = useModal();
  const [containerMode, setContainerMode] = useState("table");
  const [isOpenManageBucketModal, openManageBucketModal, closeManageBucketModal] = useModal();

  useEffect(() => {
    setPackRedux(selectedPack)(dispatch);
  }, [selectedPack]);

  const handleNew = () => {
    setPackId(null);
    openManagePacksModal();
  };

  const handleEdit = (pack) => {
    setSelectedPack(pack);
    setPackId(pack._id);
    openManagePacksModal();
  };

  const handleDetails = (pack) => {
    setPage(globals.PAGE_ONE);
    setSubpage(numbers.THREE);
    setPackId(pack._id);
    getPack(pack._id, {
      onSuccess: (response) => {
        setPackRedux(response.result)(dispatch);
        setSelectedPack(response.result);
      },
      onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
    });
  };

  const handleArchivedConfirm = (pack) => {
    archivedPack(
      {
        pack,
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

  const handleArchived = (pack) => {
    setPackId(pack._id);
    confirmAlert({
      title: `Eliminar ${pack.name}`,
      message: `Esta seguro que desea eliminar el ${pack.name}?`,
      buttons: [
        {
          label: t("yes"),
          onClick: () => handleArchivedConfirm(pack),
        },
        {
          label: t("no"),
          onClick: () => {},
        },
      ],
    });
  };

  const handleActiveConfirm = (pack) => {
    activePack(
      {
        pack,
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

  const handleActive = (pack) => {
    setPackId(pack._id);
    confirmAlert({
      title: pack.active ? "Desactivar el Paquete" : "Activar el Paquete",
      message: "Esta seguro que desea continuar?",
      buttons: [
        {
          label: t("yes"),
          onClick: () => handleActiveConfirm(pack),
        },
        {
          label: t("no"),
          onClick: () => {},
        },
      ],
    });
  };

  const handleNewPlan = (pack) => {
    setPackId(pack._id);
    setPackRedux(pack);
    setNewPlan(true);
  };

  const handleAddImage = (pack) => {
    setSelectedPack(pack);
    setPackId(pack._id);
    openManageBucketModal();
  };

  const handleEditContent = (pack) => {
    setSelectedPack(pack);
    setPackId(pack._id);
    openManagePackContentModal();
  };

  return (
    <>
      {page === globals.PAGE_MAIN && (
        <div>
          <PacksHeader
            t={t}
            primaryAction={
              <AddUserButton
                refetch={refetch}
                isOpenManagePacksModal={isOpenManagePacksModal}
                handleNew={handleNew}
                setContainerMode={setContainerMode}
                containerMode={containerMode}
                t={t}
              />
            }
          />
          <ActionBar t={t} {...commonProps} options={{ actions: packs?.length > 0 && ActionsUsers }}>
            <SearchPacksForm t={t} {...commonProps} refetch={refetch} />
          </ActionBar>
          {containerMode === "table" && (
            <PacksTable
              {...commonProps}
              packs={packs}
              pagination={pagination}
              setPagination={setPagination}
              loading={loading}
              refetch={refetch}
              setPage={setPage}
              setSelectedPack={setSelectedPack}
              selectedPack={selectedPack}
              handleDetails={handleDetails}
              handleEdit={handleEdit}
              details={handleDetails}
              handleArchived={handleArchived}
              handleActive={handleActive}
              t={t}
            />
          )}
          {containerMode === "cards" && (
            <PacksCard
              {...commonProps}
              packs={packs}
              pagination={pagination}
              setPagination={setPagination}
              loading={loading}
              refetch={refetch}
              // initialValues={initialValues}
              setPage={setPage}
              setSelectedPack={setSelectedPack}
              selectedBucket={selectedPack}
              handleDetails={handleDetails}
              handleEdit={handleEdit}
              details={handleDetails}
              handleArchived={handleArchived}
            />
          )}
        </div>
      )}
      {page === globals.PAGE_ONE && (
        <div>
          <PackHeader
            handleAddImage={handleAddImage}
            setPage={setPage}
            selectedPack={selectedPack}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            setSubpage={setSubpage}
            handleArchived={handleArchived}
            openNewPlanModal={openNewPlanModal}
            handleNewPlan={handleNewPlan}
            handleEditContent={handleEditContent}
            t={t}
          />
          {subpage === numbers.ONE && (
            <div className="subcontainer-wrapper">
              <PlansCalendar isEmbed="true" packId={packId} newPlan={newPlan} setNewPlan={setNewPlan} />
            </div>
          )}
          {subpage === numbers.TWO && (
            <div className="subcontainer-wrapper">
              <BucketContainer isEmbed="true" packId={packId} />
            </div>
          )}
          {subpage === numbers.THREE && (
            <>
              <div className="subcontainer-wrapper">
                <PlansContainer packData={selectedPack} isEmbed="true" packId={packId} reload={reloadApp} />
              </div>
            </>
          )}
        </div>
      )}
      <ManagePackModal
        t={t}
        refetch={refetch}
        packId={packId}
        setPackId={setPackId}
        closeModal={closeManagePacksModal}
        openModal={isOpenManagePacksModal}
      />
      <ManagePackContentModal
        t={t}
        refetch={refetch}
        packId={packId}
        setPackId={setPackId}
        closeModal={closeManagePackContentModal}
        openModal={isOpenManagePackContentModal}
        handleDetails={handleDetails}
      />
      <ManageBucketModal
        entityProp="Pack"
        typeProp="Avatar"
        entityId={packId}
        openModal={isOpenManageBucketModal}
        closeModal={closeManageBucketModal}
      />
    </>
  );
};

export default Packs;
