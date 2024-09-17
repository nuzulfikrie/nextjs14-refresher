"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NasiKandarIcon from '@/app/ui/components/logo/nasi-kandar-icon';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/use-auth';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";

export default function Header() {
    const { user, signOut, loading } = useAuth();
    const router = useRouter();

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <header className="bg-gray-800 text-white sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <NasiKandarIcon className="h-8 w-8" />
                    <span className="text-xl font-bold">Rate the Nasi Kandar</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-4 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:text-gray-300 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                    {loading ? (
                        <span>Loading...</span>
                    ) : user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center space-x-2">
                                    <User className="h-5 w-5" />
                                    <span>{user.email}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
                                <DropdownMenuItem className="focus:bg-gray-700">
                                    <Link href="/profile" className="w-full text-white hover:text-gray-300">
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-gray-700">
                                    <Link href="/dashboard" className="w-full text-white hover:text-gray-300">
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="focus:bg-gray-700" onSelect={handleSignOut}>
                                    <span className="w-full text-white hover:text-gray-300">Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login" className="hover:text-gray-300 transition-colors">
                            Login
                        </Link>
                    )}
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
                        <DropdownMenuSeparator />
                        {loading ? (
                            <DropdownMenuItem className="focus:bg-gray-700">
                                <span className="w-full text-white">Loading...</span>
                            </DropdownMenuItem>
                        ) : user ? (
                            <>
                                <DropdownMenuItem className="focus:bg-gray-700">
                                    <Link href="/profile" className="w-full text-white hover:text-gray-300">
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-gray-700">
                                    <Link href="/dashboard" className="w-full text-white hover:text-gray-300">
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-gray-700" onSelect={handleSignOut}>
                                    <span className="w-full text-white hover:text-gray-300">Sign Out</span>
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <DropdownMenuItem className="focus:bg-gray-700">
                                <Link href="/login" className="w-full text-white hover:text-gray-300">
                                    Login
                                </Link>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}