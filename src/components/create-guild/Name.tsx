import { FormControl, Input } from "@chakra-ui/react"
import FormErrorMessage from "components/common/FormErrorMessage"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"

const Name = ({ isDisabled = false }): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const { onBlur: defaultOnBlur, ...rest } = register("name", {
    required: "This field is required.",
    maxLength: {
      value: 50,
      message: "The maximum possible name length is 50 characters",
    },
  })

  const onBlur = (e) => {
    defaultOnBlur(e)
  }

  useEffect(() => {
    if (!errors.name) return
  }, [errors.name])

  return (
    <FormControl
      isRequired
      isInvalid={!!errors?.name}
      isDisabled={isDisabled}
      w={{ base: "full", md: "auto" }}
    >
      <Input
        size="lg"
        width={{ base: "full", md: "sm" }}
        {...rest}
        onBlur={onBlur}
        isDisabled={isDisabled}
      />
      <FormErrorMessage>{errors?.name?.message as string}</FormErrorMessage>
    </FormControl>
  )
}

export default Name
