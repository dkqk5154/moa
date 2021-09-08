import {loginRouter} from 'config/routerUrl'

const hideRouters : hideRoutersProps = [loginRouter.root.value];

export type hideRoutersProps = Array<String>

export default hideRouters;