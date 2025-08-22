import { addSubscriberService, getSubscribersService } from "../services/subscribersService.js"

export const addSubscriberController=async(req,res)=>{
   console.log(req.body)
    try {
        await addSubscriberService(req.body)
        res.status(201).json({ message: "Thanks for Subscription" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller
export const getSubscribersController = async (req, res) => {
  try {
    const { vendor } = req.params;
    const page = parseInt(req.query.page) || 1; // default page = 1
    const limit = 10; // 10 per page
    const skip = (page - 1) * limit;

    // Fetch paginated data
    const { data, totalCount } = await getSubscribersService(vendor, skip, limit);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No Subscribers Found" });
    }

    res.status(200).json({
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalSubscribers: totalCount,
      subscribers: data
    });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ message: "Server Error" });
  }
};