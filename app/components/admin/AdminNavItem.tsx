import { IconType } from "react-icons/lib";

interface AdminNavItemProps {
selected?: boolean;
icon: IconType;
label: string;
}





const AdminNavItem: React.FC<AdminNavItemProps> = ({
    selected,
    icon: Icon,
    label,
}) => {
return <div className={`
flex 
items-center 
justify-center
text-center
 gap-1
  p-2
  border-b-2
  hover:text-slate-800
  transition
  curosr-pointer
  ${selected ? 'text-slate-800 border-slate-800' : 'text-slate-500 border-transparent'}
`}>
    <Icon size={20} />
    <div className="font-medium text-sm text-center break-normal">
        {label}
    </div>
</div>    
}
 
export default AdminNavItem;