import prisma from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await fetchComments(req, res);
      break;
    case 'PUT':
      await updateComment(req, res);
      break;
    case 'DELETE':
      await deleteComment(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

// Fetch all comments
async function fetchComments(req: NextApiRequest, res: NextApiResponse) {
  try {
    const comments = await prisma.comment.findMany();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
}

// Update a comment by id
async function updateComment(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { comment, status } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Valid comment ID is required' });
  }

  try {
    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: {
        comment,
        status,
      },
    });
    res.status(200).json(updatedComment);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Comment not found' });
      }
    }
    console.error('Failed to update comment:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
}

// Delete a comment by id
async function deleteComment(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Valid comment ID is required' });
  }

  try {
    await prisma.comment.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Comment not found' });
      }
    }
    console.error('Failed to delete comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
}
