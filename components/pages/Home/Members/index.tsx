"use client";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import React, { useEffect } from "react";
import MemberList from "@/components/common/MemberList";
import Heading from "@/components/Text/Heading";
import MemberCard from "@/components/MemberCard/MemberCard";
import { ClientMember } from "@/Types/types";
import { Loader2 } from "lucide-react";

const Members = () => {
  return (
    <div className="bg-gray-50 w-screen flex justify-center mt-20">
      <SectionWrapper>
        <div className="py-20 flex flex-col gap-16 items-center">
          <Heading variant="medium" className="text-center">
            Meet our core members
          </Heading>
          {/* <MemberList members={membersData} Component={MemberCard}/> */}
          <MemberListMap />
        </div>
      </SectionWrapper>
    </div>
  );
};
const MemberListMap = () => {
  const [members, setMembers] = React.useState<ClientMember[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [iserror, setIsError] = React.useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          "/api/public/members?committee=core",
          {
            cache: "no-store",
          }
        );
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
          className=" aspect-square animate-spin"
          height={40}
          width={40}
        />
        ;
      </div>
    );
  }

  return <MemberList members={members} Component={MemberCard} />;
};

export default Members;
