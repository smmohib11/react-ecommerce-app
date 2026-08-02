import pool from "../config/db.js";

// ==========================================
// Get Website Settings
// ==========================================
export const getSettings = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM settings LIMIT 1"
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Settings not found",
      });
    }

    return res.json({
      success: true,
      data: rows[0],
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
// Update Website Settings
// ==========================================
export const updateSettings = async (req, res) => {
  console.log("4. Controller Reached");
  console.log(req.body);
  try {
     console.log("===== UPDATE SETTINGS =====");
    console.log(req.body);

    

    const {
      website_name,
      website_title,
      tagline,

      currency,
      shipping_charge,

      phone,
      whatsapp,
      messenger,
      email,
      address,

      facebook,
      instagram,
      youtube,
      twitter,
      linkedin,

      primary_color,
      secondary_color,

      footer_text,

      meta_title,
      meta_description,
      meta_keywords,

      maintenance_mode,
    } = req.body;

    await pool.query(
      `
      UPDATE settings SET

      website_name=?,
      website_title=?,
      tagline=?,

      currency=?,
      shipping_charge=?,

      phone=?,
      whatsapp=?,
      messenger=?,
      email=?,
      address=?,

      facebook=?,
      instagram=?,
      youtube=?,
      twitter=?,
      linkedin=?,

      primary_color=?,
      secondary_color=?,

      footer_text=?,

      meta_title=?,
      meta_description=?,
      meta_keywords=?,

      maintenance_mode=?

      WHERE id=1
      `,
      [
        website_name,
        website_title,
        tagline,

        currency,
        shipping_charge,

        phone,
        whatsapp,
        messenger,
        email,
        address,

        facebook,
        instagram,
        youtube,
        twitter,
        linkedin,

        primary_color,
        secondary_color,

        footer_text,

        meta_title,
        meta_description,
        meta_keywords,

        maintenance_mode,
      ]
    );

    return res.json({
      success: true,
      message: "Settings Updated Successfully",
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }
  
};

// ==========================================
// Upload Logo
// ==========================================
export const updateLogo = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Logo is required",
      });
    }

    const logo = `/uploads/${req.file.filename}`;

    await pool.query(
      "UPDATE settings SET logo=? WHERE id=1",
      [logo]
    );

    return res.json({
      success: true,
      logo,
      message: "Logo Updated",
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// ==========================================
// Upload Favicon
// ==========================================
export const updateFavicon = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Favicon is required",
      });
    }

    const favicon = `/uploads/${req.file.filename}`;

    await pool.query(
      "UPDATE settings SET favicon=? WHERE id=1",
      [favicon]
    );

    return res.json({
      success: true,
      favicon,
      message: "Favicon Updated",
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};