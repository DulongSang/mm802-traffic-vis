import { useParams } from 'react-router-dom';
import { Dashboard as DashboardIcon, Videocam as VideocamIcon } from '@mui/icons-material';

import { SidebarComponent, SidebarItem } from '../components/SidebarComponent';


export function IntersectionCamera() {
  const { id } = useParams<{ id: string }>();

  const sidebarItems: SidebarItem[] = [
    {
      title: 'Live Camera',
      icon: <VideocamIcon />,
      href: `/intersection/camera/${id}`,
    },
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      href: `/intersection/dashboard/${id}`,
    },
  ];

  return (
    <div>
      <h1>Intersection Camera</h1>
    </div>
  );
}
