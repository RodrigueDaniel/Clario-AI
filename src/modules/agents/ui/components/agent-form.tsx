import { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { useForm } from "react-hook-form";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agentsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GeneratedAvatarProps } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        await queryClient.invalidateQueries(
          trpc.premium.getFreeUsage.queryOptions()
        );

        toast.success(
          <span className="font-bold text-green-700">
            Agent created successfully
          </span>,
          {
            classNames: {
              toast: "relative bg-white rounded-lg overflow-hidden",
            },
            description: (
              <div className="absolute inset-0 rounded-lg border-2 border-green-500 animate-[borderLine_4s_linear]" />
            ),
          }
        );
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(
          <span className="font-bold text-red-700">Agent creation failed</span>,
          {
            classNames: {
              toast: "relative bg-white rounded-lg overflow-hidden",
            },
            description: (
              <div className="absolute inset-0 rounded-lg border-2 border-red-500 animate-[borderLine_4s_linear]" />
            ),
          }
        );

        if (error.data?.code === "FORBIDDEN") {
          router.push("/upgrade");
        }
      },
    })
  );

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }
        toast.success(
          <span className="font-bold text-green-700">
            Agent updated successfully
          </span>,
          {
            classNames: {
              toast: "relative bg-white rounded-lg overflow-hidden",
            },
            description: (
              <div className="absolute inset-0 rounded-lg border-2 border-green-500 animate-[borderLine_4s_linear]" />
            ),
          }
        );
        onSuccess?.();
      },
      onError: () => {
        toast.error(
          <span className="font-bold text-red-700">Failed to update agent</span>,
          {
            classNames: {
              toast: "relative bg-white rounded-lg overflow-hidden",
            },
            description: (
              <div className="absolute inset-0 rounded-lg border-2 border-red-500 animate-[borderLine_4s_linear]" />
            ),
          }
        );
      },
    })
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      updateAgent.mutate({ ...values, id: initialValues.id });
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatarProps
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="border size-16"
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Math tutor" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="You are a helpful Math assistant that can answer questions and help with assigments"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              className="border border-gray-300"
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
