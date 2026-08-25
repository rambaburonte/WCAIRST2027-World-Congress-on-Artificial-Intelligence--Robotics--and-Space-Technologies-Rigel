import { createFileRoute } from "@tanstack/react-router";
import { PartnershipPage } from "@/components/site/PartnershipPage";
export const Route = createFileRoute("/sponsorships")({ head: () => ({ meta: [{ title: "Sponsorship | WCAIRST 2027" }] }), component: () => <PartnershipPage mode="sponsors" conference="WCAIRST 2027" /> });