"use client";
import { ClientMember } from "@/Types/types";
import { cn } from "@/utils/taliwind";

// interface Member {
//   name: string;
//   role?: string;
//   imageUrl: string;
// }

interface MemberListProps {
  members: ClientMember[];
  className?: string;
  Component: React.ComponentType<ClientMember>;
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
      {members?.map((member, index) =>
        // Component ? <Component key={index} {...member} /> : null
        Component ? <Component key={index} {...member} /> : null
      )}
    </div>
  );
};

export default MemberList;
