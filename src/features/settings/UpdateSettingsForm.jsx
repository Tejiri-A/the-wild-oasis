import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings.js";
import Spinner from "../../ui/Spinner.jsx";
import { useUpdateSetting } from "./useEditSetting.js";

function UpdateSettingsForm() {
  const {
    error,
    isPending,
    settings: {
      min_booking_length,
      max_booking_length,
      max_guests_per_booking,
      breakfast_price,
    } = {},
  } = useSettings();

  const { updateSetting, isUpdatingSetting } = useUpdateSetting();

  const handleUpdate = (e, field) => {
    const value = e.target.value;
    console.log(value);
    if (!value) return;
    updateSetting({ [field]: value });
  };

  if (isPending) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={min_booking_length}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={max_booking_length}
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={max_guests_per_booking}
          onBlur={(e) => handleUpdate(e, "max_guests_per_booking")}
          disabled={isUpdatingSetting}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
          disabled={isUpdatingSetting}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
