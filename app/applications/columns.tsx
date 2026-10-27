'use client';

import { ColumnDef } from '@tanstack/react-table';
import { features } from '@/lib/table-features';
import { MoreHorizontal, ArrowUpDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { redirect } from 'next/navigation';
import { deleteApplication } from './actions';


export type appSchema = {
  id: string;
  employer: string;
  vacancy: string;
  state: 'pending' | 'reacted';
  date: string;
};

export const columns: ColumnDef<typeof features, appSchema>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'employer',
    header: ({ column }) => {
      return (
        <>
          Employer
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown />
          </Button>
        </>
      );
    },
  },
  {
    accessorKey: 'vacancy',
    header: () => <div className=''>Vacancy</div>,
    // cell: ({ row }) => {
    //   const vacancy = parseFloat(row.getValue('vacancy'));
    //   const formatted = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //   }).format(vacancy);

    //   return <div className='text-right font-medium'>{formatted}</div>;
    // },
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
  {
    id: 'actions',
    header: () => {
      return (
        <Button variant='default' onClick={() => redirect('/applications/-')}>
          <Plus />
        </Button>
      );
    },
    cell: ({ row }) => {
      const r: any = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              {/* <span className='sr-only'>Open menu</span> */}
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>{r.date.toDateString()}</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => redirect(`/applications/${r.id}`)}>
              Update
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => deleteApplication(r.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
