// // SDK de Mercado Pago
// const mercadopago = require("mercadopago");

// // Agrega credenciales
// mercadopago.configure({
//   access_token:
//     "TEST-8996856766715937-020519-760b56814269813cb5d24795ad20153d-398590246",
// });

// // Crea un objeto de preferencia
// let preference = {
//   items: [
//     {
//       title: "Mi producto",
//       unit_price: 100,
//       quantity: 1,
//     },
//   ],
// };

// mercadopago.preferences
//   .create(preference)
//   .then(function (response) {
//     // Este valor reemplazará el string "<%= global.id %>" en tu HTML
//     global.id = response.body.id;
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// const MercadoPago = () => {
//   return (
//     <>
//       <script
//         src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
//         data-preference-id="<%= global.id %>"
//       ></script>
//     </>
//   );
// };

// export default MercadoPago;
