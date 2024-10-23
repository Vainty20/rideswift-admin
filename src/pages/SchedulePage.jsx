import ScheduleList from "../features/schedules/ScheduleList";

export default function SchedulePage() {
  return (
    <>
      <div>
        <h1>Schedule</h1>
        <p className="text-xl mb-4">
          Overview of your driver&apos;s schedule.
        </p>
      </div>

      <ScheduleList />
    </>
  );
}
