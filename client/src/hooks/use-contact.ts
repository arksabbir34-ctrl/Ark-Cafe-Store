import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { z } from "zod";

type ContactInput = z.infer<typeof api.contact.submit.input>;

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      const validated = api.contact.submit.input.parse(data);
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.submit.responses[400].parse(await res.json());
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to submit message");
      }

      return api.contact.submit.responses[200].parse(await res.json());
    },
  });
}
