import * as React from "react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Mail,
  Link as LinkIcon} from "lucide-react";
import { ClientMember } from "@/Types/types";
import TableStructure from "../common/TableStructure";

const columns: ColumnDef<ClientMember>[] = [
  {
    header: "Serial",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <a
        href={`mailto:${row.original.email}`}
        className="flex items-center hover:text-primary"
      >
        <Mail className="mr-2 h-4 w-4" />
        {row.original.email}
      </a>
    ),
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
    accessorKey: "designation",
    header: "Designation",
  },
];

export default function MembersTable({ data }: { data: ClientMember[] }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageSize, setPageSize] = React.useState(5);
  const [pageIndex, setPageIndex] = React.useState(0);

  const table = useReactTable({
    data,
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
    <TableStructure
      table={table}
      pageSize={pageSize}
      setPageSize={setPageSize}
    />
  );
}
