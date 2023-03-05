import DataBlock from "components/[guild]/Requirements/components/DataBlock"
import Requirement, {
  RequirementProps,
} from "components/[guild]/Requirements/components/Requirement"
import { useRequirementContext } from "components/[guild]/Requirements/components/RequirementContext"

const SubnameRequirement = (props: RequirementProps): JSX.Element => {
  const requirement = useRequirementContext()

  return (
    <Requirement image="/requirementLogos/m3mber.png" {...props}>
      {`Own a subname of ${requirement.data.id.substring(2)} `}
      {/* {requirement.data} */}
    </Requirement>
  )
}

export default SubnameRequirement
