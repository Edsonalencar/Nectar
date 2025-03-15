import { Flex, Image } from "antd";
import { BasicProps, Header } from "antd/es/layout/layout";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { OrgModal } from "../modais/OrgModal";
import { User } from "@/types/authTypes";
import { UserService } from "@/services/userService/service";
export const HeaderLayout: React.FC<BasicProps & React.RefAttributes<HTMLElement>> = ({children,...rest}) => {
    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState<User>();
    const { user } = useContext(AuthContext);

    const fetchUser = async () => {
        const res = await UserService.getById(user?.id as string);
        setInitialData(res.data);
    };

    useEffect(() => {
        fetchUser();
        console.log("teste")
    },[open, user])

    return (
        <Header className="flex justify-between bg-[#FFFFFF]" {...rest}>
            {children}
            <Flex align="center" className="cursor-pointer pr-6" onClick={()=>setOpen(true)}>
                <span className="font-bold text-primary">Olá {initialData?.profile?.name}</span>
                <Image preview={false} src="/logo.png" height={60} width={60}/>
            </Flex>
            <OrgModal isOpen={open} onClose={() => setOpen(false)} initialData={initialData} />
        </Header>
    );
}