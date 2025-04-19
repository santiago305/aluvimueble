import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import TableViewGeneral from './dashboard/tableViewGeneral';
import { TableNavGeneral } from './dashboard/tableNavGeneral';
import { TableBlogTopGeneral } from './dashboard/tableBlogTop.General';
import { TableDepartmentsGeneral } from './dashboard/tableDepartmentsGeneral';
import { ViewListProps } from '@/types/view';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ views, filter }:ViewListProps) {
    
    const [currentFilter, setCurrentFilter] = useState(filter);

    const applyFilter = (selectedFilter: 'dias' | 'meses' | 'todo') => {
        setCurrentFilter(selectedFilter);
        if (selectedFilter === 'dias') {
            router.get('/dashboard');
        } else {
            router.get('/dashboard', { filter: selectedFilter });
        }
      };
      
    // aca formatearemos los datos de fecha
    const formatDate = (dateString: string): string => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("es-ES");
    };
    {/* <div>
        {Array.isArray(views) && views.map((view) => (
            <li key={view.id}>
            {formatDate(view.viewed_at)}
            </li>
        ))}
    </div> */}

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className='flex w-full p-4 gap-2 justify-end'>
                <button 
                className="p-1 text-sm rounded-sm bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                onClick={() => applyFilter('dias')}>
                    Últimos 50 días
                </button>
                <button 
                className="p-1 text-sm rounded-sm bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                onClick={() => applyFilter('meses')}>
                    Últimos 30 meses
                </button>
                <button 
                className="p-1 text-sm rounded-sm bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                onClick={() => applyFilter('todo')}>
                    Agrupar por año
                </button>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative  overflow-hidden rounded-xl border">
                        {/* <TableDepartmentsGeneral views = {views} /> */}
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                        <TableBlogTopGeneral />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                        <TableNavGeneral />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <TableViewGeneral />
                </div>
            </div>
        </AppLayout>
    );
}
