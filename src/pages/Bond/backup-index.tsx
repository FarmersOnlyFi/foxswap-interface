import { AutoColumn } from '../../components/Column'
import React, { useState } from 'react'
import './bond.scss'
import Row  from '../../components/Row'
import { CardSection, DataCard } from '../../components/earn/styled'
// import { TYPE } from '../../theme'
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const CustomCard = styled(DataCard)`
  background: radial-gradient(
    76.02% 75.41% at 1.84% 0%,
    ${({ theme }) => theme.customCardGradientStart} 0%,
    ${({ theme }) => theme.customCardGradientEnd} 100%
  );
  overflow: hidden;
`

interface IBondProps {
  bond: any
  slippage: any
}

export default function Bond({ bond, slippage }: IBondProps) {
  const [quantity, setQuantity] = useState('')
  // const [useHarmony, setUseHarmony] = useState(false);
  // const clearInput = () => {
  //   setQuantity('');
  // };
  // const setMax = () => {
  //   let amount: any = Math.min(bond.maxBondPriceToken * 0.9999, useAvax ? bond.avaxBalance * 0.99 : bond.balance);
  //
  //   if (amount) {
  //     amount = trim(amount);
  //   }
  //
  //   setQuantity((amount || "").toString());
  // };

  const BondInputAmount = () => {
    return (
      <FormControl className="bond-input-wrap" variant="outlined" color="primary" fullWidth>
        <OutlinedInput
          placeholder="Amount"
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="bond-input"
          endAdornment={
            <InputAdornment position="end">
              <div className="stake-input-btn" onClick={() => console.log('111')}>
                <p>Max</p>
              </div>
            </InputAdornment>
          }
        />
      </FormControl>
    )
  }

  // const BondButton = (props: any) => {
  //   return (
  //     <div className="container">
  //       <div className="center">
  //         <button className="btn">
  //           <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
  //             <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
  //             <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
  //           </svg>
  //           <span>{props.buttonText}</span>
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  const BondRow = (props: any) => {
    return (
      <Row>
        <CustomCard>
          <CardSection>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={2}>
                <BondInputAmount/>
              </Grid>
              <Grid item xs={2}>
                <Item>2</Item>
              </Grid>
              <Grid item xs={2}>
                <Item>3</Item>
              </Grid>
              <Grid item xs={2}>
                <Item>4</Item>
              </Grid>
              <Grid item xs={2}>
                <Item>5</Item>
              </Grid>
              <Grid item xs={2}>
                <p>6</p>
              </Grid>
            </Grid>
          </CardSection>
        </CustomCard>
      </Row>
    )
  }

  // @ts-ignore
  return (
    <PageWrapper>
      <BondRow />
    </PageWrapper>
  )
}
