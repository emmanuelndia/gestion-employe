import {
  GridIcon,
  UserCircleIcon,
  ListIcon,
  ClockIcon,
  CheckCircleIcon,
  UsersIcon,
  SettingsIcon,
  DocsIcon,
  DashboardIcon,
  ChartBarIcon,
  CogIcon,
  LocationIcon,
  CalenderIcon,
} from '@/icons';
import { SidebarItem } from '@/types/components/sidebar';
import { BlocksIcon } from 'lucide-react';

// Navigation pour les administrateurs (ADMIN) - NFC Cards Management
export const adminNavigation: SidebarItem[] = [
  {
    icon: DashboardIcon,
    name: 'Tableau de bord',
    path: '/admin',
  },
  {
    icon: DocsIcon,
    name: 'Employés',
    path: '/admin/employees',
  },
  {
    icon: UsersIcon,
    name: 'Utilisateurs',
    path: '/admin/users',
  },
  /* {
    icon: ChartBarIcon,
    name: 'Statistiques',
    path: '/admin/statistics',
  }, */
  {
    icon: CalenderIcon,
    name: 'Congés',
    path: '/admin/conges',
  },
  {
    icon: ClockIcon,
    name: 'Présences',
    path: '/admin/presences',
  },
  /* {
    icon: SettingsIcon,
    name: 'Paramètres',
    path: '/admin/settings',
  }, */
];



// Navigation pour les utilisateurs normaux (USER) - Clients
export const userNavigation: SidebarItem[] = [
  {
    icon: DashboardIcon,
    name: 'Tableau de bord',
    path: '/user',
  },
  {
    icon: CalenderIcon,
    name: 'Mes Congés',
    path: '/user/conges',
  },
];

// Fonction utilitaire pour obtenir la navigation selon le rôle
export const getNavigationByRole = (role?: string): SidebarItem[] => {
  switch (role?.toUpperCase()) {
    case 'ADMIN':
      return adminNavigation;
    case 'USER':
      return userNavigation;
    default:
      return userNavigation; // Par défaut, navigation utilisateur
  }
};

// Fonction pour vérifier si un chemin est accessible par un rôle
export const isPathAccessibleByRole = (path: string, role?: string): boolean => {
  const navigation = getNavigationByRole(role);
  
  const checkPath = (items: SidebarItem[]): boolean => {
    for (const item of items) {
      if (item.path === path) return true;
      if (item.subItems && checkPath(item.subItems)) return true;
    }
    return false;
  };
  
  return checkPath(navigation);
};

// Fonction pour obtenir le chemin par défaut selon le rôle
export const getDefaultPathByRole = (role?: string): string => {
  switch (role?.toUpperCase()) {
    case 'ADMIN':
      return '/admin';
    case 'USER':
      return '/user';
    default:
      return '/auth/signin';
  }
};