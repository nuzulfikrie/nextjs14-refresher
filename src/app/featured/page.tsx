import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const prisma = new PrismaClient()

async function getFeaturedRestaurants() {
  return await prisma.restaurant.findMany({
    where: { status: 'approved' },
    include: { dishes: true },
  })
}

export default async function FeaturedPage() {
  const restaurants = await getFeaturedRestaurants()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{restaurant.name}</CardTitle>
              <CardDescription>{restaurant.description}</CardDescription>
            </CardHeader>
            {restaurant.imageUrl && (
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                width={400}
                height={200}
                className="object-cover w-full h-48"
              />
            )}
            <CardContent>
              <h3 className="font-semibold mb-2">Featured Dishes</h3>
              <ul className="space-y-2">
                {restaurant.dishes.slice(0, 3).map((dish) => (
                  <li key={dish.id}>
                    <Link href={`/dishes/${dish.id}`} className="text-blue-600 hover:underline">
                      {dish.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/restaurants/${restaurant.id}`}>
                  View Restaurant
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}