import ReportList from "../features/reports/ReportList";

export default function ReportsPage() {
  return (
    <>
      <div>
        <h1>Reports</h1>
        <p className="text-xl mb-4">
          Manage and view all of your driver&apos;s and user&apos;s reports.
        </p>
      </div>
      <ReportList />
    </>
  );
}
