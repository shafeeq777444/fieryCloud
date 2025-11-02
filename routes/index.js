import express from 'express'
import planRoutes from "./planRoutes.js"
import dishesRoutes from './dishesRoutes.js'
import locationRoutes from './locationRoutes.js'
import subscriberRoutes from './subscribersRoutes.js'
import addParticpantRoutes from './addParticpantRoutes.js'
import contactDetailsRoutes from './contactDetailsRoutes.js'
import offerBannerRoutes from './offerRoutes.js'
import faqRoutes from './faqRoutes.js'
import contactRoutes from './contactUsRoutes.js'
const route=express.Router()

route.get("/test",(req,res)=>{
    res.send("testing hello i am fierygrills api")
})
route.use("/plans",planRoutes)
route.use('/menus',dishesRoutes)
route.use('/locations',locationRoutes)
route.use('/subscribers',subscriberRoutes)
route.use('/orderParticipant',addParticpantRoutes)
route.use('/contactDetails',contactDetailsRoutes)
route.use('/offerBanner',offerBannerRoutes)
route.use('/faqs',faqRoutes)
route.use('/contactUS',contactRoutes)





export default route