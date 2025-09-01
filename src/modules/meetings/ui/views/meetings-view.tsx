"use client";

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewMeetingDialog } from "../components/new-meeting-dialog";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters
  }));
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns} onRowClick={(row) => router.push(`/meetings/${row.id}`)} />
      <DataPagination 
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />

      {data.items.length === 0 && (
              <>
                <EmptyState
                  title="Create your First Meeting"
                  description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
                />
      
                {/* Show "New Meeting" button when no agents exist (optional, just for convenience) */}
                <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
                <div className="flex justify-center mt-4">
                  <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
                    <PlusIcon />
                    New Meeting
                  </Button>
                </div>
              </>
            )}
    </div>
  );
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take few seconds"
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="Please try again later"
    />
  );
};
