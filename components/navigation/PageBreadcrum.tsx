import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  link?: string;
  icon?: React.ReactNode;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

const PageBreadcrumb = ({ items }: PageBreadcrumbProps) => {
  return (
    <ul className="flex">
      {items.map((item, index) => (
        <li key={index} className="flex space-x-2 text-center">
          {item.link ? (
            <Link href={item.link} className="flex flex-row space-x-2">
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ) : (
            <span>{item.name}</span>
          )}
          {index < items.length - 1 && <span className="pr-2"> / </span>}
        </li>
      ))}
    </ul>
  );
};
export default PageBreadcrumb;
