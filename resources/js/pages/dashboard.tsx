import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import TableViewGeneral from './dashboard/tableViewGeneral';
import { TableNavGeneral } from './dashboard/tableNavGeneral';
import { TableBlogTopGeneral } from './dashboard/tableBlogTop.General';
import { TableDepartmentsGeneral } from './dashboard/tableDepartmentsGeneral';
import { DashboardProps } from '@/types/view';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ views, filter, regions, topUrls, browsers, deviceData }:DashboardProps
) {
    
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className='flex w-full p-4 gap-2 justify-end'>
                <button 
                className="p-1 text-sm rounded-sm bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                onClick={() => applyFilter('dias')}>
                    Últimos 60 días
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative  overflow-hidden rounded-xl border">
                        <TableDepartmentsGeneral regions={regions} filter={currentFilter} />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                        <TableBlogTopGeneral topUrls={topUrls} filter={currentFilter} />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                        <TableNavGeneral browsers={browsers}  filter={currentFilter} />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <TableViewGeneral deviceData={deviceData} />
                </div>
            </div>
        </AppLayout>
    );
}
