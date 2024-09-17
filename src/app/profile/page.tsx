'use client';

import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function User() {
    const { user } = useAuth();

    return (
        <>
            {user?.role === "authenticated" ? (
                <Card className="w-full max-w-3xl mx-auto">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="w-20 h-20">
                            <AvatarImage alt="User avatar" src="/placeholder.svg?height=80&width=80" />
                            <AvatarFallback>NU</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">User Profile</CardTitle>
                            <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={user?.email} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="id">User ID</Label>
                            <Input id="id" value={user?.id} readOnly />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="provider">Authentication Provider</Label>
                                <Input id="provider" value={user?.app_metadata.provider} readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">User Role</Label>
                                <Input id="role" value={user?.role} readOnly />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="created-at">Account Created</Label>
                            <Input id="created-at" value={user?.created_at} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label>Verification Status</Label>
                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className={`w-3 h-3 rounded-full ${user?.user_metadata?.email_verified ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <span className="text-sm">Email {user?.user_metadata?.email_verified ? 'Verified' : 'Not Verified'}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className={`w-3 h-3 rounded-full ${user?.user_metadata?.phone_verified ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <span className="text-sm">Phone {user?.user_metadata?.phone_verified ? 'Verified' : 'Not Verified'}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <h2>Error: user not authenticated</h2>
            )}
        </>
    );
}