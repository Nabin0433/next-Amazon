import { buffer } from "micro";
import * as admin from "firebase-admin";

const serviceAccount = require("../../../firebaseAdmin.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const key = STRIPE_SIGNING_SECRET;

const fullfillOrder = async (session) => {
  return await app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then((result) => {
      console.log("success and add database", session.id);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const reqBuffer = await buffer(req);
    const payload = reqBuffer.toString();
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, key);
    } catch (err) {
      console.log(err);
      return res.status(400).send("webhook error" + err.message);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log(event, "event");
      console.log(event.data, "event");
      return fullfillOrder(session)
        .then(() => {
          res.status(200).send("sucess");
        })
        .catch((err) => {
          res.status(400).send("errr", err.message);
        });
    }
  }
};
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
