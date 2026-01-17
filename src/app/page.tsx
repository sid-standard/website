import { redirect } from "next/navigation";

/**
 * Root page - redirects to the first documentation page.
 * No landing page, direct entry to documentation.
 * Requirements: 2.1
 */
export default function Home() {
  redirect("/introduction");
}
