import { useState } from "react";

const CustomRangeModal = ({ onClose, onApply }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">

        <h2 className="text-lg font-semibold mb-4">
          Custom Range
        </h2>

        {/* Start */}
        <label className="text-sm text-gray-500">Start Date</label>
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-full border rounded p-2 mb-3"
        />

        {/* End */}
        <label className="text-sm text-gray-500">End Date</label>
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onApply({
                start: new Date(start),
                end: new Date(end),
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Apply Range
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomRangeModal;