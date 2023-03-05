import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Input,
} from "@chakra-ui/react"
import ControlledSelect from "components/common/ControlledSelect"
import FormErrorMessage from "components/common/FormErrorMessage"
import { useController, useFormContext } from "react-hook-form"
import { RequirementFormProps } from "requirements"
import { SelectOption } from "types"
import parseFromObject from "utils/parseFromObject"

const SubnameForm = ({ baseFieldPath }: RequirementFormProps): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const { field } = useController({
    name: `${baseFieldPath}.data.id`,
    rules: {
      required: "Specifying a subname is required",
    },
  })

  return (
    <Stack spacing={4} alignItems="start">
      <FormControl isRequired>
        <FormLabel>Subname (Example: *.m3mber.eth)</FormLabel>

        <Input
          {...field}
          onChange={({ target: { value } }) => {
            return field.onChange(value)
          }}
        />

        <FormErrorMessage>
          {parseFromObject(errors, baseFieldPath)?.data?.minAmount?.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  )
}

export default SubnameForm
