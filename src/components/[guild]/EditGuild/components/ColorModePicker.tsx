import {
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react"
import FormErrorMessage from "components/common/FormErrorMessage"
import { useThemeContext } from "components/[guild]/ThemeContext"
import { Moon, Sun } from "phosphor-react"
import { useFormContext } from "react-hook-form"

type Props = {
  fieldName: string
}

const ColorModePicker = ({ fieldName }: Props): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { setLocalThemeMode, localThemeMode } = useThemeContext()

  const handleChange = (e) => setLocalThemeMode(e)

  return (
    <VStack spacing={2} alignItems="start">
      <FormControl isInvalid={!!errors[fieldName]}>
        <FormLabel>Color mode</FormLabel>
        <RadioGroup
          defaultValue={localThemeMode}
          onChange={handleChange}
          name="themeMode"
        >
          <HStack spacing={4}>
            <Radio {...register(fieldName)} colorScheme="primary" value="DARK">
              <Icon as={Moon} />
            </Radio>
            <Radio {...register(fieldName)} colorScheme="primary" value="LIGHT">
              <Icon as={Sun} />
            </Radio>
          </HStack>
        </RadioGroup>
        <FormErrorMessage>{errors[fieldName]?.message as string}</FormErrorMessage>
      </FormControl>
    </VStack>
  )
}

export default ColorModePicker
