import prisma from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client'; // Prisma error types

// Define the handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await fetchRestaurants(req, res);
      break;
    case 'PUT':
      await updateRestaurant(req, res);
      break;
    case 'DELETE':
      await deleteRestaurant(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

// Fetch all approved restaurants
async function fetchRestaurants(req: NextApiRequest, res: NextApiResponse) {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: { status: 'approved' },
      include: { dishes: true },
    });
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
}

// Update a restaurant by id
async function updateRestaurant(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { name, address, description, status } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Valid restaurant ID is required' });
  }

  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: Number(id) },
      data: {
        name,
        address,
        description,
        status,
        updatedAt: new Date(),
      },
    });

    res.status(200).json(updatedRestaurant);
  } catch (error: unknown) {
    // Cast the error to PrismaClientKnownRequestError if it's a Prisma error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // Record not found
        return res.status(404).json({ error: 'Restaurant not found' });
      }
    }

    console.error('Failed to update restaurant:', error);
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
}

// Delete a restaurant by id
async function deleteRestaurant(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Valid restaurant ID is required' });
  }

  try {
    await prisma.restaurant.delete({
      where: { id: Number(id) },
    });

    res.status(204).end(); // 204 No Content, since deletion was successful
  } catch (error: unknown) {
    // Cast the error to PrismaClientKnownRequestError if it's a Prisma error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // Record not found
        return res.status(404).json({ error: 'Restaurant not found' });
      }
    }

    console.error('Failed to delete restaurant:', error);
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
}
