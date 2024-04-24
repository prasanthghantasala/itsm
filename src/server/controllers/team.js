import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const router = express();

router.get("/", async (req, res) => {
  try {
    const teams = await prisma.team.findMany();
    return res.json(teams);
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
    const team = await prisma.team.findUnique({
      where: {
        id,
      },
    });
    return res.json(team);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    await prisma.team.create({
      data: {
        name,
      },
    });

    return res.json({
      message: "Team created successfully",
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
    const { name } = req.body;

    await prisma.team.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return res.json({
      message: "Team updated successfully",
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

    await prisma.team.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: "Team deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

export default router;
