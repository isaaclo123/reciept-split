import React from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { BadgeListProps, BadgeListComponent } from './BadgeListComponent'
import { UserType } from '../types/index'

import { TextInputComponent } from './TextInputComponent'

export interface ExpenseCardParams {
  variant?: string;
  prefix?: string;

  name: string;
  handleNameChange: (arg0:string) => void;

  amount: number;
  handleAmountChange: (arg0:number) => void;

  handleDeleteClick: () => void;

  users: UserType[];

  handleUserClick: (arg0:number) => void;
  handleDeleteUserClick: (arg0:number) => void;
  handleAddUserClick: () => void;

  extraComponent?: React.ReactNode;
}

export const ExpenseCardComponent = ({
  name,
  handleNameChange,
  amount = 0,
  handleAmountChange,
  users = [],

  handleUserClick,
  handleDeleteUserClick,
  handleAddUserClick,

  extraComponent = null,

  variant = "info",
  prefix = "",

  handleDeleteClick
}: ExpenseCardParams) => {

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          <span className="float-left">
            <TextInputComponent
              size={40}
              type="text"
              value={name}
              handleTextChange={handleNameChange}
              />
          </span>
          <span
            className={`text-${variant} float-right`}>
            {prefix}$
            <TextInputComponent
              size={10}
              type="number"
              value={(amount != null) ? amount.toFixed(2): "0.00"}
              pattern="^(\d*\.)?\d+$"
              handleValidate={(str: string) => {
                // check greater than 0 and not invalid
                const value = Number(str)
                if (Number.isNaN(value)) return false
                return value > 0
              }}
              handleTextChange={(str: string) => {
                // to decimal number
                const value = Number(Number(str).toFixed(2))
                console.log(value)
                handleAmountChange(value)
              }}
              />
          </span>
          <br />
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
        </Card.Subtitle>
        <Card.Text>
          {extraComponent}
          <span className="float-left">
            <span className="align-middle">
              With&nbsp;
            </span>

            <BadgeListComponent
              items={users.map((user: UserType) => {
                const { fullname="" } = user
                return fullname
              })}
              handleItemClick={handleUserClick}
              handleDeleteClick={handleDeleteUserClick}
              handleAddClick={handleAddUserClick} />
          </span>
          <span className="float-right">
            <Button
              variant="outline-light"
              className="close"
              onClick={handleDeleteClick}>
              &times;
            </Button>
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}