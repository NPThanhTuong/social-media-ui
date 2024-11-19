import { EnvelopeIcon, PhoneIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/solid";

const UserInfo = ({ user }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200 w-full">
      <div className="flex items-center gap-4 mb-6">
        <UserIcon className="h-10 w-10 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
      </div>
      <div className="text-gray-700 space-y-4">
        <div className="flex items-center gap-3">
          <EnvelopeIcon className="h-6 w-6 text-blue-500" />
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PhoneIcon className="h-6 w-6 text-green-500" />
          <p>
            <span className="font-medium">Phone:</span> {user.phone}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-6 w-6 text-orange-500" />
          <p>
            <span className="font-medium">Ngày sinh:</span> {user.dob || "Không có dữ liệu"}
          </p>
        </div>
        {/* <div className="flex items-center gap-3">
          <CalendarIcon className="h-6 w-6 text-purple-500" />
          <p>
            <span className="font-medium">Ngày tạo tài khoản:</span> {user.created_at || "Không có dữ liệu"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-6 w-6 text-red-500" />
          <p>
            <span className="font-medium">Ngày cập nhật:</span> {user.updated_at || "Không có dữ liệu"}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default UserInfo;
