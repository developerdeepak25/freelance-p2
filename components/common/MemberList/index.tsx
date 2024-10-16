"use client";
import { cn } from "@/utils/taliwind";

interface MemberData {
  name: string;
  role?: string;
  imageUrl: string;
}

interface MemberListProps {
  members: MemberData[];
  className?: string;
  Component: React.ComponentType<MemberData>;
}

const MemberList: React.FC<MemberListProps> = ({
  members,
  className,
  Component,
}) => {
  return (
    <div
      className={cn(
        "flex sm:gap-20 gap-16 flex-wrap justify-around ",
        className
      )}
    >
      {members.map((member, index) =>
        Component ? <Component key={index} {...member} /> : null
      )}
    </div>
  );
};

export default MemberList;
