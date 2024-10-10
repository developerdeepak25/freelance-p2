import SectionWrapper from "@/components/Layout/SectionWrapper";
import Heading from "@/components/Text/Heading";
import React from "react";
import MemberList from "../MemberList";
import MemberCard from "@/components/MemberCard/MemberCard";
import { Member } from "@/Types/types";

type CommitteePageProps = {
  membersData: Member[];
  title: string;
  subTitle?: string;
};

const CommitteePage = ({
  membersData,
  title,
  subTitle,
}: CommitteePageProps) => {
  return (
    <SectionWrapper className="pt-40 pb-20">
      <div className="pb-20 flex flex-col gap-16 items-center">
        <div className="flex flex-col gap-3 items-center">
          <Heading variant="medium" className="text-center">
            {title}{" "}
          </Heading>
          {subTitle && (
            <p className="text-my-para font-normal text-center">{subTitle}</p>
          )}
        </div>
        <MemberList members={membersData} Component={MemberCard} />
      </div>
    </SectionWrapper>
  );
};

export default CommitteePage;
