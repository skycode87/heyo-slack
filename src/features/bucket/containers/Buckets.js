import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";

import ActionBar from "../../shared/components/ActionBar";
import BucketsTable from "../components/BucketsTable";
import BucketsCard from "../components/BucketsCard";

import SearchBucketsForm from "../components/SearchBucketForm";
import ActionsUsers from "../components/ActionsBucket";
import ManageBucketModal from "../components/ManageBucketModal";
import AddUserButton from "../components/AddBucketButton";
import BucketsHeader from "../components/BucketsHeader";
import ManageBucketModal2 from "../components/ManageBucketModal2";

// HELPERS
import showGlobalNotification from "../../../helpers/showGlobalNotification";

// REDUX
import { setBucket, setBucketRedux } from "../../../redux/bucket";

// REQUEST
import { getBucket, archivedBucket, activeBucket } from "../requests";

// HOOKS
import useBuckets from "../hooks/useBuckets";
import useModal from "../../shared/hooks/useModal";

// CONSTANTS
import { globals, numbers } from "../../../constants/globals";

const Buckets = ({ isEmbed = false, packId = null, planId = null, userId = null, handleEditBucket = null }) => {
  const dispatch = useDispatch();
  const sessionStoreRedux = useSelector((store) => store.session);
  const { t, i18n } = useTranslation();

  const { buckets, filters, setFilters, pagination, setPagination, loading, refetch } = useBuckets(
    packId,
    planId,
    userId
  );

  const commonProps = { filters, setFilters };
  const [page, setPage] = useState(globals.PAGE_MAIN);
  const [selectedBucket, setSelectedBucket] = useState({});
  const [containerMode, setContainerMode] = useState("cards");

  const [bucketId, setBucketId] = useState(null);
  const [isOpenManageBucketsModal, openManageBucketsModal, closeManageBucketsModal] = useModal();
  const [isOpenManageBucketModal2, openManageBucketModal2, closeManageBucketModal2] = useModal();

  const [isOpenDetailsBucketModal, openDetailsBucketModal, closeDetailsBucketModal] = useModal();

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
    setBucket(selectedBucket)(dispatch);
  }, [selectedBucket]);

  const handleEdit = (bucket) => {
    setSelectedBucket(bucket);
    setBucketId(bucket._id);
    openManageBucketModal2();
  };

  const handleDetails = (bucket) => {
    getBucket(bucket._id, {
      onSuccess: (response) => {
        setBucketRedux(response.result);
        setSelectedBucket(response.result);
        openDetailsBucketModal();
      },
      onError: () => showGlobalNotification("error", t("errorTitle"), t("errorDescription")),
    });
  };

  const handleArchivedConfirm = (bucket) => {
    archivedBucket(
      {
        bucket,
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

  const handleArchived = (bucket) => {
    setBucketId(bucket._id);
    confirmAlert({
      title: `Eliminar ${bucket.image}`,
      message: `Esta seguro que desea eliminar ?`,
      buttons: [
        {
          label: t("yes"),
          onClick: () => handleArchivedConfirm(bucket),
        },
        {
          label: t("no"),
          onClick: () => {},
        },
      ],
    });
  };

  const handleReverseConfirm = (bucket) => {
    activeBucket(
      {
        bucket,
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

  const handleReverse = (bucket) => {
    setBucketId(bucket._id);
    confirmAlert({
      title: "Desea reversar el Pago",
      buttons: [
        {
          label: t("yes"),
          onClick: () => handleReverseConfirm(bucket),
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
            <BucketsHeader
              t={t}
              primaryAction={
                <AddUserButton
                  isOpenManageBucketsModal={isOpenManageBucketsModal}
                  openManageBucketsModal={openManageBucketsModal}
                  containerMode={containerMode}
                  setContainerMode={setContainerMode}
                />
              }
            />
          )}
          <ActionBar {...commonProps} options={{ actions: buckets?.length > 0 && ActionsUsers }}>
            <SearchBucketsForm {...commonProps} refetch={refetch} />
          </ActionBar>
          {containerMode === "table" && (
            <BucketsTable
              {...commonProps}
              buckets={buckets}
              pagination={pagination}
              setPagination={setPagination}
              loading={loading}
              refetch={refetch}
              initialValues={initialValues}
              setPage={setPage}
              setSelectedBucket={setSelectedBucket}
              selectedBucket={selectedBucket}
              handleDetails={handleDetails}
              handleEdit={handleEdit}
              details={handleDetails}
              handleArchived={handleArchived}
              handleReverse={handleReverse}
              openDetailsBucketModal={openDetailsBucketModal}
              t={t}
            />
          )}
          {containerMode === "cards" && (
            <BucketsCard
              {...commonProps}
              buckets={buckets}
              pagination={pagination}
              setPagination={setPagination}
              loading={loading}
              refetch={refetch}
              initialValues={initialValues}
              setPage={setPage}
              setSelectedBucket={setSelectedBucket}
              selectedBucket={selectedBucket}
              handleDetails={handleDetails}
              handleEdit={handleEdit}
              details={handleDetails}
              handleArchived={handleArchived}
              handleReverse={handleReverse}
              openDetailsBucketModal={openDetailsBucketModal}
            />
          )}
        </div>
      )}

      <ManageBucketModal
        refetch={refetch}
        bucketId={bucketId}
        setBucketId={setBucketId}
        closeModal={closeManageBucketsModal}
        openModal={isOpenManageBucketsModal}
        t={t}
      />

      <ManageBucketModal2
        bucketId={bucketId}
        refetch={refetch}
        openModal={isOpenManageBucketModal2}
        closeModal={closeManageBucketModal2}
        setBucketId={setBucketId}
      />
    </>
  );
};

export default Buckets;
