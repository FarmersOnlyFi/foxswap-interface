import { Interface } from '@ethersproject/abi'
import LP_BOND_ABI from './LpContract.json'

const LP_BOND_INTERFACE = new Interface(LP_BOND_ABI)

export default LP_BOND_INTERFACE
export { LP_BOND_ABI }
