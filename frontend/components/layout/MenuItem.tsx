'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronDownIcon } from '@/icons';
import { SidebarItem } from '@/types/components/sidebar';

function renderSidebarIcon(
  icon: SidebarItem['icon'],
  className: string,
  fallbackSize: number,
) {
  if (!icon) return null;
  if (React.isValidElement(icon)) return icon;
  if (typeof icon === 'function') return React.createElement(icon as any, { className });
  if (typeof icon === 'object' && icon !== null && 'src' in icon) {
    const src = (icon as any).src;
    const width = (icon as any).width ?? fallbackSize;
    const height = (icon as any).height ?? fallbackSize;
    return <Image src={src} alt="" width={width} height={height} className={className} />;
  }
  return null;
}

interface MenuItemProps {
  item: SidebarItem;
  isActive: boolean;
  isExpanded: boolean;
  isHovered: boolean;
  isMobileOpen: boolean;
  openSubmenu: { type: string; index: number } | null;
  itemIndex: number;
  menuType: 'main' | 'others';
  onSubmenuToggle: (index: number, menuType: 'main' | 'others') => void;
  subMenuRef?: (el: HTMLDivElement | null) => void;
  subMenuHeight?: number;
  // searchParams est passé par AppSidebar pour éviter un double appel useSearchParams
  searchParams?: URLSearchParams;
}

// ─── Sous-composant interne qui utilise useSearchParams ───────────────────────
function SubItemsList({
  item,
  isIconOnly,
  isSubmenuOpen,
  subMenuRef,
  subMenuHeight,
  searchParamsProp,
}: {
  item: SidebarItem;
  isIconOnly: boolean;
  isSubmenuOpen: boolean;
  subMenuRef?: (el: HTMLDivElement | null) => void;
  subMenuHeight?: number;
  searchParamsProp?: URLSearchParams;
}) {
  const pathname = usePathname();
  // Utilise la prop si fournie, sinon appelle le hook (couvert par le Suspense du parent)
  const searchParamsHook = useSearchParams();
  const searchParams = searchParamsProp ?? searchParamsHook;

  const normalizePath = (p: string) => {
    if (!p) return '';
    if (p.length > 1 && p.endsWith('/')) return p.slice(0, -1);
    return p;
  };

  if (!item.subItems || isIconOnly) return null;

  return (
    <div
      ref={subMenuRef}
      className="overflow-hidden transition-all duration-300"
      style={{ height: isSubmenuOpen ? `${subMenuHeight}px` : '0px' }}
    >
      <ul className="mt-2 space-y-1 ml-9">
        {item.subItems.map((subItem) => {
          const raw = String(subItem.path || '');
          const [base, query] = raw.split('?');
          const basePath = normalizePath(base);
          const currentPath = normalizePath(pathname);

          const isSameBase = currentPath === basePath;
          const isNested = currentPath.startsWith(`${basePath}/`);

          let isSubItemActive = false;
          if (isSameBase) {
            if (!query) {
              const status = (searchParams.get('status') || '').trim();
              isSubItemActive = status === '';
            } else {
              const expected = new URLSearchParams(query);
              isSubItemActive = true;
              for (const [k, v] of expected.entries()) {
                if ((searchParams.get(k) || '').trim() !== v) {
                  isSubItemActive = false;
                  break;
                }
              }
            }
          } else if (isNested) {
            isSubItemActive = false;
          }

          return (
            <li key={subItem.name}>
              <Link
                href={subItem.path || '#'}
                className={`menu-dropdown-item flex items-center ${
                  isSubItemActive ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'
                }`}
              >
                <span className="mr-3 flex-shrink-0 flex items-center justify-center">
                  {subItem.icon ? renderSidebarIcon(subItem.icon, 'w-4 h-4', 16) : (
                    <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700" />
                  )}
                </span>
                <span className="flex-1 truncate">{subItem.name}</span>
                <span className="flex items-center gap-1 ml-2 flex-shrink-0">
                  {subItem.new && <span className="menu-dropdown-badge">new</span>}
                  {subItem.pro && <span className="menu-dropdown-badge">pro</span>}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Export : MenuItem enveloppé dans Suspense ────────────────────────────────
export function MenuItem({
  item,
  isActive,
  isExpanded,
  isHovered,
  isMobileOpen,
  openSubmenu,
  itemIndex,
  menuType,
  onSubmenuToggle,
  subMenuRef,
  subMenuHeight,
  searchParams: searchParamsProp,
}: MenuItemProps) {
  const isSubmenuOpen = openSubmenu?.type === menuType && openSubmenu?.index === itemIndex;
  const isIconOnly = !isExpanded && !isHovered && !isMobileOpen;

  if (item.subItems) {
    return (
      <>
        <button
          onClick={() => onSubmenuToggle(itemIndex, menuType)}
          className={`menu-item group ${
            isSubmenuOpen ? 'menu-item-active' : 'menu-item-inactive'
          } cursor-pointer flex items-center ${isIconOnly ? 'justify-center px-0' : 'justify-start'}`}
        >
          <span className={`${isActive ? 'menu-item-icon-active' : 'menu-item-icon-inactive'} ${isIconOnly ? 'mx-0' : ''} flex items-center justify-center`}>
            {renderSidebarIcon(item.icon, 'w-5 h-5', 20)}
          </span>
          {!isIconOnly && (
            <>
              <span className="menu-item-text ml-3">{item.name}</span>
              <span className="ml-auto">
                {renderSidebarIcon(
                  ChevronDownIcon as any,
                  `w-5 h-5 transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180 text-brand-500' : ''}`,
                  20,
                )}
              </span>
            </>
          )}
        </button>
        {/* SubItemsList utilise useSearchParams → couvert par ce Suspense */}
        <Suspense fallback={null}>
          <SubItemsList
            item={item}
            isIconOnly={isIconOnly}
            isSubmenuOpen={isSubmenuOpen}
            subMenuRef={subMenuRef}
            subMenuHeight={subMenuHeight}
            searchParamsProp={searchParamsProp}
          />
        </Suspense>
      </>
    );
  }

  return (
    item.path && (
      <Link
        href={item.path}
        className={`menu-item group flex items-center ${
          isActive ? 'menu-item-active' : 'menu-item-inactive'
        } ${isIconOnly ? 'justify-center px-0' : 'justify-start'}`}
      >
        <span className={`${isActive ? 'menu-item-icon-active' : 'menu-item-icon-inactive'} ${isIconOnly ? 'mx-0' : ''} flex items-center justify-center`}>
          {renderSidebarIcon(item.icon, 'w-5 h-5', 20)}
        </span>
        {!isIconOnly && <span className="menu-item-text ml-3">{item.name}</span>}
      </Link>
    )
  );
}
