import {

saveSpecifications,

getSpecifications,

deleteSpecifications

}

from "../models/specification.model.js";

export const storeSpecifications=async(req,res)=>{

    try{

        const {product_id,specifications}=req.body;

        await saveSpecifications(

            product_id,

            specifications

        );

        res.json({

            success:true

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

export const indexSpecifications=async(req,res)=>{

    try{

        const rows=await getSpecifications(

            req.params.productId

        );

        res.json(rows);

    }

    catch(err){

        res.status(500).json({

            success:false

        });

    }

};