import {
  Editable,
  EditablePreview,
  EditableTextarea,
  HStack,
} from "@chakra-ui/react"
import useDebouncedState from "hooks/useDebouncedState"
import { useEffect } from "react"
import { useController } from "react-hook-form"
import EditableControls from "./EditableControls"

const PanelDescription = () => {
  const { field, fieldState } = useController({
    name: "description",
    rules: { required: true },
  })

  const isDirty = useDebouncedState(fieldState.isDirty)

  useEffect(() => {
    if (!isDirty) return
  }, [isDirty])

  return (
    <Editable fontSize={"sm"} {...field} placeholder={"Description"} as={HStack}>
      <EditablePreview />
      <EditableTextarea m="0px !important" />
      <EditableControls />
    </Editable>
  )
}

export default PanelDescription
