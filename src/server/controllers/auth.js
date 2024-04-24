import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const router = express();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req?.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({
      token,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req?.body;

    // check if user already exists with email
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

export default router;
