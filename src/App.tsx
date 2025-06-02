import { useFormik } from "formik";
import "./App.css";
import { z } from "zod";
import { toFormikValidate } from "zod-formik-adapter";
import { ToastContainer, toast } from "react-toastify";

const allowedDomains = ["@gmail.com", "@yahoo.com", "icloud.com"];

const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .email("Valid email is required")
    .refine(
      (email) => allowedDomains.some((domain) => email.endsWith(domain)),
      {
        message: "Email must be from gmail.com or yahoo.com",
      }
    ),
  inquiry: z.enum(["general", "support"]),
  message: z.string().min(1, "Message is required"),
  consent: z.boolean().refine((val) => val === true, {
    message: "To submit this form, please consent to being contacted",
  }),
});

type FormValues = z.infer<typeof schema>;

function App() {
  const formik = useFormik<FormValues>({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      inquiry: "general",
      message: "",
      consent: false,
    },
    validate: toFormikValidate(schema),
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitted Values:", values);
      toast("Successfully signed up");
      resetForm();
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-200 font-karl">
      <ToastContainer />
      <div className="bg-white p-6 rounded-2xl shadow-md w-[600px]">
        <h1 className="font-bold text-xl mb-4">Contact Us</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="firstname" className="block text-base">
                  First name *
                </label>
                <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  className={`border border-gray-400 rounded-sm h-8 w-full px-2
                focus:outline-none ${
                  formik.touched.firstname && formik.errors.firstname
                    ? `border-red-400`
                    : "border-gray-400 focus:border-green-800"
                }`}
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.firstname}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <label htmlFor="lastname" className="block text-base">
                  Last name *
                </label>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  className={`border border-gray-400 rounded-sm h-8 w-full px-2
                focus:outline-none ${
                  formik.touched.lastname && formik.errors.lastname
                    ? `border-red-400`
                    : "border-gray-400 focus:border-green-800"
                }`}
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lastname}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-base">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className={`border border-gray-400 rounded-sm h-8 w-full px-2
                focus:outline-none ${
                  formik.touched.email && formik.errors.email
                    ? `border-red-400`
                    : "border-gray-400 focus:border-green-800"
                }`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div>
              <p className="block">Query Type *</p>
              <div className="mt-2 gap-4 grid sm:grid sm:grid-cols-2 sm:gap-2 ">
                <label className="border border-gray-400 h-10 flex items-center gap-2 px-4 rounded-sm text-base">
                  <input
                    type="radio"
                    name="inquiry"
                    value="general"
                    checked={formik.values.inquiry === "general"}
                    onChange={formik.handleChange}
                    className="accent-green-800"
                  />
                  General Inquiry
                </label>

                <label className="border border-gray-400 h-10 flex items-center gap-2 px-4 rounded-sm text-base">
                  <input
                    type="radio"
                    name="inquiry"
                    value="support"
                    checked={formik.values.inquiry === "support"}
                    onChange={formik.handleChange}
                    className="accent-green-800"
                  />
                  Support Inquiry
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`border border-gray-400 rounded-sm w-full py-1 px-2
                focus:outline-none ${
                  formik.touched.message && formik.errors.message
                    ? `border-red-400`
                    : "border-gray-400 focus:border-green-800"
                }`}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.message && formik.errors.message && (
                <div className="text-red-500 text-sm">
                  {formik.errors.message}
                </div>
              )}
            </div>

            <div className=" mt-2   ">
              <input
                id="consent"
                type="checkbox"
                name="consent"
                checked={formik.values.consent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="accent-green-800"
              />
              <label htmlFor="consent" className="ml-2 mb-4">
                I consent to being contacted by the team
              </label>
            </div>
            {formik.touched.consent && formik.errors.consent && (
              <div className="text-red-500 text-sm">
                {formik.errors.consent}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={!(formik.dirty && formik.isValid)}
                className="w-full py-2 rounded-md button text-white cursor-pointer
                 disabled:cursor-not-allowed bg-green-800"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
