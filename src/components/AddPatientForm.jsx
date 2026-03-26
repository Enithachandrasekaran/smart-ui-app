import { useFormik } from "formik";
import { toast } from "react-toastify";

const AddPatientForm = ({ isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      nationality: "",
      identifier: "",
      value: "",
    },

    onSubmit: (values) => {
      console.log(values);

      toast.success("Patient added successfully ✅");

      onClose(); // close form
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-end bg-black bg-opacity-40">
      
      {/* 📋 Side Card */}
      <div className="w-[400px] bg-white h-full p-6 shadow-xl">

        {/* ❌ Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add Patient</h2>
          <button onClick={onClose} className="text-xl">✖</button>
        </div>

        {/* 🧾 Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-3">

          <input
            name="firstName"
            placeholder="First Name"
            onChange={formik.handleChange}
            className="w-full border p-2"
          />

          <input
            name="lastName"
            placeholder="Last Name"
            onChange={formik.handleChange}
            className="w-full border p-2"
          />

          <select
            name="gender"
            onChange={formik.handleChange}
            className="w-full border p-2"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="date"
            name="dob"
            onChange={formik.handleChange}
            className="w-full border p-2"
          />

          <input
            name="nationality"
            placeholder="Nationality"
            onChange={formik.handleChange}
            className="w-full border p-2"
          />

          <input
            name="identifier"
            placeholder="Identifier (Aadhaar / PAN)"
            onChange={formik.handleChange}
            className="w-full border p-2"
          />

          <input
            name="value"
            placeholder="Value"
            onChange={formik.handleChange}
            className="w-full border p-2"
          />

          {/* 🔘 Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;