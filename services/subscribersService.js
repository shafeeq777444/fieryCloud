import Subscriber from "../models/Subscribers.js";
import CustomError from "../utils/CustomError.js";
import sendEmail from "../utils/email/emailService.js";
import generateEmailHTML from "../utils/email/emailTemplate.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9]{7,15}$/;
const teamEmails = [
    { email: "shafeeqmohamed111@gmail.com", name: "Shafeeq" },
    { email: "bubblycheers1127@gmail.com", name: "Bubbly" },
];

export const addSubscriberService = async ({ data, vendor }) => {
    data = data.trim();
    const existing = await Subscriber.findOne({ data });
    if (existing) {
      throw new Error("Subscriber already exists",400);
      console.log(existing)
    }
    try {
        let type = "";

        if (emailRegex.test(data)) {
            type = "email";
        }  else {
            throw new CustomError("Invalid email  format", 400);
        }

        const newSubscriber = await Subscriber.create({ data, type, vendor });
        console.log(vendor);

        // user
        if (type === "email") {
            await sendEmail({
                toEmail: newSubscriber.data,
                toName: "Subscriber",
                subject: `Welcome to ${vendor}!`,
                message: `Thank you for subscribing to <strong>${vendor}</strong>! We're thrilled to have you with us.`,
                userDetails: {
                    name: vendor,
                    phone: "+1 (437) 313-1390",
                    email: "support@example.com",
                },
                vendor,
            });
        }
        //   team members
        for (const member of teamEmails) {
            await sendEmail({
                toEmail: member.email,
                toName: member.name,
                subject: `New  Subscriber in ${vendor}`,
                message: `A new subscriber  joined under vendor: ${vendor}`,
                userDetails: {
                    name: "Subscriber",
                    ...(type === "email" && { email: newSubscriber.data }),
                    ...(type === "phoneNumber" && { phone: newSubscriber.data }),
                },
                vendor,
            });
        }
    } catch (er) {
        console.log(er);
    }
};

export const getSubscribersService = async (vendor, skip, limit) => {
  const [data, totalCount] = await Promise.all([
    Subscriber.find({ vendor })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }), // optional sorting
    Subscriber.countDocuments({ vendor })
  ]);

  return { data, totalCount };
};