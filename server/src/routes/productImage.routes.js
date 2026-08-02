export const getProductImages = async (req, res) => {
  try {
    const images = await getImages(req.params.productId);

    res.json({
      success: true,
      data: images,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};