import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Input } from "react-daisyui";
import { toast } from "react-toastify";
import { addSchedule } from "../../features/schedules/scheduleSlice";

export default function SetDriverScheduleModal({ driver, isOpen, onClose }) {
  const dispatch = useDispatch();
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [error, setError] = useState(null);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async () => {
    if (!scheduledDate || !scheduledTime) {
      setError("Scheduled date and time are required.");
      return;
    }

    const selectedDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    const currentDateTime = new Date();

    if (selectedDateTime <= currentDateTime) {
      setError("Scheduled date and time cannot be in the past.");
      return;
    }

    try {
      await dispatch(
        addSchedule({ driver, scheduledAt: selectedDateTime.toISOString() })
      ).unwrap();
      toast.success("Set schedule successfully");
      setScheduledDate("");
      setScheduledTime("");
      setError(null);
      onClose();
    } catch (error) {
      setError(error);
      console.error("Failed to set schedule", error);
      toast.error("Failed to set schedule.");
    }
  };

  return (
    <Modal open={isOpen} backdrop={onClose}>
      <Modal.Header className="font-bold">
        Set {driver?.lastName}&apos;s schedule
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <label htmlFor="scheduledDate" className="block mb-1">
            Date
          </label>
          <Input
            type="date"
            id="scheduledDate"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            min={minDate}
            className="w-full mb-2"
            placeholder="Enter date"
          />
          <label htmlFor="scheduledTime" className="block mb-1">
            Time
          </label>
          <Input
            type="time"
            id="scheduledTime"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            className="w-full"
            placeholder="Enter time"
          />
          {error && <div className="text-error text-sm mt-2">{error}</div>}
        </div>
      </Modal.Body>
      <Modal.Actions>
        <Button type="button" color="ghost" onClick={onClose}>
          Close
        </Button>
        <Button
          type="button"
          color="primary"
          className="text-white"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
