const { z } = require("zod");

const adminSignupSchema = z.object({
  name: z.string().min(3, "Name Must be at least 3 characters"),
  username:z.string().min(5,"Username must be 5 characters"),
  email:z.string().email("Invailed Email Format"),
  password:z.string().min(5,"Password should be greater than 5 character ")
})

const adminSigninSchema = z.object({
  username:z.string().min(5,"Username must be 5 characters"),
  password:z.string().min(5,"Password should be greater than 5 character ")

})



module.exports={
  adminSignupSchema,
  adminSigninSchema,
}