import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";

import moment from "moment";

import usePlans from "../hooks/usePlans";
import ManagePlanCalendarModal from "../components/ManagePlanCalendarModal";
import CalendarPlan from "../components/CalendarPlan";

import AddUserButton from "../components/AddPlanButton";
import PlansHeader from "../components/PlansHeader";
import { getPlan } from "../requests";
import { setPlan } from "../../../redux/plan";
import useModal from "../../shared/hooks/useModal";

const Plans = ({ isEmbed = false, packId = null, newPlan = false, setNewPlan }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const sessionStoreRedux = useSelector((store) => store.session);

  const { plans, filters, setFilters, pagination, setPagination, loading, refetch } = usePlans(null, packId, null);

  const [page, setPage] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState({});
  const [calendar, setCalendar] = useState({});

  const [planId, setPlanId] = useState(null);
  const [isOpenManagePlansModal, openManagePlansModal, closeManagePlansModal] = useModal();

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
    closuredate: moment(moment().format("YYYY/MM/DD"), "YYYY/MM/DD"),
    startdate: moment(moment().format("YYYY/MM/DD"), "YYYY/MM/DD"),
  });

  useEffect(() => {
    setPlan(selectedPlan)(dispatch);
  }, [selectedPlan]);

  useEffect(() => {
    if (newPlan) {
      openManagePlansModal();
    }
  }, [newPlan]);

  useEffect(() => {
    if (calendar?.start) {
      openManagePlansModal();
    }
  }, [calendar]);

  useEffect(() => {
    setPlanId(selectedPlan?._id);
    if (selectedPlan?._id) openManagePlansModal();
  }, [selectedPlan]);

  return (
    <>
      {page === "all" && (
        <div>
          {!isEmbed && (
            <PlansHeader primaryAction={<AddUserButton refetch={refetch} initialValues={initialValues} />} />
          )}
          <CalendarPlan setCalendar={setCalendar} eventos={plans} setSelectedPlan={setSelectedPlan} />
        </div>
      )}
      {/*
      page === "one" && (
        <div>
          <PlanHeader
            setPage={setPage}
            selectedPlan={selectedPlan}
            handleEdit={handleEdit}
            setSubpage={setSubpage}
            handleArchived={handleArchived}
          />
          {subpage === "1" && (
            <div style={{ padding: 20 }}>
              <TransContainer isEmbed="true" planId={planId} />
            </div>
          )}
          {subpage === "2" && (
            <div style={{ padding: 20 }}>
              <AppsTable planId={selectedPlan._id} />
            </div>
          )}
        </div>
          )
          */}

      <ManagePlanCalendarModal
        refetch={refetch}
        planId={planId}
        setPlanId={setPlanId}
        closeModal={closeManagePlansModal}
        openModal={isOpenManagePlansModal}
        initialValues={initialValues}
        plans={plans}
        selectedPlan={selectedPlan}
        setSelectedPlanMain={setSelectedPlan}
        setPlan={setPlan}
        getPlan={getPlan}
        session={sessionStoreRedux.currentSession}
        calendar={calendar}
        packId={packId}
        setCalendar={setCalendar}
        t={t}
        newPlan={newPlan}
        setNewPlan={setNewPlan}
      />
    </>
  );
};

export default Plans;
