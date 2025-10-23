import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

export default function UserLayout({ cartItems }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <UserHeader cartCount={cartItems.length} />
      <main className="flex-1">
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
}
