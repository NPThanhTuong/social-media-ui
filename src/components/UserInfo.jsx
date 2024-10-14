const UserInfo = ({ user }) => {
  return (
    <div className="text-black">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Ngày sinh: {user.dob}</p>
      <p>Ngày tạo tài khoản: {user.created_at}</p>
      <p>Ngày cập nhật: {user.updated_at}</p>
    </div>
  );
};

export default UserInfo;
