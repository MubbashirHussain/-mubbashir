import React from "react";
export interface NavItem {
  id: string;
  label: string;
  href: string;
  iconName: React.ReactNode;
}

interface SidebarNavProps {
  items: NavItem[];
  activeId: string;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  items,
  activeId,
  onLinkClick,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => onLinkClick(e, item.id)}
            className={`
              group flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out cursor-pointer
              ${
                isActive
                  ? "bg-primary-100  border border-primary-300 translate-x-2 lg:translate-x-0"
                  : "border border-transparent hover:bg-secondary-50  hover:translate-x-1"
              }
            `}
          >
            <span
              className={`
                material-symbols-outlined text-2xl transition-colors duration-300
                ${
                  isActive
                    ? "text-text-main"
                    : "text-text-muted"
                }
              `}
            >
              {item.iconName}
            </span>
            <p
              className={`
                text-base leading-normal transition-colors duration-300
                ${
                  isActive
                    ? "text-text-main font-bold"
                    : "text-text-muted font-medium group-hover:text-text-main"
                }
              `}
            >
              {item.label}
            </p>
          </a>
        );
      })}
    </div>
  );
};

export default SidebarNav;
