import prisma from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await fetchRestaurantSuggestions(req, res);
      break;
    case 'PUT':
      await updateRestaurantSuggestion(req, res);
      break;
    case 'DELETE':
      await deleteRestaurantSuggestion(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

// Fetch all restaurant suggestions
async function fetchRestaurantSuggestions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const suggestions = await prisma.restaurantSuggestion.findMany();
    res.status(200).json(suggestions);
  } catch (error) {
    console.error('Failed to fetch suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
}

// Update a restaurant suggestion by id
async function updateRestaurantSuggestion(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { name, address, description, status } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Valid suggestion ID is required' });
  }

  try {
    const updatedSuggestion = await prisma.restaurantSuggestion.update({
      where: { id: Number(id) },
      data: {
        name,
        address,
        description,
        status,
      },
    });
    res.status(200).json(updatedSuggestion);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Suggestion not found' });
      }
    }
    console.error('Failed to update suggestion:', error);
    res.status(500).json({ error: 'Failed to update suggestion' });
  }
}

// Delete a restaurant suggestion by id
async function deleteRestaurantSuggestion(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Valid suggestion ID is required' });
  }

  try {
    await prisma.restaurantSuggestion.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Suggestion not found' });
      }
    }
    console.error('Failed to delete suggestion:', error);
    res.status(500).json({ error: 'Failed to delete suggestion' });
  }
}
