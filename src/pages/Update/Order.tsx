import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import FormComponent from "../../components/FormComponent";
import { getCustomers } from "../../services/customerServices";
import { getMenus } from "../../services/menuService";
import { createOrder, updateOrder } from "../../services/orderServices";
import { Order } from "../../models/Order";

const OrderUpdate = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const [menus, setMenus] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [ menuData] = await Promise.all([
                    getMenus(),
                ]);
                setMenus(menuData);
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        }
        fetchData();
    }, []);

    if ( !menus.length) {
        return <p>Cargando datos...</p>;
    }
    const getRestaurantName = (id: number) => {
        const m = menus.find((menu) => menu.id === id);
        return m?.restaurant.name || "Desconocida";
    };
    const getProductName = (id: number) => {
        const m = menus.find((menu) => menu.id === id);
        return m?.product.name || "Desconocida";
    };

    const labels = [
        { for: "quantity", text: "Cantidad", type: "number" },
        { for: "totalPrice", text: "Precio Total", type: "number" },
        { for: "status", text: "Estado", type: "text" },
        { for: "motorcycle_id", text: "ID Moto", type: "number" },
        {
            for: "restaurant",
            text: "Restaurante",
            type: "select",
            options: menus.map((s) => ({
                value: s.id,
                label: `${getRestaurantName(s.id)} - ${getProductName(s.id)}`,
            })),
        },
    ];

    const initialValuesProps = {
        quantity: data ? data.quantity : 1,
        totalPrice: data ? data.totalPrice : 0,
        status: data ? data.status : "pendiente",
        motorcycle_id: data ? data.motorcycle_id : 0,
    };

    const validationSchema = Yup.object({
        quantity: Yup.number().min(1, "Debe ser mayor a 0").required("Requerido"),
        totalPrice: Yup.number().min(0, "Debe ser mayor o igual a 0").required("Requerido"),
        status: Yup.string().required("El estado es obligatorio"),
        motorcycle_id: Yup.number().required("Selecciona una moto"),
    });

    const handleAction = async (values: any) => {
        const newOrder: Order = {
            id: data ? data.id : undefined,
            quantity: values.quantity,
            totalPrice: values.totalPrice,
            status: values.status,
            motorcycle_id: values.motorcycle_id,
        };
        try {
            if (data) {
                await updateOrder(data.id, newOrder);
            } else {
                await createOrder(newOrder);
            }
            navigate("/list-order");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {data ? <FormComponent
                mode={2}
                handleUpdate={handleAction}
                initialValuesProps={initialValuesProps}
                validetionSchemaProps={() => validationSchema}
                labels={labels}
            /> :
                <FormComponent
                    mode={1}
                    handleCreate={handleAction}
                    initialValuesProps={initialValuesProps}
                    validetionSchemaProps={() => validationSchema}
                    labels={labels}
                />
            }
        </div>
    );
};

export default OrderUpdate;
