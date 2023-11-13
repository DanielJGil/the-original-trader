import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Update your account</h1>
      </div>

      <div className="flex flex-col gap-7">
        <div className="mb-8">
          <h2 className="text-xl mb-5 font-semibold">Update user data</h2>
          <UpdateUserDataForm />
        </div>
        <div>
          <h2 className="text-xl mb-5 font-semibold">Update password</h2>
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}

export default Account;
