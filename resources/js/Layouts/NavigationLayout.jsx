import { OrganismNavbar, OrganismSidebar, OrganismFooter, OrganismBottomNavigation } from "@/Components";

export default function Authenticated({ user, header, children }) {
  return (
    <div className="min-h-screen bg-backgroundabu">
      <div className="flex flex-col">
        <div className="flex">
          <OrganismSidebar user={user} />
          <main className="w-full">
            <OrganismNavbar user={user} />
            <div className="lg:mb-auto mb-32">
              {children}
            </div>
            <OrganismFooter />
          </main>
        </div>
        <OrganismBottomNavigation />
      </div>
    </div>
  );
}