import pool from "../config/db.js";
import db from "../config/db.js";

export const addToCart = async (req, res) => {
    try {

        const userId = req.user.id;

        const {
            product_id,
            variation_id,
            qty
        } = req.body;

        const [product] = await db.query(
    "SELECT price, discount_price FROM products WHERE id=?",
    [product_id]
);

        if (!product.length) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }

        const price = product[0].discount_price || product[0].price;

        const [exists] = await db.query(
            `SELECT * FROM cart
             WHERE user_id=?
             AND product_id=?
             AND variation_id <=> ?`,
            [
                userId,
                product_id,
                variation_id
            ]
        );

        if(exists.length){

            await db.query(
                `UPDATE cart
                 SET qty=qty+?
                 WHERE id=?`,
                [
                    qty,
                    exists[0].id
                ]
            );

        }else{

            await db.query(
                `INSERT INTO cart
                (
                    user_id,
                    product_id,
                    variation_id,
                    qty,
                    price
                )
                VALUES(?,?,?,?,?)`,
                [
                    userId,
                    product_id,
                    variation_id,
                    qty,
                    price
                ]
            );

        }

        res.json({
            success:true,
            message:"Added to cart"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success:false
        });

    }
};

export const getCart = async (req,res)=>{

    try{

        const [cart]=await db.query(`
            SELECT
            cart.*,
            products.name,
            products.thumbnail
            FROM cart

            JOIN products
            ON products.id=cart.product_id

            WHERE cart.user_id=?
        `,[req.user.id]);

        res.json({
            success:true,
            data:cart
        });

    }catch(err){

        console.log(err);

        res.status(500).json({
            success:false
        });

    }

}

export const updateCart = async(req,res)=>{

    try{

        await db.query(
            `UPDATE cart
             SET qty=?
             WHERE id=?`,
            [
                req.body.qty,
                req.params.id
            ]
        );

        res.json({
            success:true
        });

    }catch(err){

        console.log(err);

        res.status(500).json({
            success:false
        });

    }

}

export const deleteCart = async(req,res)=>{

    try{

        await db.query(
            "DELETE FROM cart WHERE id=?",
            [req.params.id]
        );

        res.json({
            success:true
        });

    }catch(err){

        console.log(err);

        res.status(500).json({
            success:false
        });

    }

}

export const clearCart = async(req,res)=>{

    try{

        await db.query(
            "DELETE FROM cart WHERE user_id=?",
            [req.user.id]
        );

        res.json({
            success:true
        });

    }catch(err){

        console.log(err);

        res.status(500).json({
            success:false
        });

    }

}