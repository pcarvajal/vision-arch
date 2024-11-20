interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return <h3 className="text-xl font-semibold">{title}</h3>;
};

export default PageTitle;
