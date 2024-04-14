import { z } from "zod";

export const SMEZodSchema = z.object({
  UEN: z
    .string({ required_error: "Provide valid UEN number" })
    .length(9, "UEN number should be of 9 chars")
    .regex(
      /\d{8}[A-za-z]{1}/i,
      "Provide valid format of 8 digits followed by a alphabet"
    ),
  CompanyName: z
    .string({ required_error: "Provide valid company name" })
    .min(2, "Provide company name wih atleast 2 chars"),
  FullName: z
    .string({ required_error: "Provide valid position in company" })
    .regex(/\w.*\s\w.*/, "Provide valid full name followed by spaces"),
  PositionInCompany: z
    .string()
    .min(2, "Provide position in company with atleast 2 chars"),
  Email: z
    .string({ required_error: "Provide valid email" })
    .email("Provide a valid email format john@gmail.com")
    .min(5, "Provide email with atleast 5 chars"),
  MobNumber: z
    .string({ required_error: "Provide valid mobile number" })
    .regex(
      /\+65(6|8|9)\d{7}/g,
      "Provide a valid singapore number (+6561234567)"
    )
    .length(11, "Provide mobile number of 11 digits"),
  Documents: z
    .array(z.instanceof(File), {
      required_error: "Upload atleast one document",
    })
    .min(1, "Upload atleast one document")
    .max(6, "Max 6 documents allowed"),
  IsTermsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms & conditions" }),
  }),
});

export type SME = z.infer<typeof SMEZodSchema>;
