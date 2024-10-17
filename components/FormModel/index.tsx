// import React, { ReactNode, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// interface FormModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   children: ReactNode;
//   onSubmit: () => Promise<void>;
//   submitButtonText?: string;
// }

// export const FormModal: React.FC<FormModalProps> = ({
//   isOpen,
//   onClose,
//   title,
//   children,
//   // onSubmit,
//   submitButtonText = "Submit",
// }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     try {
//       await onSubmit();
//       onClose();
//     } catch (error) {
//       console.error("Error during submission:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//         </DialogHeader>
//         <div className="py-4">{children}</div>
//         <DialogFooter>
//           <Button type="button" variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={isLoading}>
//             {isLoading ? "Processing..." : submitButtonText}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };




import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  // onSubmit: () => void; // Changed from Promise<void> to void
  submitButtonText?: string;
}

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  // onSubmit,
  // submitButtonText = "Submit",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">{children}</div>
        {/* <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>{submitButtonText}</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};