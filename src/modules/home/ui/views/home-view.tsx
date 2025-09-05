"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GeneratedAvatarProps } from "@/components/generated-avatar";
import { authClient } from "@/lib/auth-client";
import { LoadingState } from "@/components/loading-state";

export const HomeView = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return (
      <LoadingState 
        title="Loading"
        description="This may take few seconds"
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] py-10 gap-4">
      <div className="flex flex-col items-center gap-2">
        {data.user.image ? (
          <Avatar className="size-16">
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatarProps
            seed={data.user.name}
            variant="initials"
            className="size-16"
          />
        )}
        <h1 className="text-2xl font-semibold">Welcome, {data.user.name}!</h1>
        <span className="text-muted-foreground text-center">Glad to see you back. Manage your meetings, agents, and more from your dashboard.</span>
        <Badge variant="secondary" className="mt-1">{data.user.email}</Badge>
      </div>
    </div>
  );
};
