"use client";
import CommitteePage from "@/components/common/CommitteePage";
import MembersTable from "@/components/MembersTable";
import Heading from "@/components/Text/Heading";
import { ClientMember } from "@/Types/types";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

const Page = () => {
  return (
    <CommitteePage
      // membersData={ExecutiveMemberData}
      title="General Committee Members"
      // subTitle="Meet the pillors of our organization Meet the pillors of our organization"
    >
      <MemberTableMap />
    </CommitteePage>
    // <SectionWrapper className="pt-40">
    //   <div className="pb-20 flex flex-col gap-16 items-center">
    //     <Heading variant="medium">General committee Members </Heading>
    //     <MemberList members={ExecutiveMemberData} Component={MemberCard} />
    //   </div>
    // </SectionWrapper>
  );
};

const MemberTableMap = () => {
  const [members, setMembers] = React.useState<ClientMember[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [iserror, setIsError] = React.useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch("/api/public/members?committee=general", {
          cache: "no-store",
        });
        // const data = await response.json();
        const data = await response.json();
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
          className="aspect-square animate-spin"
          height={40}
          width={40}
        />
        ;
      </div>
    );
  }

  return <MembersTable data={members} />;
};

export default Page;
