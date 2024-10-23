import { useDispatch } from "react-redux";
import { Button, Modal, Input } from "react-daisyui";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { addVehicle } from "../../features/motorycles/vehicleSlice";
import { vehicleValidationSchema } from "../../utils/validationSchema";

export default function AddVehicleModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await dispatch(addVehicle(values)).unwrap();

      toast.success("Vehicle added successfully");
      resetForm();
      onClose();
    } catch (error) {
      toast.error(error || "Failed to added vehicle.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={isOpen} backdrop={onClose}>
      <Modal.Header className="font-bold">Add Vehicle</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ vehicle: "" }}
          validationSchema={vehicleValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="vehicle" className="block mb-1">
                  Vehicle Name
                </label>
                <Field
                  id="vehicle"
                  name="vehicle"
                  as={Input}
                  className="w-full"
                  placeholder="Enter vehicle name"
                />
                <ErrorMessage
                  name="vehicle"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <Modal.Actions>
                <Button type="button" color="ghost" onClick={onClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  className="text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Save"}
                </Button>
              </Modal.Actions>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
