import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold">Update your account</h1>
      </div>

      <div className="flex flex-col gap-7">
        <div>
          <h2 className="text-xl mb-5">Update user data</h2>
          <UpdateUserDataForm />
        </div>
        <div>
          <h2 className="text-xl mb-3">Update password</h2>
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}

export default Account;
