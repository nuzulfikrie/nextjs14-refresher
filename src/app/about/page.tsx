// pages/about.js
"use client";

import Layout from '@/app/ui/components/Layout';
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function About() {
  const teamMembers = [
    { name: "John Doe", role: "CEO", image: "/placeholder.svg?height=100&width=100" },
    { name: "Jane Smith", role: "CTO", image: "/placeholder.svg?height=100&width=100" },
    { name: "Mike Johnson", role: "Lead Designer", image: "/placeholder.svg?height=100&width=100" },
    { name: "Sarah Brown", role: "Marketing Director", image: "/placeholder.svg?height=100&width=100" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground">
            Founded in 2023, our company has been at the forefront of innovation in the tech industry.
            We're passionate about creating solutions that make a difference in people's lives and
            pushing the boundaries of what's possible with technology.
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {teamMembers.map((member) => (
          <Card key={member.name}>
            <CardContent className="p-4 flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            Our mission is to empower businesses and individuals with cutting-edge technology
            solutions that drive growth, efficiency, and innovation. We're committed to
            delivering exceptional value to our clients while fostering a culture of
            creativity, collaboration, and continuous learning.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}