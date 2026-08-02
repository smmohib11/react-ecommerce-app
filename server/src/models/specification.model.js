import pool from "../config/db.js";

export const saveSpecifications = async (
    product_id,
    specifications
) => {

    for (const item of specifications) {

        await pool.query(
            `
            INSERT INTO product_specifications
            (product_id,spec_name,spec_value)
            VALUES(?,?,?)
            `,
            [
                product_id,
                item.spec_name,
                item.spec_value
            ]
        );

    }

};

export const getSpecifications = async (product_id)=>{

    const [rows]=await pool.query(

        `
        SELECT *
        FROM product_specifications
        WHERE product_id=?
        ORDER BY id ASC
        `,
        [product_id]

    );

    return rows;

};

export const deleteSpecifications=async(product_id)=>{

    await pool.query(

        `
        DELETE FROM product_specifications
        WHERE product_id=?
        `,
        [product_id]

    );

};