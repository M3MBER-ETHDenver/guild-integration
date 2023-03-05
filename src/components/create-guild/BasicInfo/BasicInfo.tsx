import { Stack } from "@chakra-ui/react"
import Card from "components/common/Card"
import Section from "components/common/Section"
import { useEffect } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { GuildFormType } from "types"
import CreateGuildButton from "../CreateGuildButton"
import { useCreateGuildContext } from "../CreateGuildContext"
import Pagination from "../Pagination"
import ContactInfo from "./components/ContactInfo"
import PlatformlessGuildForm from "./components/PlatformlessGuildForm"
import TwitterUrlInput from "./components/TwitterUrlInput"

const BasicInfo = (): JSX.Element => {
  const { platform, template } = useCreateGuildContext()
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<GuildFormType>()

  const guildName = useWatch({ control, name: "name" })
  const contacts = useWatch({ control, name: "contacts" })

  useEffect(() => {
    if (!contacts?.length) return
  }, [contacts])

  return (
    <>
      <Card px={{ base: 5, sm: 6 }} py={8}>
        <Stack spacing={10}>
          {platform === "DEFAULT" && <PlatformlessGuildForm />}

          <Section title="How could we contact you?" spacing="4">
            <ContactInfo showAddButton={false} />
          </Section>

          {template === "GROWTH" && (
            <Section title="Template required socials" spacing="4">
              <TwitterUrlInput />
            </Section>
          )}
        </Stack>
      </Card>

      <Pagination nextButtonHidden>
        <CreateGuildButton
          isDisabled={
            !guildName ||
            !!Object.values(errors).length ||
            (template === "GROWTH" && !getValues("socialLinks.TWITTER"))
          }
        />
      </Pagination>
    </>
  )
}

export default BasicInfo
