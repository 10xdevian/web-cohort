const { z } = require("zod");

const courseSchema = z.object({
  title:z.string().min(5,
    'Course title atleast 5 characters'),
  description:z.string().min(5,"Course description must be greaterthan 5 character"),
  price: z.number().positive("Price must be a positive number"),
  imageUrl:z.string(),
})

module.exports={
  courseSchema,
}