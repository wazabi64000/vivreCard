import {z} from "zod"


export const updateLocationSchema = z.object({
    latitude : z.number().min(-90).max(90),
    logitude : z.number().min(-180).max(180)
})