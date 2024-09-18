import prisma from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await fetchRoles(req, res);
      break;
    case 'PUT':
      await updateRole(req, res);
      break;
    case 'DELETE':
      await deleteRole(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

// Fetch all roles
async function fetchRoles(req: NextApiRequest, res: NextApiResponse) {
  try {
    const roles = await prisma.userRole.findMany();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Failed to fetch roles:', error);
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
}

// Update a role by user id
async function updateRole(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const { role } = req.body;

  if (!userId || isNaN(Number(userId))) {
    return res.status(400).json({ error: 'Valid user ID is required' });
  }

  try {
    const updatedRole = await prisma.userRole.update({
      where: { userId: Number(userId) },
      data: { role },
    });
    res.status(200).json(updatedRole);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Role not found' });
      }
    }
    console.error('Failed to update role:', error);
    res.status(500).json({ error: 'Failed to update role' });
  }
}

// Delete a role by user id
async function deleteRole(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || isNaN(Number(userId))) {
    return res.status(400).json({ error: 'Valid user ID is required' });
  }

  try {
    await prisma.userRole.delete({
      where: { userId: Number(userId) },
    });
    res.status(204).end();
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Role not found' });
      }
    }
    console.error('Failed to delete role:', error);
    res.status(500).json({ error: 'Failed to delete role' });
  }
}
