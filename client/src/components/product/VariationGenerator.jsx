import { useEffect, useState } from "react";
import { getAllAttributes } from "../../services/attribute.service";
import { getAttributeValues } from "../../services/attributeValue.service";

function VariationGenerator({ onGenerate }) {
  const [attributes, setAttributes] = useState([]);
  const [values, setValues] = useState({});
  const [selected, setSelected] = useState({});

  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    try {
      const res = await getAllAttributes();

      setAttributes(res.data);

      const obj = {};

      for (const attr of res.data) {
        const val = await getAttributeValues(attr.id);
        obj[attr.id] = val.data;
      }

      setValues(obj);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = (attributeId, value) => {
    const old = selected[attributeId] || [];

    let updated;

    if (old.find((v) => v.id === value.id)) {
      updated = old.filter((v) => v.id !== value.id);
    } else {
      updated = [...old, value];
    }

    setSelected((prev) => ({
      ...prev,
      [attributeId]: updated,
    }));
  };

  // Generate All Combinations
  const generateCombinations = () => {
  const groups = Object.values(selected).filter(
    (group) => group.length > 0
  );

  if (!groups.length) {
    alert("Select at least one attribute value");
    return;
  }

  let result = [[]];

  for (const group of groups) {
    const temp = [];

    for (const r of result) {
      for (const item of group) {
        temp.push([...r, item]);
      }
    }

    result = temp;
  }

  onGenerate(result);
};

  

  return (
    <div className="border rounded-xl p-5 mt-6 bg-white">

      <h2 className="text-xl font-bold mb-5">
        Product Variations
      </h2>

      {attributes.map((attribute) => (
        <div key={attribute.id} className="mb-6">

            

          <h3 className="font-semibold mb-3">
            {attribute.name}
          </h3>

          <div className="flex flex-wrap gap-3">

            {(values[attribute.id] || []).map((value) => (

              <label
                key={value.id}
                className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={
                    selected[attribute.id]?.some(
                      (v) => v.id === value.id
                    ) || false
                  }
                  onChange={() =>
                    handleCheck(attribute.id, value)
                  }
                />

                <span>{value.value}</span>
              </label>

            ))}

          </div>

        </div>
      ))}

      <button
        type="button"
        onClick={generateCombinations}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
      >
        Generate Variations
      </button>

    </div>
  );
}

export default VariationGenerator;