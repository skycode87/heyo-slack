import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ActionBar from "../../shared/components/ActionBar";

import PlansTable from "../components/PlansTable";
import SearchPlansForm from "../components/SearchPlansForm";
import usePlans from "../hooks/usePlans";

import { setPlan } from "../../../redux/plan";

const Plans = ({ details }) => {
  const dispatch = useDispatch();

  const { plans, filters, setFilters, pagination, setPagination, loading, refetch } = usePlans();

  const commonProps = { filters, setFilters };
  const [selectedPlan, setSelectedPlan] = useState({});

  const [initialValues, setInitialValues] = useState({
    name: "",
  });

  useEffect(() => {
    setPlan(selectedPlan)(dispatch);
  }, [selectedPlan]);

  const handleDetails = (data) => {};

  return (
    <>
      <div>
        <ActionBar {...commonProps}>
          <SearchPlansForm {...commonProps} refetch={refetch} />
        </ActionBar>
        <PlansTable
          {...commonProps}
          plans={plans}
          pagination={pagination}
          setPagination={setPagination}
          loading={loading}
          refetch={refetch}
          initialValues={initialValues}
          setSelectedPlan={setSelectedPlan}
          selectedPlan={selectedPlan}
          handleDetails={handleDetails}
          details={details}
        />
      </div>
    </>
  );
};

export default Plans;
