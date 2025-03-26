import { useState } from "react";
import { User } from "lucide-react"; // Assuming you're using Lucide icons

const RoleSelector = ({ formData, handleChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="space-y-1">
      <label htmlFor="role" className="block text-sm font-semibold text-gray-800">
        Select Role <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setIsDropdownOpen(false)}
          className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
          required
        >
          {!isDropdownOpen && <option value="">Select</option>}
          <option value="customer">Customer</option>
          <option value="serviceProvider">Service Provider</option>
        </select>
      </div>
    </div>
  );
};

export default RoleSelector;
