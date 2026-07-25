import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  budget_range: z.enum(["<$1k", "$1k-$5k", "$5k-$10k", "$10k+"], {
    errorMap: () => ({ message: "Please select a budget range" }),
  }),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export type LeadInput = z.infer;

export type Lead = LeadInput & {
  id: string;
  created_at: string;
  status: "New" | "Contacted" | "Closed";
};