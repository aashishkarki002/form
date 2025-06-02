import { useFormik } from "formik";
import "./App.css";
import { z } from "zod";
import { toFormikValidate } from "zod-formik-adapter";

const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  inquiry: z.enum(["general", "support"]),
  message: z.string().min(1, "Message is required"),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "To submit  this form , please consent to being contacted",
    }),
  }),
});

function App() {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      inquiry: "general",
      message: "",
      consent: false,
    },
    validate: toFormikValidate(schema),
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-200 font-karl ">
      <div className="bg-white p-6 rounded-2xl shadow-md w-[600px]">
        <h1 className="font-bold text-xl mb-4">Contact Us</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div className="flex  flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="firstname" className="block text-base">
                  First name *
                </label>
                <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  className="border border-gray-400 rounded-sm h-8 w-full px-2 focus:border-green-800 focus:outline-none"
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
                  className="border border-gray-400 rounded-sm h-8 w-full px-2  focus:border-green-800 focus:outline-none"
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
                className="border border-gray-400 rounded-sm h-8 w-full px-2  focus:border-green-800 focus:outline-none"
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
              <div className="flex gap-4 mt-2 flex-col sm:flex-row">
                <label className="border border-gray-400 h-10 flex items-center gap-2 px-4 w-1/2 rounded-sm text-base">
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

                <label className="border border-gray-400 h-10 flex items-center gap-2 px-4 w-1/2 rounded-sm text-base">
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
                rows="4"
                className="border border-gray-400 w-full rounded-sm px-2 py-1  focus:border-green-800 focus:outline-none "
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

            <div className="flex items-center gap-2">
              <input
                id="consent"
                type="checkbox"
                name="consent"
                checked={formik.values.consent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="accent-green-800"
              />
              <label htmlFor="consent">
                I consent to being contacted by the team *
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
                className="w-full py-2 rounded-md button text-white disabled:cursor-not-allowed"
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
