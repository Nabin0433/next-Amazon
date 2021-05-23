const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;
  const TransformItem = items.map((item) => ({
    price_data: {
      currency: "NPR",
      unit_amount: item.price * 100 * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
    description: item.description,
    quantity: 1,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1Iu8VCJbjU63l4FU39biMDDR"],
    line_items: TransformItem,
    shipping_address_collection: {
      allowed_countries: ["NE", "ID", "US", "GB"],
    },
    mode: "payment",
    success_url: process.env.HOST + "/success",
    cancel_url: process.env.HOST + "/checkout",
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  console.log(session, "created");
  res.status(200).json({ session });
};
