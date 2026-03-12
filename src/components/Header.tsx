import type { PageType } from "../App";

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType, projectId?: string) => void;
}

export default function Header({}: HeaderProps) {
  return null;
}