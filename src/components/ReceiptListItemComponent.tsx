import React from 'react'

import {
  BalanceProps,
  BalanceListItemComponent
} from './BalanceListItemComponent';

import {
  ButtonProps,
} from '../types/index';

export interface ReceiptProps {
  amount: number,
  name: string,
  pending: boolean,
  handleNameClick: () => void,
  handleViewClick: () => void,
}

export const ReceiptListItemComponent = ({
  amount,
  name,
  pending,

  handleNameClick,
  handleViewClick,
}: ReceiptProps) => {
  // const buttons: ButtonProps[] = pending ? [{
  //     variant: "success",
  //     text: "RESOLVED",
  //     handleClick: handleViewClick
  //   }] : [{
  //     variant: "danger",
  //     text: "UNRESOLVED",
  //     handleClick: handleViewClick

  // }]
  const buttons: ButtonProps[] = []

  const balanceProps: BalanceProps = {
    prefix: "*",
    variant: "info",
    amount,
    descriptor: "at",
    name,
    handleClick: handleNameClick,
    buttons,
    active: pending // TODO
  }

  return (
    <BalanceListItemComponent
      {...balanceProps}/>
  )
}