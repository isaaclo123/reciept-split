import React, { useState } from "react";

import { connect, ConnectedProps } from "react-redux";
// import { useHistory } from "react-router-dom";

import { RouteComponentProps } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";

import { LinkContainer } from "react-router-bootstrap";

import { getRecieptList } from "../actions/index";

import {
  RecieptProps,
  RecieptListItemComponent
} from "./RecieptListItemComponent";

import { RootState, RecieptType, RecieptListState } from "../types/index";

const mapStateToProps = (state: RootState) => {
  const { recieptListState } = state;
  return {
    recieptListState
  };
};

const connector = connect(
  mapStateToProps,
  { getRecieptList }
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux &
  RouteComponentProps<{}> & {
    recieptListState?: RecieptListState;
  };

const RecieptPageComponent = ({
  match,
  history,
  recieptListState,
  getRecieptList
}: Props) => {
  const [run, setRun] = useState(true);

  // gets user info once
  if (run) {
    setRun(false);
    getRecieptList();
  }

  const recieptEdit = (id: number) => {
    history.push(`${match.url}/edit/${id}`);
  };

  const reciepts = recieptListState.data;

  return (
    <>
      <div className="align-middle">
        <h5 className="float-left">My Reciepts</h5>

        <LinkContainer to={`${match.url}/edit/-1`}>
          <a onClick={() => {}} className="float-right">
            + New
          </a>
        </LinkContainer>
      </div>
      <br />
      <h5 />
      <ListGroup className="mb-3">
        {!reciepts.length && (
          <ListGroup.Item>
            <a onClick={() => {}}>None</a>
          </ListGroup.Item>
        )}
        {reciepts.map(
          ({ name = "", amount = -1, date = "", id = -1 }: RecieptType) => {
            console.log(`ID ${id}`);

            const props: RecieptProps = {
              pending: true,
              handleNameClick: () => {
                recieptEdit(id);
              },
              handleViewClick: () => {
                recieptEdit(id);
              },
              amount,
              name
            };
            return <RecieptListItemComponent key={id} {...props} />;
          }
        )}
      </ListGroup>
    </>
  );
};

export const RecieptPage = connector(RecieptPageComponent);
