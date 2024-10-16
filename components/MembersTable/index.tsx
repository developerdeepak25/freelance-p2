import * as React from "react";
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

 type Member = {
  id: string | number;
  name: string;
  // imageUrl?: string;
  // role?: string;
  designation?: string;
  sociallinks?: [
    { type : 'twitter' | 'instagram' | 'facebook'; url: string; },
  ]
  email?: string;
};


const data: Member[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    sociallinks: [
      { type: "twitter", url: "https://twitter.com/johndoe" },
    ],
    designation: "Developer",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    sociallinks: [
      { type: "facebook", url: "https://twitter.com/johndoe" },
    ],
    designation: "Designer",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    sociallinks: [
      { type: "twitter", url: "https://twitter.com/johndoe" },
    ],
    designation: "Manager",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    sociallinks: [
      { type: "twitter", url: "https://twitter.com/johndoe" },
    ],
    designation: "Tester",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    sociallinks: [
      { type: "twitter", url: "https://twitter.com/johndoe" },
    ],
    designation: "Analyst",
  },
  {
    id: 6,
    name: "Eva Green",
    email: "eva@example.com",
    sociallinks: [
      { type: "twitter", url: "https://twitter.com/johndoe" },
    ],
    designation: "Developer",
  },
  {
    id: 7,
    name: "David Lee",
    email: "david@example.com",
    sociallinks: [
      { type: "twitter", url: "https://twitter.com/johndoe" },
    ],
    designation: "Designer",
  },
  {
    id: 8,
    name: "Grace Taylor",
    email: "grace@example.com",
    sociallinks: [
      { type: "twitter", url: "https://twitter.com/johndoe" },
    ],
    designation: "Manager",
  },
  {
    id: 9,
    name: "Frank White",
    email: "frank@example.com",
    sociallinks: [
      { type: "twitter", url: "https://twitter.com/johndoe" },
    ],
    designation: "Tester",
  },
  {
    id: 10,
    name: "Helen Davis",
    email: "helen@example.com",
    sociallinks: [
      { type: "twitter", url: "https://twitter.com/johndoe" },
    ],
    designation: "Analyst",
  },
  {
    id: 11,
    name: "Ian Brown",
    email: "ian@example.com",
    sociallinks: [
      { type: "twitter", url: "https://twitter.com/johndoe" },
    ],
    designation: "Developer",
  },
  {
    id: 12,
    name: "Julia Roberts",
    email: "julia@example.com",
    sociallinks: [
      { type: "facebook", url: "https://twitter.com/johndoe" },
    ],
    designation: "Designer",
  },
];

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "id",
    header: "Serial",
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
    accessorKey: "social",
    header: "Social",
    cell: ({ row }) => (
      <a
        href={`${row.original.sociallinks?.[0].url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center hover:text-primary"
      >
        <LinkIcon className="mr-2 h-4 w-4" />
        {row.original.sociallinks?.[0].type}
      </a>
    ),
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
];

export default function MembersTable() {
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
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
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
  );
}
