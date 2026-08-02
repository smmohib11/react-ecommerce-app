import pool from "../config/db.js";

// =====================================
// Get All Shipping Zones
// =====================================
export const getShippingZones = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM shipping_zones ORDER BY sort_order ASC,id DESC"
    );

    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================
// Get Single Shipping Zone
// =====================================
export const getShippingZone = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM shipping_zones WHERE id=?",
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Shipping Zone not found",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });

  } catch (err) {

    res.status(500).json({
      success:false,
      message:err.message,
    });

  }
};

// =====================================
// Create Shipping Zone
// =====================================
export const createShippingZone = async (req,res)=>{

try{

const{
name,
courier_name,
inside_city,
outside_city,
charge,
min_order,
free_shipping,
delivery_days,
sort_order,
status
}=req.body;

await pool.query(
`
INSERT INTO shipping_zones
(
name,
courier_name,
inside_city,
outside_city,
charge,
min_order,
free_shipping,
delivery_days,
sort_order,
status
)
VALUES(?,?,?,?,?,?,?,?,?,?)
`,
[
name,
courier_name,
inside_city,
outside_city,
charge,
min_order,
free_shipping,
delivery_days,
sort_order,
status
]
);

res.status(201).json({
success:true,
message:"Shipping Zone Created"
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};

// =====================================
// Update Shipping Zone
// =====================================
export const updateShippingZone=async(req,res)=>{

try{

const{
name,
courier_name,
inside_city,
outside_city,
charge,
min_order,
free_shipping,
delivery_days,
sort_order,
status
}=req.body;

await pool.query(
`
UPDATE shipping_zones
SET

name=?,
courier_name=?,
inside_city=?,
outside_city=?,
charge=?,
min_order=?,
free_shipping=?,
delivery_days=?,
sort_order=?,
status=?

WHERE id=?
`,
[
name,
courier_name,
inside_city,
outside_city,
charge,
min_order,
free_shipping,
delivery_days,
sort_order,
status,
req.params.id
]
);

res.json({
success:true,
message:"Shipping Updated"
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};

// =====================================
// Delete Shipping Zone
// =====================================
export const deleteShippingZone=async(req,res)=>{

try{

await pool.query(
"DELETE FROM shipping_zones WHERE id=?",
[req.params.id]
);

res.json({
success:true,
message:"Deleted Successfully"
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};