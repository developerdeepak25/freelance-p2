import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Mail,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React from "react";
import { format } from "date-fns";
import {  EditButton } from "@/components/buttons/ModifiedButton";
import EditMemberModal from "../EditMemberModal";
import MemberDeletionButton from "../MemberDeletionButton";

// Define Member type (from your backend data structure)
export type Member = {
  _id: string;
  name: string;
  email: string;
  phoneNo?: string;
  photo?: FileList;
  panCardNo?: string;
  aadharCardNo?: string;
  dateOfBirth?: Date;
  caste?: string;
  designation: string;
  profession?: string;
  committee: string;
  socialLinks: SocialLink[];
};

type SocialLink = {
  platform: string;
  url: string;
};

// The table component
export default function AdminMembersTable({ data }: { data: Member[] }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageSize, setPageSize] = React.useState(5);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [filterCommittee, setFilterCommittee] = React.useState("All");
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editMemeber, setEditMember] = React.useState<Member | null>(null);

  // Define columns for the Member table
  const columns: ColumnDef<Member>[] = [
    {
      header: "Serial",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.name || "N/A",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.original.email;
        const maxLength = 15; // Adjust this value as needed

        return email ? (
          <a
            href={`mailto:${email}`}
            className="flex items-center hover:text-primary"
          >
            <Mail className="mr-2 h-4 w-4" />
            {email.length > maxLength ? (
              <span title={email}>{email.substring(0, maxLength)}...</span>
            ) : (
              email
            )}
          </a>
        ) : (
          "N/A"
        );
      },
    },
    {
      accessorKey: "phoneNo",
      header: "Phone Number",
      cell: ({ row }) => row.original.phoneNo || "N/A",
    },
    {
      accessorKey: "panCardNo",
      header: "Pan Card Number",
      cell: ({ row }) => row.original.panCardNo || "N/A",
    },
    {
      accessorKey: "aadharCardNo",
      header: "Aadhar Card Number",
      cell: ({ row }) => row.original.aadharCardNo || "N/A",
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
      cell: ({ row }) => {
        const DOB = row.original.dateOfBirth;
        return DOB ? format(DOB, "dd/MM/yyyy") : "N/A";
      },
    },
    {
      accessorKey: "caste",
      header: "Caste",
      cell: ({ row }) => row.original.caste || "N/A",
    },
    {
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }) => row.original.designation || "N/A",
    },
    {
      accessorKey: "profession",
      header: "Profession",
      cell: ({ row }) => row.original.profession || "N/A",
    },
    {
      accessorKey: "committee",
      header: () => (
        <div className="flex items-center">
          {/* Committee */}
          <Select
            value={filterCommittee}
            onValueChange={setFilterCommittee}
            // className="ml-2"
          >
            <SelectTrigger className=" border-none p-0 gap-1 ">
              <SelectValue placeholder="All Committees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">committee</SelectItem>
              <SelectItem value="EXECUTIVE">Executive</SelectItem>
              <SelectItem value="GENERAL">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
      cell: ({ row }) => row.original.committee || "N/A",
    },
    {
      accessorKey: "socialLinks",
      header: "Social Links",
      cell: ({ row }) =>
        row.original.socialLinks?.length > 0 ? (
          <>
            <div className="flex flex-col">
              {row.original.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-primary"
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  {link.platform}
                </a>
              ))}
            </div>
          </>
        ) : (
          "N/A"
        ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <>
          <div className="flex gap-2">
            <EditButton
              size={"icon"}
              onClick={() => {
                console.log("clicked");
                setIsEditModalOpen(true);
                setEditMember(row.original);
              }}
            />
           <MemberDeletionButton memberId={row.original._id}/>
          </div>
        </>
      ),
    },
  ];

  // Filter data based on committee selection
  const filteredData = React.useMemo(() => {
    if (filterCommittee === "All") return data;
    return data.filter((member) => member.committee === filterCommittee);
  }, [data, filterCommittee]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      pagination: {
        pageSize: pageSize,
        pageIndex: pageIndex,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
  });

  return (
    <>
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-end">
          <Select
            value={pageSize === data.length ? "0" : pageSize.toString()}
            onValueChange={(value) => {
              const size = parseInt(value);
              setPageSize(size === 0 ? data.length : size);
              table.setPageSize(size === 0 ? data.length : size);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select rows per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 rows</SelectItem>
              <SelectItem value="10">10 rows</SelectItem>
              <SelectItem value="0">All rows</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2 flex">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="flex items-center gap-1">
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditMemberModal
          setIsModalOpen={setIsEditModalOpen}
          isModalOpen={isEditModalOpen}
          memberData={editMemeber!}
        />
      )}
    </>
  );
}
