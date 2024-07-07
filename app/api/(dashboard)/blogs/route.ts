import connect from "@/lib/db";
import Blog from "@/lib/models/blog";
import Category from "@/lib/models/category";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const categoryId = searchParams.get("categoryId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse("Invalid user id", {
        status: 400,
      });
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse("Invalid category id", {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
      return new NextResponse("Category not found", {
        status: 404,
      });
    }

    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    const filter: any = {
      user: new Types.ObjectId(userId),
      category: new Types.ObjectId(categoryId),
    };

    const blogs = await Blog.find(filter);

    return new NextResponse(JSON.stringify({ blogs }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error in fetching blogs" + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {};
