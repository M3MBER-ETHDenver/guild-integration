import { SimpleGrid, Text } from "@chakra-ui/react"
import Section, { SectionProps } from "components/common/Section"
import { AnimatePresence } from "framer-motion"
import { PropsWithChildren } from "react"

type Props = SectionProps & {
  fallbackText: string
}

const CategorySection = ({
  fallbackText,
  children,
  ...rest
}: PropsWithChildren<Props>) => (
  <Section {...rest}>
    {children ? (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 5, md: 6 }}>
        <AnimatePresence>{children}</AnimatePresence>
      </SimpleGrid>
    ) : (
      <Text>{fallbackText}</Text>
    )}
  </Section>
)

export default CategorySection
