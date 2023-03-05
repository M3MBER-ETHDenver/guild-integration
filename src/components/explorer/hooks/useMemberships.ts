import { useWeb3React } from "@web3-react/core"
import useSWRWithOptionalAuth from "hooks/useSWRWithOptionalAuth"

export type Memberships = Array<{
  guildId: number
  roleIds: number[]
  isAdmin: boolean
}>

const useMemberships = () => {
  const { account } = useWeb3React()

  const shouldFetch = !!account

  const { data } = useSWRWithOptionalAuth<Memberships>(
    shouldFetch ? `/user/membership/${account}` : null
  )

  return data
}

export default useMemberships
