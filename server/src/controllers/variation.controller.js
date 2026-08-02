import { createVariationItem } from "../models/variationItem.model.js";

import {
  getVariations,
  getVariationValues,
  createVariation,
  insertVariationValues,
  deleteVariation,
} from "../models/variation.model.js";

// ======================================
// Get All Variations by Product
// ======================================

export const getProductVariations = async (req, res) => {
  try {
    const { productId } = req.params;

    const variations = await getVariations(productId);

    for (const variation of variations) {
      variation.attributes = await getVariationValues(
        variation.id
      );
    }

    res.json({
      success: true,
      data: variations,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Create Variation
// ======================================

export const createProductVariation = async (
  req,
  res
) => {

  try {

    const {
      product_id,
      sku,
      price,
      discount_price,
      stock,
      image,
      status,
      attributes,
    } = req.body;

    const variationId =
      await createVariation({
        product_id,
        sku,
        price,
        discount_price,
        stock,
        image,
        status,
      });

    if (
      attributes &&
      Array.isArray(attributes)
    ) {

      await insertVariationValues(
        variationId,
        attributes
      );

    }

    res.status(201).json({
      success: true,
      message: "Variation Created Successfully",
      variationId,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================================
// Delete Variation
// ======================================

export const removeVariation = async (
  req,
  res
) => {

  try {

    await deleteVariation(req.params.id);

    res.json({
      success: true,
      message: "Variation Deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const cartesian = (arrays) => {

  return arrays.reduce(

    (a, b) =>
      a.flatMap((d) =>
        b.map((e) => [...d, e])
      ),

    [[]]

  );

};

export const generateVariations = async (
  req,
  res
) => {

  try {

    const {

      product_id,
      attributes,

    } = req.body;

    await deleteProductVariations(product_id);

    const combinations = cartesian(attributes);

    for (const combo of combinations) {

      const sku =
        combo
          .map((i) => i.value.substring(0,3).toUpperCase())
          .join("-");

      const variationId =
        await createVariation({

          product_id,

          sku,

          price:0,

          discount_price:0,

          stock:0,

          status:1,

        });

      await insertVariationValues(
        variationId,
        combo
      );

    }

    res.json({

      success:true,

      message:"Variations Generated"

    });

  }

  catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};
// ======================================
// save Variations
// ======================================
export const saveVariations = async (req, res) => {
  try {
    const { product_id, variations } = req.body;

    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!Array.isArray(variations)) {
      return res.status(400).json({
        success: false,
        message: "Variations must be an array",
      });
    }

    console.log("Product:", product_id);
    console.log("Variations:", variations);

    for (const variation of variations) {
      const variationId = await createVariation({
        product_id,
        sku: variation.sku || "",
        price: variation.price || 0,
        discount_price: variation.discount_price || null,
        stock: variation.stock || 0,
        image: variation.image || "",
        status: variation.status ?? 1,
      });

      if (Array.isArray(variation.attributes)) {
        for (const item of variation.attributes) {
          await createVariationItem({
            variation_id: variationId,
            attribute_id: item.attribute_id,
            attribute_value_id: item.id,
          });
        }
      }
    }

    return res.json({
      success: true,
      message: "Variations Saved",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
};