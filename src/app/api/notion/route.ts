import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

// Type-safe environment variables
const NOTION_API_KEY = process.env.NOTION_API_KEY as string;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

// Ensure API key is defined
if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
  throw new Error("Missing Notion API credentials in environment variables");
}

const notion = new Client({ auth: NOTION_API_KEY });

export async function GET(): Promise<NextResponse> {
  try {
    const response = await notion.databases.query({ database_id: NOTION_DATABASE_ID });

    return NextResponse.json(response.results);
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    return NextResponse.json({ error: "Failed to fetch data from Notion" }, { status: 500 });
  }
}

