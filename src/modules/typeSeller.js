/* eslint-disable default-case */
/* eslint-disable no-unreachable */
export const colorActive = (id) => {
    const level = id.split("_")[0];
    switch (Number(level)) {
      case 1:
        return "red";
        break;
      case 2:
        return "orange";
        break;
      case 3:
        return "yellow";
        break;
      case 4:
        return "green";
        break;
      case 5:
        return "darkGreen";
    }
  };

export const mercadoLider = (seller) => {
    if (
        seller.power_seller_status === null &&
        seller.transactions.completed >= 50
    ) {
        return "MercadoLider";
    } else if (
        seller.power_seller_status === null &&
        seller.transactions.completed < 50
    ) {
        return "No tenemos datos sobre el vendedor";
    } else if (seller.power_seller_status === "gold") {
        return "MercadoLider Gold";
    } else if (seller.power_seller_status === "platinum") {
        return "MercadoLider Platinum";
    } 
    else{
      return'holi'
    }
};