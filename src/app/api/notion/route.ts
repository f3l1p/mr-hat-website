import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

// Type-safe environment variables
const NOTION_API_KEY = process.env.INTERNAL_INTEGRATION_SECRET as string;
const NOTION_DATABASE_ID = process.env.DATABASE_ID as string;

// Ensure API key is defined
if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
  throw new Error("Missing Notion API credentials in environment variables");
}

const notion = new Client({ auth: NOTION_API_KEY });

export async function GET(): Promise<NextResponse> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
    });

    // Extract and format only necessary fields
    const formattedData = response.results
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((page: any) => {
        const properties = page.properties;
        const rawDate = properties.date?.date?.start || "";

        // Convert YYYY-MM-DD to DD-MM-YYYY
        const formattedDate = rawDate
          ? rawDate.split("-").reverse().join("-") // Convert "2025-02-07" → "07-02-2025"
          : "";

        return {
          city: properties.city?.rich_text?.[0]?.plain_text || "",
          state: properties.state?.rich_text?.[0]?.plain_text || "",
          date: formattedDate, // Now formatted as DD-MM-YYYY
          place: properties.place?.title?.[0]?.plain_text || "",
          price: properties.price?.rich_text?.[0]?.plain_text || "",
          location: properties.location?.rich_text?.[0]?.plain_text || "",
          properties: properties,
        };
      })
      .filter((event) => event.date) // Remove items without a valid date
      .sort((a, b) => {
        const dateA = new Date(a.date.split("-").reverse().join("-")).getTime(); // Convert back to YYYY-MM-DD for sorting
        const dateB = new Date(b.date.split("-").reverse().join("-")).getTime();

        return dateA - dateB;
      });

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Notion" },
      { status: 500 }
    );
  }
}
