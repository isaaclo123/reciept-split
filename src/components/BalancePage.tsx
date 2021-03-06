import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

import {
  AcceptRejectButtonsType,
  BalanceCardComponent,
  PayModal,
  AcceptRejectComponent
} from "./index";

import {
  getPaymentListAndBalances,
  getBalanceSumList,
  setPayment,
  setPaymentAmount,
  setPaymentUser,
  setPaymentMessage,
  setPaymentConfirm,
} from "../actions/index";

import {
  RootState,
  BalanceSumType,
  Dict,
  PaymentType,
  CURRENCY_FORMAT,
} from "../types/index";
import { ListGroup } from "react-bootstrap";

import { ListOrNoneComponent } from "./ListOrNoneComponent";

import NumberFormat from "react-number-format";

import Button from "react-bootstrap/Button";

const mapStateToProps = (state: RootState) => {
  const {
    balanceSumListState,
    paymentListState,
  } = state;
  return {
    paymentListState,
    balanceSumListState,
  };
};

const connector = connect(
  mapStateToProps,
  {
    getPaymentListAndBalances,
    getBalanceSumList,
    setPayment,
    setPaymentAmount,
    setPaymentUser,
    setPaymentMessage,
    setPaymentConfirm,
  }
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux &
  RouteComponentProps<{}>;

const BalancePageComponent = ({
  match,
  history,

  balanceSumListState,
  paymentListState,

  getPaymentListAndBalances,
  getBalanceSumList,
  setPayment,
  setPaymentAmount,
  setPaymentUser,
  setPaymentMessage,
  setPaymentConfirm,
}: Props) => {
  const [payShow, setPayShow] = useState(false);

  const balanceErrors = (balanceSumListState.errors != null) ? balanceSumListState.errors : {};
  const paymentErrors = (paymentListState.errors != null) ? paymentListState.errors : {};

  const {
    balances_owed,
    balances_owned
  } = balanceSumListState.data;

  const {
    payments_received,
    payments_sent
  } = paymentListState.data;

  console.log("paymentListState")
  console.log(paymentListState)
  console.log(payments_received)
  console.log(payments_sent)
  console.log("paymentListState")

  const noneCard = (
    <Card style={{
        borderBottom: 0
      }}>
      <Card.Header
        className="text-secondary"
        style={{
          lineHeight: "2rem"
        }}
      >
        None
      </Card.Header>
    </Card>
  );

  const getBalanceList = (balances_list: BalanceSumType[], props: Dict) => (
    <CardColumns>
      <ListOrNoneComponent<BalanceSumType>
        list={balances_list}
        listComponent={(balanceSum: BalanceSumType) => {
          const {
            owed_amount,
            paid_amount,
            user
          } = balanceSum;

          const {
            id = -1
          } = user;

          return (
            <BalanceCardComponent
              key={id}
              onPay={() => {
                setPayment({
                  amount: owed_amount - paid_amount,
                  message: "",
                  to_user: user,
                })
                setPayShow(true);
              }}
              {...balanceSum} {...props}/>
          );
        }}

        noneComponent={noneCard} />
    </CardColumns>
    )

  return (
    <>
      <PayModal
        show={payShow}
        onClose={() => {
          setPayShow(false);
        }}
      />

      {("error" in balanceErrors) &&
        <Alert variant="danger">
          {balanceErrors.error}
        </Alert>}

      {("error" in paymentErrors) &&
        <Alert variant="danger">
          {paymentErrors.error}
        </Alert>}

      {(payments_received.length > 0) &&
      <>
        <h5>Payments Received</h5>

        <ListGroup className="mb-3">
          {payments_received.map(({
            id = -1,
            date,
            accepted,
            message = "",
            from_user = {
              id: -1,
              username: "",
              fullname: ""
            },
            amount
          }: PaymentType,
          index: number) => {
            return (
              <AcceptRejectComponent
                message={message}
                accepted={accepted}
                buttons={["accept", "reject"]}
                onAccept={() => {
                  setPaymentConfirm(id, "accept", index)
                }}
                onReject={() => {
                  setPaymentConfirm(id, "reject", index)
                }}
                messageComponent={
                  <>
                    <NumberFormat
                      className="text-success"
                      displayType="text"
                      value={amount}
                      prefix="$"
                      {...CURRENCY_FORMAT}/>
                    &nbsp;from&nbsp;
                    <span className="text-primary">{from_user.fullname}</span>
                    :&nbsp;
                    <Button
                      variant="link"
                      className="m-0 p-0 stretched-link text-dark">
                      {message}
                    </Button>
                  </>
                  }
                hiddenMessageComponent={
                  <>
                    <NumberFormat
                      className="text-success"
                      displayType="text"
                      value={amount}
                      prefix="$"
                      {...CURRENCY_FORMAT}/>
                    &nbsp;from&nbsp;
                    <span className="text-primary">{from_user.fullname}</span>:
                  </>
                  }
              / >
            );
        })}
        </ListGroup>
      </>
      }

      {(payments_sent.length > 0) &&
      <>
        <h5>Payments Sent</h5>

        <ListGroup className="mb-3">
          {payments_sent.map(({
            id = -1,
            date,
            accepted,
            message = "",
            to_user = {
              id: -1,
              username: "",
              fullname: ""
            },
            amount
          }: PaymentType) => {
            const buttonType: AcceptRejectButtonsType = (
              (accepted === true && ["accept"]) ||
              (accepted === false && ["reject"]) ||
              (["pending"])
            );

            return (
              <AcceptRejectComponent
                acceptText={"ACCEPTED"}
                rejectText={"REJECTED"}
                accepted={accepted}
                buttons={buttonType}

                message={message}
                messageComponent={
                  <>
                    <NumberFormat
                      {...CURRENCY_FORMAT}
                      className="text-danger"
                      displayType="text"
                      value={amount}
                      prefix="$"
                      />
                    &nbsp;to&nbsp;
                    <span className="text-primary">{to_user.fullname}</span>
                    :&nbsp;
                    <Button
                      variant="link"
                      className="m-0 p-0 stretched-link text-dark">
                      {message}
                    </Button>
                  </>
                  }
                hiddenMessageComponent={
                  <>
                    <NumberFormat
                      {...CURRENCY_FORMAT}
                      className="text-danger"
                      displayType="text"
                      value={amount}
                      prefix="$"
                      />
                    &nbsp;to&nbsp;
                    <span className="text-primary">{to_user.fullname}</span>:
                  </>
                  }
              / >
            );
          })}
        </ListGroup>
      </>
      }

      <h5>Balances to Pay</h5>

      {getBalanceList(balances_owned, {
        amountColor: "danger",
      })}

      <h5>Balances Owed</h5>

      {getBalanceList(balances_owed, {
        amountColor: "success",
        showPay: false
      })}

      <br />
    </>
  );
};

export const BalancePage = connector(BalancePageComponent);
