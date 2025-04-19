export interface View {
    id: number;
    ip: string;
    route: string;
    viewed_at: string;
    device_type: 'mobile' | 'tablet' | 'desktop' | null;
    browser: string | null;
    country: string | null;
    region: string | null;
    city: string | null;
  }
  export interface ViewProps {
    view: View;
  }
  
  export interface ViewListProps {
    views: View[];
    filter?: string;
  }
  
  // Agrupación por región
  export interface RegionGroup {
    region: string | null;
    visitors: number;
  }
  
  // Agrupación por URLs más vistas
  export interface UrlGroup {
    route: string;
    visits: number;
  }
  
  // Agrupación por navegador
  export interface BrowserGroup {
    browser: string | null;
    visitors: number;
  }
  
  // Agrupación por día y tipo de dispositivo
  export interface DeviceDailyGroup {
    date: string; // formato 'YYYY-MM-DD'
    desktop: number;
    mobile: number;
    tablet: number;
  }
  export interface DashboardProps {
    views: View[];
    filter?: string;
    regions: RegionGroup[];
    topUrls: UrlGroup[];
    browsers: BrowserGroup[];
    deviceData: DeviceDailyGroup[];
  }