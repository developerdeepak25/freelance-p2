import { DeteteButton } from "@/components/buttons/ModifiedButton";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const MemberDeletionButton = ({ memberId }: { memberId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/members/${memberId}`);

      if (res.status !== 200 && res.status !== 204 && res.status !== 201) {
        toast.error("Error deleting member");
        return;
      }

      toast.success("Member deleted successfully");
      // Optionally, you can add a function to update the gallery list after deletion
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          const errMessage = error.response?.data?.error;
          console.log(errMessage);
          if (errMessage) {
            return toast.error(errMessage);
          }
        }
      }
      toast.error("Error deleting member");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DeteteButton
      size={"icon"}
      onClick={handleDelete}
      isLoading={isLoading}
      disabled={isLoading}
    />
  );
};

export default MemberDeletionButton;
