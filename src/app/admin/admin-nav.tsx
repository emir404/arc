import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "./actions";

const navLinkClass = (active: boolean) =>
  `rounded-sm text-base leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
    active
      ? "font-[550] text-black"
      : "font-light text-black/50 hover:text-black"
  }`;

const AdminNav = ({ active }: { active: "roles" | "applications" }) => (
  <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-black/10 pb-6">
    <div className="flex items-baseline gap-8">
      <p className="text-xl font-semibold leading-none tracking-[-0.02em] text-black">
        Arc Admin
      </p>
      <nav aria-label="Admin" className="flex items-baseline gap-5">
        <Link
          href="/admin"
          aria-current={active === "roles" ? "page" : undefined}
          className={navLinkClass(active === "roles")}
        >
          Roles
        </Link>
        <Link
          href="/admin/applications"
          aria-current={active === "applications" ? "page" : undefined}
          className={navLinkClass(active === "applications")}
        >
          Applications
        </Link>
      </nav>
    </div>
    <div className="flex items-center gap-5">
      <Link
        href="/careers"
        className="rounded-sm text-base font-light leading-none text-black/50 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        View careers page
      </Link>
      <form action={logout}>
        <Button type="submit" variant="secondary" size="sm">
          Sign out
        </Button>
      </form>
    </div>
  </header>
);

export default AdminNav;
