import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Drawer, Button } from "antd";

import { confirmAlert } from "react-confirm-alert";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import ActionBar from "../../shared/components/ActionBar";
import PlansTable from "../components/PlansTable";
import SearchPlansForm from "../components/SearchPlansForm";
import ActionsUsers from "../components/ActionsPlans";
import ManagePlanModal2 from "../components/ManagePlanModal2";
import ManagePlanLinkModal from "../components/ManagePlanLinkModal";
import AddUserButton from "../components/AddPlanButton";
import PlanHeader from "../components/PlanHeader";
import PlansHeader from "../components/PlansHeader";
import ManagePlanContentModal from "../components/ManagePlanContentModal";
import PlansCard from "../components/PlansCard";
import DrawerPlan from "../components/DrawerPlan";

import ManageBucketModal from "../../bucket/components/ManageBucketModal";

// HELPERS
import showGlobalNotification from "../../../helpers/showGlobalNotification";

// REDUX
import { setPlan, setPlanRedux } from "../../../redux/plan";

// REQUEST
import { getPlan, archivedPlan, activePlan } from "../requests";

// HOOKS
import usePlans from "../hooks/usePlans";
import useModal from "../../shared/hooks/useModal";

// CONTAINERS
import TransContainer from "../../trans/containers/Trans";
import AppsContainer from "../../apps/containers/Apps";
import BucketContainer from "../../bucket/containers/Buckets";

// CONSTANTS
import { globals, numbers } from "../../../constants/globals";

const Plans = ({ isEmbed = false, appId = null, packId = null, userId = null, packData = {} }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const packStoreRedux = useSelector((store) => store.pack);
  const sessionStoreRedux = useSelector((store) => store.session);

  const { plans, filters, setFilters, pagination, setPagination, loading, refetch } = usePlans(appId, packId, userId);

  const commonProps = { filters, setFilters };
  const [page, setPage] = useState(globals.PAGE_MAIN);
  const [subpage, setSubpage] = useState(numbers.ONE);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [containerMode, setContainerMode] = useState("table");
  const [type, setType] = useState("TEXT");

  const [planId, setPlanId] = useState(null);
  const [isOpenManagePlansModal, openManagePlansModal, closeManagePlansModal] = useModal();
  const [isOpenDrawPlan, openDrawPlan, closeDrawPlan] = useModal();

  const [isOpenManagePlanLinkModal, openManagePlanLinkModal, closeManagePlanLinkModal] = useModal();
  const [isOpenManagePlanContentModal, openManagePlanContentModal, closeManagePlanContentModal] = useModal();
  const [isOpenManageBucketModal, openManageBucketModal, closeManageBucketModal] = useModal();

  const [initialValues, setInitialValues] = useState({
    name: "",
    duration: "",
    category: "",
    maxLimit: 1,
    minLimit: 1,
    observation: "",
    active: true,
    tag: "",
    price: "",
    avatar: "",
    public: false,
    startdate: "2020/01/01",
    closuredate: "2020/01/01",
  });

  useEffect(() => {
    setPlan(selectedPlan)(dispatch);
  }, [selectedPlan]);

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setPlanId(plan._id);
    setType(plan.type);
    console.log(plan.type);
    // openManagePlansModal();
    openManagePlanLinkModal();
  };

  const handleNewLinkModal = (type1) => {
    setType(type1);
    if (type1 === "URL_IMAGE") {
      // id # entity # type
      window.open(
        `https://lospatioshb.com/file/?code=${packId}${globals.CLUUF}Pack${globals.CLUUF}Avatar${globals.CLUUF}${sessionStoreRedux.currentSession.instanceId}`
      );
    } else if (type1 === "IMAGE") {
      openManageBucketModal();
    } else {
      openManagePlanLinkModal();
    }
  };

  const openDraw = (plan) => {
    setPlanId(plan?._id);
    getPlan(plan?._id, {
      onSuccess: (response) => {
        setSelectedPlan(response.result);
        setPlanRedux(response.result);
        openDrawPlan();
      },
      onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
    });
  };

  const handleDetails = (plan) => {
    console.log(plan._id);
    if (isEmbed) {
      openDraw(plan);
    } else {
      setPage(globals.PAGE_ONE);
      setSubpage(numbers.ONE);
      setPlanId(plan._id);
      getPlan(plan._id, {
        onSuccess: (response) => {
          setSelectedPlan(response.result);
          setPlanRedux(response.result);
        },
        onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
      });
    }
  };

  const handleArchivedConfirm = (plan) => {
    archivedPlan(
      {
        plan,
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

  const handleArchived = (plan) => {
    setPlanId(plan._id);
    confirmAlert({
      title: `Eliminar ${plan.name}`,
      message: `Esta seguro que desea eliminar el setting de ${plan.name}?`,
      buttons: [
        {
          label: t("yes"),
          onClick: () => handleArchivedConfirm(plan),
        },
        {
          label: t("no"),
          onClick: () => {},
        },
      ],
    });
  };

  const handleActiveConfirm = (plan) => {
    activePlan(
      {
        plan,
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

  const handleActive = (plan) => {
    setPlanId(plan._id);
    confirmAlert({
      title: plan.active ? "Desactivar el Paquete" : "Activar el Paquete",
      message: "Esta seguro que desea continuar?",
      buttons: [
        {
          label: t("yes"),
          onClick: () => handleActiveConfirm(plan),
        },
        {
          label: t("no"),
          onClick: () => {},
        },
      ],
    });
  };

  const handleEditContent = (plan) => {
    setSelectedPlan(plan);
    setPlanId(plan._id);
    openManagePlanContentModal();
  };

  const handleAddImage = (plan) => {
    setSelectedPlan(plan);
    setPlanId(plan._id);
    openManageBucketModal();
  };

  return (
    <>
      {page === globals.PAGE_MAIN && (
        <div>
          {!isEmbed && (
            <PlansHeader
              primaryAction={
                <AddUserButton
                  openManagePlansModal={openManagePlansModal}
                  isOpenManagePlansModal={isOpenManagePlansModal}
                  setContainerMode={setContainerMode}
                  containerMode={containerMode}
                  openManagePlanLinkModal={openManagePlanLinkModal}
                  t={t}
                />
              }
            />
          )}
          <ActionBar
            setContainerMode={setContainerMode}
            containerMode={containerMode}
            {...commonProps}
            isEmbed={isEmbed}
            options={{ actions: plans?.length > 0 && ActionsUsers }}
            handleNewLinkModal={handleNewLinkModal}
            extraButtons="true"
            conditionalButton={packData?.type || "ALL"}
          >
            <SearchPlansForm {...commonProps} refetch={refetch} />
          </ActionBar>
          {containerMode === "table" && (
            <PlansTable
              {...commonProps}
              plans={plans}
              pagination={pagination}
              setPagination={setPagination}
              loading={loading}
              refetch={refetch}
              initialValues={initialValues}
              setPage={setPage}
              setSelectedPlan={setSelectedPlan}
              selectedPlan={selectedPlan}
              handleDetails={handleDetails}
              handleEdit={handleEdit}
              details={handleDetails}
              handleArchived={handleArchived}
              handleActive={handleActive}
              handleAddImage={handleAddImage}
              packData={packData}
              t={t}
            />
          )}
          {containerMode === "cards" && (
            <PlansCard
              {...commonProps}
              plans={plans}
              pagination={pagination}
              setPagination={setPagination}
              loading={loading}
              refetch={refetch}
              // initialValues={initialValues}
              setPage={setPage}
              setSelectedPack={setSelectedPlan}
              selectedBucket={selectedPlan}
              handleDetails={handleDetails}
              handleEdit={handleEdit}
              details={handleDetails}
              handleArchived={handleArchived}
              packData={packData}
            />
          )}
        </div>
      )}
      {page === globals.PAGE_ONE && (
        <div>
          <PlanHeader
            setPage={setPage}
            selectedPlan={selectedPlan}
            handleDetails={handleDetails}
            handleEdit={handleEdit}
            setSubpage={setSubpage}
            handleArchived={handleArchived}
            handleEditContent={handleEditContent}
            handleAddImage={handleAddImage}
            t={t}
          />
          {subpage === numbers.ONE && (
            <div className="subcontainer-wrapper">
              <TransContainer isEmbed="true" planId={planId} />
            </div>
          )}
          {subpage === numbers.TWO && (
            <div className="subcontainer-wrapper">
              <AppsContainer isEmbed="true" planId={selectedPlan._id} />
            </div>
          )}
          {subpage === numbers.THREE && (
            <div className="subcontainer-wrapper">
              <BucketContainer isEmbed="true" planId={planId} />
            </div>
          )}
        </div>
      )}
      <ManagePlanModal2
        refetch={refetch}
        planId={planId}
        setPlanId={setPlanId}
        closeModal={closeManagePlansModal}
        openModal={isOpenManagePlansModal}
        t={t}
      />
      <ManagePlanLinkModal
        refetch={refetch}
        planId={planId}
        packId={packId}
        setPlanId={setPlanId}
        closeModal={closeManagePlanLinkModal}
        openModal={isOpenManagePlanLinkModal}
        typePlan={type}
        packData={packData}
      />
      <ManagePlanContentModal
        t={t}
        refetch={refetch}
        planId={planId}
        setPlanId={setPlanId}
        closeModal={closeManagePlanContentModal}
        openModal={isOpenManagePlanContentModal}
      />
      <ManageBucketModal
        entityProp="Pack"
        typeProp="Avatar"
        entityId={packId}
        openModal={isOpenManageBucketModal}
        closeModal={closeManageBucketModal}
      />
      <DrawerPlan isOpenDrawPlan={isOpenDrawPlan} closeDrawPlan={closeDrawPlan} selectedPlan={selectedPlan} />
    </>
  );
};

export default Plans;
