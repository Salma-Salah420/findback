import { z } from "zod"

export const reportSchema = z.object({
  type: z.enum(["lost", "found", "missing_child"]),
  category: z.enum(["electronics", "documents", "bags", "pets", "children", "jewelry", "other"]),
  title: z.string().min(6, "Give the report a descriptive title").max(120),
  description: z.string().min(30, "Add at least 30 characters so people can identify the item"),
  city: z.string().min(2, "City is required"),
  address: z.string().min(4, "Add a street, landmark, or venue"),
  date: z.string().min(1, "Select the date the item was lost or found"),
  contactPhone: z
    .string()
    .regex(/^\+?[0-9\s-]{7,20}$/, "Enter a valid phone number"),
  contactEmail: z.string().email("Enter a valid email address").optional().or(z.literal("")),
  reward: z.coerce.number().min(0).max(100000).optional(),
  images: z.array(z.string()).max(6, "Up to 6 images"),
})

export const reportFiltersSchema = z.object({
  query: z.string().optional(),
  type: z.enum(["all", "lost", "found", "missing_child"]).optional(),
  category: z
    .enum(["all", "electronics", "documents", "bags", "pets", "children", "jewelry", "other"])
    .optional(),
  city: z.string().optional(),
  withinDays: z.union([z.literal("all"), z.number()]).optional(),
  sort: z.enum(["newest", "oldest", "relevance"]).optional(),
})

export type ReportValues = z.infer<typeof reportSchema>
