// app/api/restaurants/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prismaClient";
import { Prisma } from '@prisma/client';

// Existing GET function
export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: { status: 'approved' },
      include: { dishes: true },
    });
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}

// New POST function to create a restaurant
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate required fields
  if (!body.name || !body.address) {
    return NextResponse.json({ error: 'Name and address are required' }, { status: 400 });
  }

  try {
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name: body.name,
        address: body.address,
        description: body.description || '',
        imageUrl: body.imageUrl || '',
        latitude: body.latitude || null,
        longitude: body.longitude || null,
        status: 'pending', // or whatever the default status should be
        createdBy: body.createdBy, // Ensure this field is present in the request
      },
    });
    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    console.error('Failed to create restaurant:', error);
    return NextResponse.json({ error: 'Failed to create restaurant' }, { status: 500 });
  }
}

// Existing PUT function
export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  const body = await request.json();

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Valid restaurant ID is required' }, { status: 400 });
  }

  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: Number(id) },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(updatedRestaurant);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }
    console.error('Failed to update restaurant:', error);
    return NextResponse.json({ error: 'Failed to update restaurant' }, { status: 500 });
  }
}

// Existing DELETE function
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Valid restaurant ID is required' }, { status: 400 });
  }

  try {
    await prisma.restaurant.delete({
      where: { id: Number(id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }
    console.error('Failed to delete restaurant:', error);
    return NextResponse.json({ error: 'Failed to delete restaurant' }, { status: 500 });
  }
}
