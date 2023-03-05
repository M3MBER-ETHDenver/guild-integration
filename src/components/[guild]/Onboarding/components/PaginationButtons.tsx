import { Flex } from "@chakra-ui/react"
import Button from "components/common/Button"

const PaginationButtons = ({
  activeStep,
  prevStep,
  nextStep,
  nextLoading = false,
  nextLabel = "Next",
  isPrevDisabled = false,
}) => (
  <Flex width="full" justify={{ md: "flex-end" }} mt="7" mb={{ base: 5, md: 0 }}>
    <Button
      size="sm"
      onClick={nextStep}
      isLoading={nextLoading}
      colorScheme="primary"
      data-dd-action-name={`${activeStep + 1}-next [onboarding]`}
    >
      {nextLabel}
    </Button>
    <Button
      isDisabled={isPrevDisabled}
      mr={2}
      onClick={prevStep}
      size="sm"
      variant="ghost"
      order={{ md: -1 }}
      data-dd-action-name={`${activeStep + 1}-prev [onboarding]`}
    >
      Prev
    </Button>
  </Flex>
)

export default PaginationButtons
