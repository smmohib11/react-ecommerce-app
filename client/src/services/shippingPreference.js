const STORAGE_KEY = "selected_shipping_id";

export const getSavedShippingId = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    return null;
  }
};

export const saveShippingId = (id) => {
  try {
    if (id === null || id === undefined) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, String(id));
    }
  } catch (err) {
    console.log(err);
  }
};

// Given a fetched shipping list, resolves which zone should be
// pre-selected: the previously saved one if it still exists,
// otherwise the first zone in the list.
export const resolveInitialShipping = (list) => {
  if (!list || list.length === 0) return null;

  const savedId = getSavedShippingId();

  if (savedId) {
    const match = list.find((x) => String(x.id) === String(savedId));
    if (match) return match;
  }

  return list[0];
};