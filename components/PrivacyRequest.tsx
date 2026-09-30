"use client";

import { useActionState } from "react";
import { privacyRequest } from "@/lib/auth/actions";

export function PrivacyRequest({ labels }: { labels: { export: string; delete: string; sent: string } }) {
  const [state, action, pending] = useActionState(privacyRequest, {});
  if (state.sent) return <p className="acid mono" role="status" style={{ margin: 0 }}>{labels.sent}</p>;
  return (
    <form action={action} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button className="btn btn-sm" name="type" value="export" disabled={pending}>{labels.export}</button>
      <button className="btn btn-sm" name="type" value="delete" disabled={pending}>{labels.delete}</button>
    </form>
  );
}
