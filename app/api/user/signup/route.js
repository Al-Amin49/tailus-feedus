import bcrypt from "bcrypt";

import connectToDB from "@/database";
import user from "@/models/User";


export async function POST(req) {
  try {
    const { name, email, phone, password } = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400 }
      );
    }

    await connectToDB();

    // Check if user already exists
    const existingUser = await user.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists." }),
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new user({
      name,
      email,
      phone,
      password: hashedPassword,
      cart:[]
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User registered successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Internal server error." }),
      { status: 500 }
    );
  }
}
