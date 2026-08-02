import pool from "../config/db.js";

export const createVariationItem = async (data) => {

    const [result] = await pool.query(
        `
        INSERT INTO variation_items
        (
            variation_id,
            attribute_id,
            attribute_value_id
        )
        VALUES(?,?,?)
        `,
        [
            data.variation_id,
            data.attribute_id,
            data.attribute_value_id,
        ]
    );

    return result;
};