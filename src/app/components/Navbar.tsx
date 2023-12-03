import SearchInput from "./SearchInput";
import Cart from "./Cart";
import MenuList from "./MenuList";
import Logo from "./Logo";
import Divider from "./Divider";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  return (
    <div className="flex flex-row bg-cyan-600 fixed justify-center items-center top-0 text-gray-100 w-full py-4 px-8 shadow-md">
      <div className="flex flex-row container max-w-[1200px] min-w-[600px] w-full justify-between items-center">
        <div className="flex flex-row space-x-6">
          <Logo />
          <MenuList />
        </div>
        <div className="flex flex-row w-full justify-center">
          <SearchInput />
        </div>
        <div className="flex flex-row space-x-2">
          <Cart />
          <Divider />
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}
