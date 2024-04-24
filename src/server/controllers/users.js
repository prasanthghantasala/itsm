import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const router = express();

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        teamId: true,
        createdAt: true,
        updatedAt: true,
        team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return res.json(users);
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
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        teamId: true,
        createdAt: true,
        updatedAt: true,
        team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req?.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        role,
      },
    });

    return res.json({
      message: "User created successfully",
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
    const { firstName, lastName, email, password, role, teamId } = req.body;

    let data = {
      firstName,
      lastName,
      email,
      role,
      teamId,
    };

    if (password) {
      data = {
        ...data,
        password,
      };
    }

    await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return res.json({
      message: "User updated successfully",
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

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.post("/assign-team", async (req, res) => {
  try {
    const { userId, teamId } = req.body;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        teamId,
      },
    });

    return res.json({
      message: "Team assigned successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

export default router;
