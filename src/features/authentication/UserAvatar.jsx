import { useUser } from "./useUser";

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <div className="text-slate-800 flex items-center gap-3 text-sm font-medium">
      <img
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
        className="block w-[2rem] h-[2rem] aspect-square object-cover object-center rounded-full border border-slate-300"
      />
      <span>{fullName}</span>
    </div>
  );
}

export default UserAvatar;
