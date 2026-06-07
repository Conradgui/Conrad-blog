import React from "react";
import WorkspaceRoot from "@/components/workspace/WorkspaceRoot";

export function generateStaticParams() {
  return [
    { route: [] },
    { route: ["workspace"] },
    { route: ["workspace", "profile"] },
    { route: ["workspace", "projects"] },
    { route: ["workspace", "cases"] },
    { route: ["workspace", "lab"] },
    { route: ["workspace", "thinking"] },
    { route: ["workspace", "notes"] },
    { route: ["workspace", "resume"] },
    { route: ["workspace", "resume", "about"] },
    { route: ["workspace", "thinking", "notes"] },
    { route: ["workspace", "contact"] },
    // Static slug paths for build verification
    { route: ["workspace", "projects", "fitcheck"] },
    { route: ["workspace", "projects", "zero-to-one"] },
    { route: ["workspace", "projects", "ai-trend-radar"] },
  ];
}

interface PageProps {
  params: Promise<{ route?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <WorkspaceRoot initialRoute={resolvedParams.route} />;
}
