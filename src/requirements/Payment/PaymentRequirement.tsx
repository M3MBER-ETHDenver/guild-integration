import { Icon } from "@chakra-ui/react"
import { formatUnits } from "@ethersproject/units"
import useAccess from "components/[guild]/hooks/useAccess"
import useGuildPermission from "components/[guild]/hooks/useGuildPermission"
import BlockExplorerUrl from "components/[guild]/Requirements/components/BlockExplorerUrl"
import DataBlock from "components/[guild]/Requirements/components/DataBlock"
import BuyPass from "components/[guild]/Requirements/components/GuildCheckout/BuyPass"
import Requirement, {
  RequirementProps,
} from "components/[guild]/Requirements/components/Requirement"
import { useRequirementContext } from "components/[guild]/Requirements/components/RequirementContext"
import { RPC } from "connectors"
import useTokenData from "hooks/useTokenData"
import { Coins } from "phosphor-react"
import WithdrawButton from "./components/WithdrawButton"
import useVault from "./hooks/useVault"

const PaymentRequirement = (props: RequirementProps): JSX.Element => {
  const { isAdmin } = useGuildPermission()
  const {
    id,
    roleId,
    chain,
    address,
    data: requirementData,
  } = useRequirementContext()
  const {
    data: { token, fee, multiplePayments },
    isValidating: isVaultLoading,
    error: vaultError,
  } = useVault(address, requirementData?.id, chain)

  const {
    data: { symbol, decimals },
    error: tokenError,
    isValidating: isTokenDataLoading,
  } = useTokenData(chain, token)
  const convertedFee = fee && decimals ? formatUnits(fee, decimals) : undefined

  const { data: accessData } = useAccess(roleId)
  const satisfiesRequirement = accessData?.requirements?.find(
    (req) => req.requirementId === id
  )?.access

  return (
    <Requirement
      image={<Icon as={Coins} boxSize={6} />}
      {...props}
      rightElement={
        props?.rightElement ? (
          satisfiesRequirement && !multiplePayments ? (
            props?.rightElement
          ) : (
            <BuyPass />
          )
        ) : null
      }
      footer={
        <>
          {isAdmin ? (
            <WithdrawButton />
          ) : token ? (
            <BlockExplorerUrl chain={chain} address={token} />
          ) : null}
        </>
      }
    >
      <>
        {"Pay "}
        <DataBlock
          isLoading={isVaultLoading || isTokenDataLoading}
          error={
            vaultError
              ? "Couldn't fetch vault"
              : tokenError
              ? "Couldn't fetch token info"
              : undefined
          }
        >
          {convertedFee && symbol ? `${convertedFee} ${symbol}` : "-"}
        </DataBlock>
        {` on ${RPC[chain].chainName}`}
      </>
    </Requirement>
  )
}

export default PaymentRequirement
