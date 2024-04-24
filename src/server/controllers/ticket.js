import express from "express";
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

const router = express();

router.get("/", async (req, res) => {
  try {
    const { filter, status } = req.query;

    let where = {
      userId: filter === "me" ? req.user.id : undefined,
    };

    if (status !== "all") {
      where = {
        ...where,
        status,
      };
    }

    const tickets = await prisma.ticket.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        data: true,
        status: true,
        priority: true,
        assignedTo: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        teamId: true,
        type: true,
      },
      where,
    });
    return res.json(tickets);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        data: true,
        status: true,
        priority: true,
        assignedTo: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        teamId: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return res.json(ticket);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    let {
      title,
      description,
      data,
      status,
      priority,
      createdBy,
      //   assignedTo,
      teamId,
    } = req.body;

    status = status || "open";

    await prisma.ticket.create({
      data: {
        title,
        description,
        incidentNumber: `INC-${Math.floor(Math.random() * 1000000)}`,
        data,
        status,
        priority,

        userId: req.user.id,
        teamId,
      },
    });

    return res.json({
      message: "Ticket created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      data,
      status,
      priority,
      createdBy,
      assignedTo,
      userId,
      teamId,
    } = req.body;
    console.log({ priority });
    console.log(await prisma.ticket.findUnique({ where: { id } }));
    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        data,
        status,
        priority,
        createdBy,
        assignedTo,
        userId,
        teamId,
      },
    });

    return res.json({
      message: "Ticket updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.ticket.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.post("/assign-to-user", async (req, res) => {
  try {
    const { ticketId, userId } = req.body;

    await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        userId,
      },
    });

    return res.json({
      message: "Ticket assigned to user successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.get("/:id/comment", async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await prisma.ticketHistory.findMany({
      where: {
        ticketId: id,
      },
      select: {
        id: true,
        comment: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(comments);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.post("/:id/comment", async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    await prisma.ticketHistory.create({
      data: {
        ticketId: id,
        comment,
        userId: req.user.id,
      },
    });

    return res.json({
      message: "Comment added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.post("/:id/summarize-with-ai", async (req, res) => {
  try {
    const { id } = req.params;
    const { prompt } = req.body;
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        data: true,
        status: true,
        priority: true,
        assignedTo: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        teamId: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    let comments = await prisma.ticketHistory.findMany({
      where: {
        ticketId: id,
      },
      select: {
        id: true,
        comment: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      // descending order
      orderBy: {
        createdAt: "desc",
      },
    });

    let content = `
    Please summarize the ticket with the following details:
    Ticket:
    ${JSON.stringify(ticket)}
    Comments:
    ${JSON.stringify(comments)}
    Question: ${prompt}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: content }],
    });

    console.log(response);

    return res.json({
      summary: response.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});
export default router;
