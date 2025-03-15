import { UserType } from "@/types";
import { Descriptions } from "antd";

interface Props {
    data: UserType;
}

export const OrgDescription: React.FC<Props> = ({data}) => {
 console.log("data", data);
    const items = [
        { label: "Nome", children: data.name },
        { label: "Email", children: data.email },
        { label: "Documento", children: data.document },
        { label: "Telefone", children: data.phone },
    ];

    return (
        <Descriptions
            layout="vertical"
            column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            items={items}
            labelStyle={{ color: "black" }}
            contentStyle={{ color: "gray" }}
        /> 
    );
}