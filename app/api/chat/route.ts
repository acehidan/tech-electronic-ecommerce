import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { products, storeInfo } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages || [];

  const systemPrompt = `You are a professional and friendly sales assistant for "${
    storeInfo.name
  }". Your role is to help customers find the right tools and answer their questions.

## Your Knowledge Base:

### Store Information:
- **Location**: ${storeInfo.location.address}, ${
    storeInfo.location.township
  }, ${storeInfo.location.city}, ${storeInfo.location.country}
- **Business Hours**: 
  - Weekdays: ${storeInfo.hours.weekdays}
  - Saturday: ${storeInfo.hours.saturday}
  - Sunday: ${storeInfo.hours.sunday}
- **Contact**: Phone: ${storeInfo.contact.phone}, Email: ${
    storeInfo.contact.email
  }, Viber: ${storeInfo.contact.viber}

### Store Policies:
- **Shipping**: ${storeInfo.policies.shipping}
- **Returns**: ${storeInfo.policies.returns}
- **Warranty**: ${storeInfo.policies.warranty}
- **Payment Methods**: ${storeInfo.policies.payment}

### Available Products (${products.length} items):
${products
  .map(
    (p) =>
      `- ${p.name} (ID: ${p.id}): ${p.price.toLocaleString()} MMK${
        p.originalPrice ? ` (was ${p.originalPrice.toLocaleString()} MMK)` : ""
      }, Rating: ${p.rating}/5 (${p.reviews} reviews), Category: ${p.category}${
        p.isNew ? " [NEW]" : ""
      }${p.isBestSeller ? " [BEST SELLER]" : ""}`
  )
  .join("\n")}

## Your Instructions:
1. Be helpful, professional, and friendly in all interactions.
2. When customers ask about products, provide detailed information including prices, ratings, and any special offers (discounts, new arrivals, best sellers).
3. If a product is on sale, highlight the savings.
4. Answer questions about store location, hours, shipping, returns, warranty, and payment methods using the store information provided.
5. **IMPORTANT**: If the customer expresses intent to buy, order, or purchase any product:
   - Acknowledge their interest enthusiastically
   - Ask for their **name** and **phone number** so your team can follow up and process the order
   - Example: "Great choice! To process your order, could you please provide your name and phone number? Our team will contact you shortly to confirm the details."
6. Keep responses concise but informative.
7. Use MMK (Myanmar Kyat) for all prices.
8. If you don't know something, be honest about it.`;

  // Extract text content from messages (handles both old and new formats)
  const formattedMessages = messages.map(
    (msg: {
      role: string;
      content?: string;
      parts?: Array<{ type: string; text?: string }>;
    }) => {
      let content = "";
      if (typeof msg.content === "string") {
        content = msg.content;
      } else if (msg.parts) {
        content = msg.parts
          .filter((part) => part.type === "text")
          .map((part) => part.text || "")
          .join("");
      }
      return {
        role: msg.role as "user" | "assistant" | "system",
        content,
      };
    }
  );

  const result = streamText({
    model: google("gemini-1.5-flash"),
    system: systemPrompt,
    messages: formattedMessages,
  });

  return result.toUIMessageStreamResponse();
}
