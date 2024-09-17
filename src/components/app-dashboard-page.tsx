'use client'

import { Menu } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Page() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 overflow-y-auto border-r bg-gray-100/40 lg:block">
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header with menu */}
        <header className="flex h-14 items-center border-b bg-white px-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <h1 className="ml-4 text-lg font-semibold">Dashboard</h1>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Sample dashboard cards */}
            {['Users', 'Revenue', 'Traffic', 'Conversion Rate'].map((item) => (
              <div key={item} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="font-semibold">{item}</h3>
                <p className="text-2xl font-bold mt-2">
                  {item === 'Revenue' ? '$12,345' : 
                   item === 'Conversion Rate' ? '3.45%' : '1,234'}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-lg font-semibold">My Dashboard</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {['Dashboard', 'Analytics', 'Team', 'Projects', 'Calendar', 'Documents', 'Reports'].map((item) => (
          <Link
            key={item}
            href={`/dashboard/${item.toLowerCase()}`}
            className="flex items-center rounded-lg px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
          >
            {item}
          </Link>
        ))}
      </nav>
    </div>
  )
}