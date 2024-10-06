'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Dish {
    id: number;
    name: string;
    description: string;
}

interface Restaurant {
    id: number;
    name: string;
    address: string;
    description: string;
    status: string;
    dishes: Dish[];
}

export default function RestaurantPage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await fetch('/api/restaurants');
            if (!response.ok) throw new Error('Failed to fetch restaurants');
            const data = await response.json();

            console.log('---------- data restaurants ----------');
            console.log(data);
            console.log('---------- data restaurants ----------');

            setRestaurants(data);
        } catch (err) {
            setError('Failed to fetch restaurants');
        } finally {
            setLoading(false);
        }
    };

    const updateRestaurant = async (id: number, updatedData: Partial<Restaurant>) => {
        try {
            const response = await fetch(`/api/restaurants?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error('Failed to update restaurant');
            const updatedRestaurant = await response.json();
            setRestaurants(restaurants.map(r => r.id === id ? updatedRestaurant : r));
        } catch (err) {
            setError('Failed to update restaurant');
        }
    };

    const deleteRestaurant = async (id: number) => {
        try {
            const response = await fetch(`/api/restaurants?id=${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete restaurant');
            setRestaurants(restaurants.filter(r => r.id !== id));
        } catch (err) {
            setError('Failed to delete restaurant');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Restaurants</h1>
            {/* Debugging output */}
            {JSON.stringify(restaurants)}

            {/* Check if there are restaurants */}
            {restaurants.length === 0 ? (
                <div>
                    <p>No restaurants available. Please create a restaurant <Link href="/restaurant/add">here</Link>.</p>
                </div>
            ) : (
                restaurants.map(restaurant => (
                    <div key={restaurant.id}>
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.address}</p>
                        <p>{restaurant.description}</p>
                        <p>Status: {restaurant.status}</p>
                        <button onClick={() => updateRestaurant(restaurant.id, { status: 'pending' })}>
                            Mark as Pending
                        </button>
                        <button onClick={() => deleteRestaurant(restaurant.id)}>
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
