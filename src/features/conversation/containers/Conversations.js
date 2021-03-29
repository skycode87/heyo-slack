import { useState } from "react";
import { useTranslation } from "react-i18next";

// COMPONENTS
import ConversationsTable from "../components/conversationsTable";
import ConversationsHeader from "../components/userHeader";

import MessageTable from "../components/MessageTable";

// HOOKS
import useConversations from "../hooks/useConversations";
import useModal from "../../shared/hooks/useModal";

// CONSTANTS
import { globals, numbers } from "../../../constants/globals";

const Conversations = () => {
  const { t, i18n } = useTranslation();

  const { conversations, filters, setFilters, pagination, setPagination, loading, refetch } = useConversations();

  const commonProps = { filters, setFilters };
  const [page, setPage] = useState(globals.PAGE_MAIN);

  const [subpage, setSubpage] = useState(numbers.ONE);
  const [reload, setReload] = useState(null);

  const [selectedConversation, setSelectedConversation] = useState({});
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenInactiveModal, openInactiveModal, closeInactiveModal] = useModal();

  const [conversationId, setConversationId] = useState(null);
  const [isOpenManageConversationsModal, openManageConversationsModal, closeManageConversationsModal] = useModal();

  const [initialValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    role: "Conversation",
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

  const handleEdit = (Conversation) => {
    setSelectedConversation(Conversation);
    setConversationId(Conversation._id);
    openManageConversationsModal();
  };

  const handleArchived = (Conversation) => {
    setSelectedConversation(Conversation);
    setConversationId(Conversation._id);
    openDeleteModal();
  };

  const handleInactive = (Conversation) => {
    setSelectedConversation(Conversation);
    setConversationId(Conversation._id);
    openInactiveModal();
  };

  const details = (messages1) => {
    console.log(messages1._id);
    setConversationId(messages1._id);
    setReload(Math.floor(Math.random() * (99999 - 666)) + 666);
  };

  return (
    <>
      {reload === null && (
        <div>
          <ConversationsHeader t={t} />

          <ConversationsTable
            {...commonProps}
            conversations={conversations}
            pagination={pagination}
            setPagination={setPagination}
            loading={loading}
            refetch={refetch}
            initialValues={initialValues}
            handleEdit={handleEdit}
            handleArchived={handleArchived}
            handleInactive={handleInactive}
            openDeleteModal={openDeleteModal}
            details={details}
            t={t}
          />
        </div>
      )}

      {reload !== null && (
        <div>
          <a href="#!" onClick={() => setReload(null)}>
            Go Back
          </a>
          <MessageTable
            reload={reload}
            conversationId={conversationId}
            setPage={setPage}
            setSelectedConversation={setSelectedConversation}
            selectedConversation={selectedConversation}
            handleEdit={handleEdit}
            handleArchived={handleArchived}
            handleInactive={handleInactive}
            openDeleteModal={openDeleteModal}
            details={details}
            setReload={setReload}
            t={t}
          />
        </div>
      )}
    </>
  );
};

export default Conversations;
