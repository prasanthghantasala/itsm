import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express();

router.get("/", async (req, res) => {
  try {
    const { type } = req.query;
    let where = {};
    if (type) {
      where = {
        type,
      };
    }

    const templates = await prisma.template.findMany({
      where,
    });
    return res.json(templates);
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
    const template = await prisma.template.findUnique({
      where: {
        id,
      },
    });
    return res.json(template);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, inputs, type } = req.body;

    await prisma.template.create({
      data: {
        title,
        description,
        inputs,
        type,
      },
    });

    return res.json({
      message: "Template created successfully",
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
    const { title, description, inputs } = req.body;

    await prisma.template.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        inputs,
      },
    });

    return res.json({
      message: "Template updated successfully",
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

    await prisma.template.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: "Template deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

export default router;
