import mercadopago from "mercadopago";

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_SECRET_TEST,
});

export default async function mercadoPago(req , res){
  const { cart } = req.body
    let preference = {
        items: [],
        back_urls: {
          success: "https://test.ojotasartesanal.com/success-payment",
          failure: "https://test.ojotasartesanal.com/",
          pending: "https://test.ojotasartesanal.com/",
        },
        auto_return: "approved",
        statement_descriptor: "OJOTAS ARTESANALES",
        shipments: {
          cost: 1,
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