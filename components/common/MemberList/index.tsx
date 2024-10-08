"use client";
import Member from "@/components/Member";
import { cn } from "@/lib/utils";

interface MemberData {
  name: string;
  role?: string;
  imageUrl: string;
}

interface MemberListProps {
  members: MemberData[];
  className?: string;
}

const MemberList: React.FC<MemberListProps> = ({ members, className }) => {
  return (
    <div
      className={cn("flex gap-20 flex-wrap justify-around px-20", className)}
    >
      {members.map((member, index) => (
        <Member key={index} {...member} />
      ))}
    </div>
  );
};

export default MemberList;
