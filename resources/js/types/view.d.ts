export interface View {
    id: number;
    ip: string;
    route: string;
    viewed_at: string;
    device_type: string | null;
    browser: string | null;
    country: string | null;
    region: string | null;
    city: string | null;
}
export interface ViewProps {
    view: View
}

export interface ViewListProps {
    views: View[] ;
    filter?: string;
}
