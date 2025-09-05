"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const HomeView = () => {
  // Example user data (replace with real user data if available)
  const user = {
    name: "Clario User",
    avatarUrl: "https://i.pravatar.cc/150?img=8",
    role: "Admin",
  };

  return (
    <div className="flex flex-col gap-8 p-6 max-w-3xl mx-auto">
      {/* Welcome Card */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Welcome, {user.name}!</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Badge variant="secondary">{user.role}</Badge>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage your meetings, agents, and premium features from your dashboard.</p>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Meetings</CardTitle>
            <CardDescription>View and schedule meetings</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" variant="default">Go to Meetings</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Agents</CardTitle>
            <CardDescription>Manage your AI agents</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" variant="secondary">Manage Agents</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
