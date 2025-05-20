import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import FormComponent from "../../components/FormComponent";

import { getRestaurants } from "../../services/restaurantService";
import { getProducts } from "../../services/productService";
import { createMenu, updateMenu } from "../../services/menuService";
import { Menu } from "../../models/Menu";

const MenuCreate = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { data } = location.state || {}; // location es un objeto que contiene información sobre la URL actual
    // Recibimos datos enviados por location.state

    // Estados para datos de turnos, conductores y motos
    const [products, setProducts] = useState<any[]>([]);
    const [restaurants, setRestaurants] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [productData, restaurantData,] = await Promise.all([
                    getProducts(),
                    getRestaurants(),
                ]);
                setProducts(productData);
                setRestaurants(restaurantData);
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        }
        fetchData();
    }, []);



    if (!products.length || !restaurants.length) {
        return <p>Cargando datos...</p>;
    }

    const getRestaurantName = (id: number) => {
        const d = restaurants.find((res) => res.id === id);

        return d?.name || "Desconocido";
    };

    const getProductName = (id: number) => {
        const m = products.find((prod) => prod.id === id);
        return m?.name || "Desconocida";
    };

    const labels = [
        { for: "price", text: "Precio", type: "number" },
        {
            for: "restaurant",
            text: "Restaurante",
            type: "select",
            options: restaurants.map((s) => ({
                value: s.id,
                label: `${getRestaurantName(s.id)} `,
            })),
        },
        {
            for: "product",
            text: "Producto",
            type: "select",
            options: products.map((s) => ({
                value: s.id,
                label: `${getProductName(s.id)} `,
            })),
        },
        {
            for: "availability",
            text: "Disponibilidad",
            type: "select",
            options: [
                { value: true, label: "Disponible" },
                { value: false, label: "No disponible" },
            ],
        },
    ];

    const initialValuesProps = {
        price: 1,
        product: data ? data.product.id : products[0].id,
        restaurant: data ? data.restaurant.id : restaurants[0].id,
        availability: true,
    };

    const validationSchema = Yup.object({
        price: Yup.number().min(1, "Debe ser mayor a 0").required("Requerido"),
        restaurant: Yup.number().required("Selecciona un restaurante"),
        product: Yup.number().required("Selecciona un producto"),
        availability: Yup.boolean().required("Selecciona disponibilidad"),
    });

    const handleAction = async (values: any) => {

        const newMenu: Menu = {
            product_id: values.product,
            restaurant_id: values.restaurant,
            price: values.price,
            availability: Boolean(values.availability),
        };


        try {

            const result: any = data ? await updateMenu(data.id, newMenu) : await createMenu(newMenu);
            console.log("Resultado de nuevo menu:", result);

            navigate("/list-menu");

        } catch (error) {
            console.error(error);
            console.log("Error al crear la orden", error);

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

export default MenuCreate;
