import React from 'react';
import Link from 'next/link';
import NasiKandarIcon from '@/app/ui/components/logo/nasi-kandar-icon';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export default function Header() {
    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
        { href: '/authentication/register', label: 'Register' },
    ];

    return (
        <header className="bg-gray-800 text-white sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <NasiKandarIcon className="h-8 w-8" />
                    <span className="text-xl font-bold">Rate the Nasi Kandar</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:text-gray-300 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Navigation */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="md:hidden" aria-label="Open menu">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
                        {navItems.map((item) => (
                            <DropdownMenuItem key={item.href} className="focus:bg-gray-700">
                                <Link
                                    href={item.href}
                                    className="w-full text-white hover:text-gray-300"
                                >
                                    {item.label}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}