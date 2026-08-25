import { createFileRoute } from "@tanstack/react-router";
import { PartnershipPage } from "@/components/site/PartnershipPage";
export const Route = createFileRoute("/exhibitors")({ head: () => ({ meta: [{ title: "Exhibitors | WCAIRST 2027" }] }), component: () => <PartnershipPage mode="exhibitors" conference="WCAIRST 2027" /> });