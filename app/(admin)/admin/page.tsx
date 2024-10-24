"use client";
import { AddButton } from "@/components/buttons/ModifiedButton";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import AdminMembersTable, {
  Member,
} from "@/components/pages/Member/AdminMembersTable";
import MemberCreateModal from "@/components/pages/Member/CreateMemberModal";
import Heading from "@/components/Text/Heading";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <SectionWrapper className="pt-40 pb-40">
      <div className="flex max-sm:flex-col flex-row justify-between max-sm:items-start items-center  gap-3 pb-2">
        <Heading variant="medium" >
          Admin Members Manager
        </Heading>
        <AddButton onClick={() => setIsModalOpen(true)}>Add</AddButton>
      </div>
      <div className="py-20 flex flex-col gap-16 items-center">
        <AdminMembersTableMap />
      </div>

      <MemberCreateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </SectionWrapper>
  );
};

const AdminMembersTableMap = () => {
  const [members, setMembers] = React.useState<Member[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [iserror, setIsError] = React.useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch("/api/members", {
          cache: "no-store",
        });
        // const data = await response.json();
        const data = await response.json();
        // console.log(response, data);
        setMembers(data);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (iserror) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Heading variant="small">Something went wrong!!</Heading>;
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2
          className=" aspect-square animate-spin"
          height={40}
          width={40}
        />
        ;
      </div>
    );
  }
  return <AdminMembersTable data={members} />;
};

export default Admin;
