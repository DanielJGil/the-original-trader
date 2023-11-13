import { useDarkMode } from "../../context/DarkModeContext";
import { useUser } from "./useUser";

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  const { isDarkMode } = useDarkMode();
  const textColor = isDarkMode ? "text-slate-100" : "text-slate-800";

  return (
    <div className={`flex items-center gap-3 text-sm font-medium ${textColor}`}>
      <img
        src={avatar || "/default-user.jpg"}
        alt={`Avatar of ${fullName}`}
        className="block w-[2rem] h-[2rem] aspect-square object-cover object-center rounded-full "
      />
      <span>{fullName}</span>
    </div>
  );
}

export default UserAvatar;
