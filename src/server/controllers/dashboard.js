import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const router = express();

router.get("/", async (req, res) => {
  const { id } = req.user;

  let where = {};
  if (req.user.role === "USER") {
    where = {
      userId: id,
    };
  }
  const tickets = await prisma.ticket.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
    where,
  });

  const user_count = await prisma.user.count();
  const team_count = await prisma.team.count();
  const ticket_count = await prisma.ticket.count();

  let response = {
    open: 0,
    pending: 0,
    closed: 0,
  };
  tickets.forEach((ticket) => {
    response[ticket.status] = ticket._count.id;
  });
  response.total = tickets.reduce((acc, ticket) => acc + ticket._count.id, 0);
  return res.json({
    incidents: response,
    user_count,
    team_count,
    ticket_count,
  });
});

export default router;
