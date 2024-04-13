import { z } from "zod";

export const POSITION_DATA: { [key: number]: string } = {
  1: "Engineer",
  2: "Designer",
  3: "QA",
  4: "Product Manager",
  5: "Data Scientist",
  6: "Marketing",
  7: "Growth",
  8: "Financial",
  9: "HR",
};

export const ROLE_DATA: { [key: number]: string } = {
  1: "Admin",
  2: "Manager",
  3: "Employee",
  4: "Guest",
};
export const GENDER_DATA: { [key: number]: string } = {
  0: "Female",
  1: "Male",
  2: "Others",
};
export const signupFormSchema = z.object({
  email: z
    .string({
      required_error: "Email can not be empty.",
    })
    .email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z
    .string()
    .min(2, {
      message: "User name must be at least 2 characters.",
    })
    .max(30, {
      message: "User name must not be longer than 30 characters.",
    }),
  position: z.string({ required_error: "Please select a position." }),
  role: z.string({ required_error: "Please select a role." }),
  gender: z.string({ required_error: "Please select a gender." }),
  age: z.coerce
    .number({ required_error: "Age can not be empty" })
    .min(1)
    .max(150),
});

export type SignUpFormValues = z.infer<typeof signupFormSchema>;

export const signinFormSchema = z.object({
  email: z
    .string({
      required_error: "Email can not be empty.",
    })
    .email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type SignInFormValues = z.infer<typeof signinFormSchema>;
