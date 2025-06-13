// components/AdminVerificationPanel.jsx
export function AdminVerification({ organizers }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Organizer Verifications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {organizers.map(org => (
              <tr key={org._id}>
                <td className="px-6 py-4 whitespace-nowrap">{org.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{org.organizationName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => verifyOrganizer(org._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}