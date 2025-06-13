// components/OrganizerDashboard.jsx
export function OrganizerDashboard({ user }) {
  return (
    <div className="p-6">
      {!user.isVerified && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Your account is pending admin verification. You won't be able to create events until approved.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className={`${!user.isVerified ? 'opacity-50 pointer-events-none' : ''}`}>
        {/* Event creation form */}
        <button
          className={`px-4 py-2 bg-blue-600 text-white rounded ${!user.isVerified ? 'cursor-not-allowed' : 'hover:bg-blue-700'}`}
          disabled={!user.isVerified}
        >
          Create New Event
        </button>
      </div>
    </div>
  );
}