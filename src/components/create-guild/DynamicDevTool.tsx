import dynamic from "next/dynamic"

let DynamicDevTool: any = () => null
if (process.env.NODE_ENV === "nothing")
  DynamicDevTool = dynamic<any>(
    // eslint-disable-next-line import/no-extraneous-dependencies
    () => import("@hookform/devtools").then((module) => module.DevTool)
  )

export default DynamicDevTool
