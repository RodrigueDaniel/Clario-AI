"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useState } from "react";
import { NewAgentDialog } from "../components/new-agent-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data} columns={columns} />

      {data.length === 0 && (
        <>
          <EmptyState
            title="Create your First Agent"
            description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
          />

          {/* Show "New Agents" button when no agents exist (optional, just for convenience) */}
          <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
          <div className="flex items-center justify-between">
            <Button onClick={() => setIsDialogOpen(true)}>
              <PlusIcon />
              New Agents
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take few seconds"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Please try again later"
    />
  );
};
