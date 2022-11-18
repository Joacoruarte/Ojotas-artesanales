import mercadopago from "mercadopago";

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_SECRET_PROD,
});

export default async function mercadoPago(req , res){
  const { cart } = req.body
    let preference = {
        items: [],
        back_urls: {
          success: "https://localhost:3000/success-payment",
          failure: "https://localhost:3000",
          pending: "https://localhost:3000",
        },
        auto_return: "approved",
        statement_descriptor: "OJOTAS ARTESANALES",
        shipments: {
          cost: 1000,
          mode: "not_specified",
    },
  }

  cart.forEach((product) => preference.items.push({
    id: product._id,
    title: product.name,
    description: product.color,
    picture_url: product.img,
    unit_price: product.price,
    quantity: parseInt(product.stock),
  }))
  
  console.log(preference)
  mercadopago.preferences
  .create(preference)
  .then(function (response) {
    console.log(response.body.id)
    res.status(200).json(response.body.sandbox_init_point);
  })
  .catch(function (error) {
    console.log(error);
  });
}