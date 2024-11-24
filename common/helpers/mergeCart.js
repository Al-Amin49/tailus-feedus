export const mergeCarts = (localCart, serverCart) => {
    const cartMap = new Map();
  
    [...localCart, ...serverCart].forEach((item) => {
      cartMap.set(item.id, item); 
    });
  
    return Array.from(cartMap.values()); 
  };