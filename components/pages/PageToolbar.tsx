interface PageToolbarProps {
  children: React.ReactNode;
}

const PageToolbar = ({ children }: PageToolbarProps) => {
  return <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">{children}</div>;
};
export default PageToolbar;
